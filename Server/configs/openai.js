// import {OpenAI} from "openai";

// const openai = new OpenAI({
//     apiKey: process.env.GEMINI_API_KEY,
//     baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
// });

// export default openai

// import { GoogleGenerativeAI } from "@google/generative-ai";

// // This configuration correctly initializes the Google Gemini client.
// // It uses the GEMINI_API_KEY from your .env file.
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // ✅ Use the recommended and current model for this task.
// const gemini = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

// // Keeping the export name the same to avoid breaking imports in other files.
// export default gemini;

// import { GoogleGenerativeAI } from "@google/generative-ai";

// // This configuration correctly initializes the Google Gemini client.
// // It uses the GEMINI_API_KEY from your .env file.
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // ✅ Switched to the standard "pro" model for potentially more consistent performance.
// const gemini = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

// // Keeping the export name the same to avoid breaking imports in other files.
// export default gemini;

// import { OpenAI } from "openai";

// // This configuration correctly initializes the official OpenAI library.
// // It uses the OPENAI_API_KEY from your .env file.
// const openai = new OpenAI({
//     apiKey: process.env.GEMINI_API_KEY,
// });

// export default openai;

import Groq from "groq-sdk";

// This configuration correctly initializes the Groq client.
// It uses the GROQ_API_KEY from your .env file.
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// We are exporting 'groq' but keeping the filename 'openai.js'
// to avoid breaking the import statement in your controller.
export default groq;
