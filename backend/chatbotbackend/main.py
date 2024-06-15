from fastapi import FastAPI,Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os, requests
import google.generativeai as genai


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BHASHINI_USER_ID = "e832f2d25d21443e8bb90515f1079041"
BHASHINI_API_KEY = ""
GOOGLE_API_KEY = ""
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-pro-latest')

languages = {
    "Hindi": "hi", #hindi
    "Gom": "gom", #Gom
    "Kannade": "kn", #Kannada
    "Dogri": "doi", #Dogri    
    "Bodo": "brx", #Bodo 
    "Urdu": "ur",  #Urdu
    "Tamil": "ta",  #Tamil
    "Kashmiri": "ks",  #Kashmiri
    "Assamese": "as",  #Assamese
    "Bengali": "bn", #Bengali
    "Marathi": "mr", #Marathi
    "Sindhi": "sd", #Sindhi
    "Maihtili": "mai",#Maithili
    "Punjabi": "pa", #Punjabi
    "Malayalam": "ml", #Malayalam
    "Manipuri": "mni",#Manipuri
    "Telugu": "te", #Telugu
    "Sanskrit": "sa", #Sanskrit
    "Nepali": "ne", #Nepali
    "Santali": "sat",#Santali
    "Gujarati": "gu", #Gujarati
    "Oriya": "or", #Oriya
    "English": "en",#English
}


async def translation(source_lang, target_lang, content):
    source_language = languages[source_lang]
    target_language = languages[target_lang]
    payload = {
        "pipelineTasks": [
            {
                "taskType": "translation",
                "config": {
                    "language": {
                        "sourceLanguage": source_language,
                        "targetLanguage": target_language
                    }
                }
            }
        ],
        "pipelineRequestConfig": {
            "pipelineId" : "64392f96daac500b55c543cd"
        }
    }
    headers = {
        "Content-Type": "application/json",
        "userID": BHASHINI_USER_ID,
        "ulcaApiKey": BHASHINI_API_KEY
    }
    response = requests.post('https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline', json=payload, headers=headers)
    if response.status_code == 200:
        response_data = response.json()
        service_id = response_data["pipelineResponseConfig"][0]["config"][0]["serviceId"]

        compute_payload = {
            "pipelineTasks": [
                {
                    "taskType": "translation",
                    "config": {
                        "language": {
                            "sourceLanguage": source_language,
                            "targetLanguage": target_language
                        },
                        "serviceId": service_id
                    }
                }
            ],
            "inputData": {
                "input": [
                    {
                        "source": content
                    }
                ],
                "audio": [
                    {
                        "audioContent": None
                    }
                ]
            }
        }
        callback_url = response_data["pipelineInferenceAPIEndPoint"]["callbackUrl"]
        headers2 = {
            "Content-Type": "application/json",
            response_data["pipelineInferenceAPIEndPoint"]["inferenceApiKey"]["name"]:
                response_data["pipelineInferenceAPIEndPoint"]["inferenceApiKey"]["value"]
        }
        compute_response = requests.post(callback_url, json=compute_payload, headers=headers2)
        if compute_response.status_code == 200:
            compute_response_data = compute_response.json()
            translated_content = compute_response_data["pipelineResponse"][0]["output"][0]["target"]
            return {
                "status_code": 200,
                "message": "Translation successful",
                "translated_content": translated_content
            }
        else:
            return {
                "status_code": compute_response.status_code,
                "message": "Error in translation",
                "translated_content": None
            }
    else:
        return {
            "status_code": response.status_code,
            "message": "Error in translation request",
            "translated_content": None
        }


@app.post("/chatbot")
async def chatbot(source_lang: str=Form(...), text: str=Form(...)):
    try:
        if source_lang=="English":
            response = model.generate_content(text)
            return JSONResponse(content={"response":response.text,"success":True},status_code=200)
        else:
            user_query = await translation(source_lang,'English',text)
            response = model.generate_content('''You are a chatbot for a marketplace for rural artisan women who want to sell handcrafted goods. The website has 3 levels of access: cluster level for rural people, sub-admin level to manage inventory, and admin level to oversee the overall operation. The artisans on the website need to upload a clear picture of their product, which should not be blurred and must have a light background so that it can be easily identified. They also need to enter the name of the product, quantity, and select a category from a dropdown of 5 categories: Jute, Terracotta, Macrame, Banana Fibre, and Others. They will be asked to reupload an image if it's detected that the image is not accurate enough. A unique SKU identifier is generated using the color, shape, and category of the product, which is used in inventory management. The login credentials for the cluster-level artisan are provided by the admins, and they need to use them to log in, after which they are directed to the cluster-level form to add their product. These are the basic features of the website. Now, this will be followed by a user query which you need to answer. The answer should be short but complete. If you are not able to answer, tell them to contact number 9167665456 for further queries."
            ''' +user_query['translated_content'])
            translated_response = await translation('English',source_lang,response.text)
            return JSONResponse(content={"response":translated_response['translated_content'],"success":True},status_code=200)
    except Exception as e:
        return JSONResponse(content={"response":str(e),"success":False},status_code=500)
    
