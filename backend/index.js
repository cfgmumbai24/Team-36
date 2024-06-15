const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv');
const app=express();

//middleware
app.use(express.json());
app.use(cors());

//configure .env file
dotenv.config();

app.use("/",require("./routes"))

//database
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
    .then(()=>console.log("Connected to database"))
    .catch(console.error);

    
//post where the server runs
app.listen(5000, ()=> console.log("Server Running!!"))