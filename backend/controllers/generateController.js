const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const multer = require('multer');

dotenv.config();

const gemini_api_key = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
  temperature: 0.4,
  topP: 1,
  topK: 32,
  maxOutputTokens: 4096,
};

const geminiModel = googleAI.getGenerativeModel({
  model: 'gemini-pro-vision',
  geminiConfig,
});

// Configure multer for file upload
const upload = multer({ storage: multer.memoryStorage() });

const generate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Convert the uploaded file buffer to base64
    const imageBase64 = req.file.buffer.toString('base64');

    // Check image quality
    const qualityPromptConfig = [
      { text: "You are an expert image quality detector. Analyze the image and check the following guidelines. 1. Image should have a light background. 2. Image should not be blur. If the above guidelines are met respond with 'accept' otherwise 'reject'." },
      {
        inlineData: {
          mimeType: req.file.mimetype,
          data: imageBase64,
        },
      },
    ];

    const qualityCheckResult = await geminiModel.generateContent({
      contents: [{ role: 'user', parts: qualityPromptConfig }],
    });

    const qualityResponse = await qualityCheckResult.response;
    const qualityResponseText = await qualityResponse.text();

    if (qualityResponseText.trim().toLowerCase() !== 'accept') {
      return res.json({ success:"false", error: 'Image quality check failed. Please upload another image.' });
    }

    const categories = ['terracotta', 'banana fibre', 'macrame', 'jute', 'others'];
    const categoriesString = categories.join(', ');

    const promptConfig = [
      {
        text: `You are an expert in image analysis. Describe the image and return a JSON object containing item type, colour, shape, and a unique SKU ID generated based on these features. The colour described should be the primary colour of the object. If any of these attributes are not applicable, you should set them to blank. The SKU ID should not be very long; it should take the first three letters of all the features and then combine them. Additionally, assign a category from the following list and include it in the JSON: [${categoriesString}]. Here is an example of the format:\nExample: (type: jewelry, colour: black, shape: diamond, SKU: nec-bla-dia, category: terracotta)`
      },
      {
        inlineData: {
          mimeType: req.file.mimetype,
          data: imageBase64,
        },
      },
    ];

    const result = await geminiModel.generateContent({
      contents: [{ role: 'user', parts: promptConfig }],
    });

    const response = await result.response;
    const responseText = await response.text();

    // Log the response text for debugging
    console.log('Response Text:', responseText);

    // Parse the response text
    const detailsRegex = /\(([^)]+)\)/;
    const match = responseText.match(detailsRegex);

    if (match && match[1]) {
      const detailsString = match[1]
        .split(', ')
        .map(pair => {
          const [key, value] = pair.split(': ').map(str => str.trim());
          return `"${key}": "${value}"`;
        })
        .join(', ');
      const detailsJsonString = `{${detailsString}}`;
      const details = JSON.parse(detailsJsonString);

      res.json({
        success:"true",
        details: details,
        imageBase64: imageBase64,
      });
    } else {
      console.error('Error extracting details from response');
      res.status(500).json({ error: 'Error extracting details from response', responseText });
    }
  } catch (error) {
    console.error('Response error', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  upload,
  generate,
};
