import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { config } from "dotenv";
config()

import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.API_KEY
}))

// setup server
const app = express();
app.use(bodyParser.json());
app.use(
    cors({
        origin:"*",
}));

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

const port = 8081
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
