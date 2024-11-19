import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const char_set =
  "abcdefghijlkmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export const max_random_number = (max) => {
  return Math.floor(Math.random() * max);
};
export const getRandomString = (length) => {
  let random_string = "";
  for (let i = 0; i < length; i++) {
    random_string += char_set[max_random_number(char_set.length - 1)];
  }

  return random_string;
};
export const removeAnnotations = (text) => {
  while (text.indexOf("†source") !== -1) {
    let index = text.indexOf("†source");
    text = text.substr(0, index - 3) + text.substr(index + 8);
  }
  return text;
};
export const waitForSec = async (sec = 1) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, sec * 1000);
  });
};
console.log("env", process.env.OPENAI_KEY);
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});
