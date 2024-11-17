import axios from "axios";
import OpenAI from "openai";
const openai = new OpenAI({
  organization: process.env.ORGANIZATION_ID,
  project: process.env.PROJECT_ID,
  apiKey: process.env.API_KEY,
});
const assistantId = process.env.ASSISTANT_ID;
export const index = (req: any, res: any) => {
  console.log("Hello from the API!");
  res.status(200).json({ message: "Hello from the API!" });
};

export const userQuery = async (req: any, res: any) => {
  const { prompt } = req.body;
  let thread: OpenAI.Beta.Threads.Thread;
  await openai.beta.threads
    .create()
    .then((response) => {
      thread = response;
      console.log("Thread: ", thread);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });

  let message: OpenAI.Beta.Threads.Message;
  await openai.beta.threads.messages
    .create(thread.id, {
      role: "user",
      content: prompt,
    })
    .then((response) => {
      message = response;
      console.log("Message: ", message);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
  console.log(assistantId);
  let result: OpenAI.Beta.Threads.Run;
  await openai.beta.threads.runs
    .createAndPoll(thread.id, {
      assistant_id: assistantId,
    })
    .then((response) => {
      result = response;
      console.log("Result: ", result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });

  if (result && result.status === "completed") {
    let messages: OpenAI.Beta.Threads.Messages.MessagesPage;
    await openai.beta.threads.messages
      .list(result.thread_id)
      .then((response) => {
        messages = response;
        console.log("Messages: ", messages);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error });
      });
    for (const message of messages.data.reverse()) {
      const textContent = message.content[0] as { text: { value: string } };
      if (textContent.text) {
        if (message.role === "assistant") {
          res.status(200).json({ response: textContent.text.value });
        }
      } else {
        console.log(`${message.role} > ${message.content[0].type} content`);
      }
    }
    // res.status(200).json({ message: "Completed" });
  } else if (result) {
    console.log(result.status);
  }
};

export const runQuery = async (req: any, res: any) => {
  const { jsonQuery } = req.body;
  console.log(req.body);
  axios
    .request(JSON.parse(jsonQuery))
    .then((response) => {
      res.status(response.status).json({ response: response.data });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
};
