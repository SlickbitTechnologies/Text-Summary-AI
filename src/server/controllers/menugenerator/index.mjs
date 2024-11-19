import { openai, waitForSec } from "../../utils/utils.mjs";
const assistant_id = "asst_g2K9Mn6b3X6o2et5eCHtDPj9";
export const generateMenu = async (req, res) => {
  const { cuisine, mealtime } = req.query;
  const prompt = `Generate 15 menu items minimum 2 categories, item_description with 20 sentences, cuisine ${cuisine} and meal type ${mealtime} in JSON format 
  example output:  [{ 
    category: "Pizza", 
    cuisine: "Italian", 
    mealtime: "Lunch",
    item_name: "Chicken pizza", 
    item_description: "Chicken pizza is a delicious variation of the traditional Italian dish, typically consisting of a flavorful combination of ingredients"
    price: 20
    }].
    Give result only in the example output json format without any extra text`;
  const thread = await openai.beta.threads.create();
  const threadId = thread.id;

  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: prompt,
  });

  let run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistant_id,
  });

  let staus = ["completed", "failed", "cancelled", "expired"];
  while (staus.indexOf(run.status) == -1) {
    await waitForSec(1);
    run = await openai.beta.threads.runs.retrieve(threadId, run.id);
  }
  if (run.status == "failed") {
    console.warn("error", JSON.stringify(run));
    if (run?.last_error?.code === "rate_limit_exceeded") {
      res.staus(429).json({
        error: "Rate limit reached. Please wait for sometime and try again",
      });
    } else {
      res.staus(501).json({
        error: "Internal server error",
      });
    }
  } else if (run.status == "expired") {
    console.warn("error", JSON.stringify(run));
    res.staus(501).json({ error: "Request timed out" });
    // return "Request expired";
  } else if (run.status == "cancelled") {
    res.status(501).json({ error: "Request cancelled" });
    // return "Request cancelled";
  }
  const messages = await openai.beta.threads.messages.list(threadId);
  const data = messages.data[0];
  const content = data.content[0].text.value;

  res.status(200).json({ menu: content });
};
