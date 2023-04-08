import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";

config();

// initialize express server
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// initialize openai api

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// post message to openai api from expess server
app.post("/", async (req, res) => {
  const { messages } = req.body;
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are cute girlfriend chatbot" },
      ...messages,
      //   { role: "user", content: `${message}` },
    ],
  });
  //   console.log(completion.data.choices[0].message.content);
  res.json({ completion: completion.data.choices[0].message });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
