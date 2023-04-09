import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { config } from "dotenv";
config()

import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.API_KEY
}))


const app = express();
app.use(bodyParser.json());
const corsOptions = {
    origin: ['https://course-verse.netlify.app/', 'http://localhost:5173'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  app.use(cors(corsOptions));


app.post("/chat", async (req,res) => {

    const { prompt } = req.body;

    const completion = await openai.createCompletion({
        model:"text-davinci-003",
        max_tokens:1000,
        temperature:0,
        prompt: prompt,
    });

    res.send(completion.data.choices[0].text);

})

const port = 8080
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
