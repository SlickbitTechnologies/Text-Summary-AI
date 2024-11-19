import { GoogleGenerativeAI } from "@google/generative-ai";

// const googleAIClient = new TextServiceClient({
//   authClient: new GoogleAuth().fromAPIKey(process.env.GOOGLE_API_KEY),
// });
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
export default genAI;
