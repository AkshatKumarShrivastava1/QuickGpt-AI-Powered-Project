// import Chat from "../models/Chat.js";
// import User from "../models/User.js";
// import axios from 'axios'
// import imagekit from "../configs/imageKit.js";
// import openai from "../configs/openai.js";

// // Text-based AI Chat Message Controller
// export const textMessageController = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         if(req.user.credits<1){
//             return res.json({success:false,message:"You Don't have enough credits to use this feature"})
//         }
//         const { chatId, prompt } = req.body;

//         const chat = await Chat.findOne({ userId, _id: chatId });
//         chat.messages.push({
//             role: "user",
//             content: prompt,
//             timestamp: Date.now(),
//             isImage: false
//         });

//         const { choices } = await openai.chat.completions.create({
//             model: "gemini-2.0-flash",
//             messages: [
//                 {
//                     role: "user",
//                     content:prompt,
//                 },
//             ],
//         });
//         const reply = { ...choices[0].message, timestamp: Date.now(), isImage: false }
//         res.json({ success: true, reply })
//         chat.messages.push(reply)
//         await chat.save()
//         await User.updateOne({ _id: userId }, { $inc: { credits: -1 } })

//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };

// //Image generation Message controller

// export const imageMessageController = async(req,res)=>{
//     try {
//         const userId = req.user._id;
//         if(req.user.credits<2){
//             return res.json({success:false,message:"You Don't have enough credits to use this feature"})
//         }
//         const {prompt,chatId,isPublished} = req.body
//         const chat = await Chat.findOne({userId,_id:chatId})
//         chat.messages.push({
//             role: "user",
//             content: prompt,
//             timestamp: Date.now(),
//             isImage: false
//         })

//         //Encode the prompt
//         const encodedPrompt = encodeURIComponent(prompt)

//         //Construct ImageKit Generation URl
//         const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/
//         ik-genimg-prompt-${encodedPrompt}/quickgpt/${Date.now()}.png?tr=w-800,h-800`;

//         //Trigger generation by imagekit
//         const aiImageResponse = await axios.get(generatedImageUrl,{responseType:"arraybuffer"})

//         //Convert to base 64
//         const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data,
//             "binary").toString('base64')}`;

//         //Upload to imagekit media library
//         const uploadResponse = await imagekit.upload({
//             file:base64Image,
//             fileName:`${Date.now()}.png`,
//             folder:"quickgpt"
//         })
//         const reply = { role:'assistant',
//             content:uploadResponse.url,
//             timestamp: Date.now(),
//             isImage: true,
//             isPublished
//         }
//         res.json({ success: true, reply })
//         chat.messages.push(reply)
//         await chat.save()
//         await User.updateOne({ _id: userId }, { $inc: { credits: -2 } })
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }

// import Chat from "../models/Chat.js";
// import User from "../models/User.js";
// import openai from "../configs/openai.js"; // Assuming you have this config file

// // Text-based AI Chat Message Controller
// export const textMessageController = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         if (req.user.credits < 1) {
//             return res.status(402).json({ success: false, message: "You don't have enough credits." });
//         }
//         const { chatId, prompt } = req.body;

//         const chat = await Chat.findOne({ userId, _id: chatId });
//         if (!chat) {
//             return res.status(404).json({ success: false, message: 'Chat not found.' });
//         }
        
//         chat.messages.push({
//             role: "user",
//             content: prompt,
//             timestamp: Date.now(),
//             isImage: false
//         });

//         // NOTE: This uses a mock reply. Replace with your actual AI generation logic if needed.
//         // For example, using OpenAI:
//         /*
//         const { choices } = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo", 
//             messages: [{ role: "user", content: prompt }],
//         });
//         const reply = { ...choices[0].message, timestamp: Date.now(), isImage: false };
//         */
       
//         // Using a mock reply for demonstration purposes
//         const reply = { role: 'assistant', content: `This is a mock reply to: "${prompt}"`, timestamp: Date.now(), isImage: false };
        
//         res.json({ success: true, reply });
//         chat.messages.push(reply);
//         await chat.save();
//         await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });

//     } catch (error) {
//         console.error("Text message error:", error);
//         res.status(500).json({ success: false, message: "Server error during text message generation." });
//     }
// };

// /**
//  * Controller to save a user message and an AI reply to a chat.
//  * This is used AFTER an image is generated on the client-side.
//  */
// export const saveMessageController = async (req, res) => {
//     try {
//         const { chatId, userMessage, aiReply } = req.body;
//         const userId = req.user._id;

//         if (!chatId || !userMessage || !aiReply) {
//             return res.status(400).json({ success: false, message: 'Missing required message data.' });
//         }

//         const chat = await Chat.findById(chatId);
//         if (!chat) {
//             return res.status(404).json({ success: false, message: 'Chat not found.' });
//         }
//         if (chat.userId.toString() !== userId.toString()) {
//             return res.status(403).json({ success: false, message: 'User does not have permission to modify this chat.' });
//         }

//         chat.messages.push(userMessage);
//         chat.messages.push(aiReply);
//         await chat.save();

//         res.status(200).json({ success: true, message: 'Chat history saved successfully.' });

//     } catch (error) {
//         console.error('Error saving message:', error);
//         res.status(500).json({ success: false, message: 'Server error while saving chat.' });
//     }
// };

// import Chat from "../models/Chat.js";
// import User from "../models/User.js";
// import openai from "../configs/openai.js"; // Assuming you have this config file

// // Text-based AI Chat Message Controller
// export const textMessageController = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         if (req.user.credits < 1) {
//             return res.status(402).json({ success: false, message: "You don't have enough credits." });
//         }
//         const { chatId, prompt } = req.body;

//         const chat = await Chat.findOne({ userId, _id: chatId });
//         if (!chat) {
//             return res.status(404).json({ success: false, message: 'Chat not found.' });
//         }
        
//         chat.messages.push({
//             role: "user",
//             content: prompt,
//             timestamp: Date.now(),
//             isImage: false
//         });

//         // ✅ Replaced the mock reply with a real call to the OpenAI API
//         const { choices } = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo", 
//             messages: [{ role: "user", content: prompt }],
//         });
//         const reply = { ...choices[0].message, timestamp: Date.now(), isImage: false };
        
//         res.json({ success: true, reply });
//         chat.messages.push(reply);
//         await chat.save();
//         await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });

//     } catch (error) {
//         console.error("Text message error:", error); // Keep logging the full error for your records

//         // ✅ Enhanced error handling to provide more specific feedback
//         // Check for specific OpenAI API errors based on their structure
//         if (error.response) {
//             const statusCode = error.response.status;
//             const errorMessage = error.response.data?.error?.message || "An error occurred with the AI provider.";
            
//             if (statusCode === 401) {
//                 return res.status(401).json({ success: false, message: "AI provider authentication failed. Please check your API key." });
//             }
//             if (statusCode === 429) {
//                 return res.status(429).json({ success: false, message: "You have exceeded your quota or rate limit for the AI provider." });
//             }
//             return res.status(statusCode).json({ success: false, message: errorMessage });
//         }

//         // Fallback for other types of errors (e.g., database, network)
//         res.status(500).json({ success: false, message: "Server error during text message generation." });
//     }
// };

// /**
//  * Controller to save a user message and an AI reply to a chat.
//  * This is used AFTER an image is generated on the client-side.
//  */
// export const saveMessageController = async (req, res) => {
//     try {
//         const { chatId, userMessage, aiReply } = req.body;
//         const userId = req.user._id;

//         if (!chatId || !userMessage || !aiReply) {
//             return res.status(400).json({ success: false, message: 'Missing required message data.' });
//         }

//         const chat = await Chat.findById(chatId);
//         if (!chat) {
//             return res.status(404).json({ success: false, message: 'Chat not found.' });
//         }
//         if (chat.userId.toString() !== userId.toString()) {
//             return res.status(403).json({ success: false, message: 'User does not have permission to modify this chat.' });
//         }

//         chat.messages.push(userMessage);
//         chat.messages.push(aiReply);
//         await chat.save();

//         res.status(200).json({ success: true, message: 'Chat history saved successfully.' });

//     } catch (error) {
//         console.error('Error saving message:', error);
//         res.status(500).json({ success: false, message: 'Server error while saving chat.' });
//     }
// };

// import Chat from "../models/Chat.js";
// import User from "../models/User.js";
// // Even though the filename is openai.js, it now exports the configured Gemini model
// import gemini from "../configs/openai.js";

// // Text-based AI Chat Message Controller
// export const textMessageController = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         if (req.user.credits < 1) {
//             return res.status(402).json({ success: false, message: "You don't have enough credits." });
//         }
//         const { chatId, prompt } = req.body;

//         const chat = await Chat.findOne({ userId, _id: chatId });
//         if (!chat) {
//             return res.status(404).json({ success: false, message: 'Chat not found.' });
//         }

//         chat.messages.push({
//             role: "user",
//             content: prompt,
//             timestamp: Date.now(),
//             isImage: false
//         });

//         // ✅ Implemented a retry mechanism for overloaded model errors
//         let text;
//         const maxRetries = 3;
//         for (let i = 0; i < maxRetries; i++) {
//             try {
//                 const result = await gemini.generateContent(prompt);
//                 const response = await result.response;
//                 text = response.text();
//                 break; // If successful, exit the loop
//             } catch (error) {
//                 // Check if it's the specific "overloaded" error
//                 if (i < maxRetries - 1 && error.message.includes('503')) {
//                     console.warn(`Model is overloaded. Retrying in 2 seconds... (Attempt ${i + 1})`);
//                     await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
//                 } else {
//                     throw error; // If it's another error or the last retry, re-throw it
//                 }
//             }
//         }

//         if (!text) {
//              throw new Error("Failed to generate content after multiple retries.");
//         }

//         const reply = {
//             role: 'assistant',
//             content: text,
//             timestamp: Date.now(),
//             isImage: false
//         };

//         res.json({ success: true, reply });
        
//         chat.messages.push(reply);
//         await chat.save();
//         await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });

//     } catch (error) {
//         console.error("Gemini API Error:", error.message);
//         res.status(500).json({ 
//             success: false, 
//             message: `Server error during text generation. (Details: ${error.message})` 
//         });
//     }
// };

// /**
//  * Controller to save a user message and an AI reply to a chat.
//  * This is used AFTER an image is generated on the client-side.
//  */
// export const saveMessageController = async (req, res) => {
//     try {
//         const { chatId, userMessage, aiReply } = req.body;
//         const userId = req.user._id;

//         if (!chatId || !userMessage || !aiReply) {
//             return res.status(400).json({ success: false, message: 'Missing required message data.' });
//         }

//         const chat = await Chat.findById(chatId);
//         if (!chat) {
//             return res.status(404).json({ success: false, message: 'Chat not found.' });
//         }
//         if (chat.userId.toString() !== userId.toString()) {
//             return res.status(403).json({ success: false, message: 'User does not have permission to modify this chat.' });
//         }

//         chat.messages.push(userMessage);
//         chat.messages.push(aiReply);
//         await chat.save();

//         res.status(200).json({ success: true, message: 'Chat history saved successfully.' });

//     } catch (error) {
//         console.error('Error saving message:', error);
//         res.status(500).json({ success: false, message: 'Server error while saving chat.' });
//     }
// };

import Chat from "../models/Chat.js";
import User from "../models/User.js";
// This file now correctly imports your configured Groq client
import groq from "../configs/openai.js";

// Text-based AI Chat Message Controller
export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id;
        if (req.user.credits < 1) {
            return res.status(402).json({ success: false, message: "You don't have enough credits." });
        }
        const { chatId, prompt } = req.body;

        const chat = await Chat.findOne({ userId, _id: chatId });
        if (!chat) {
            return res.status(404).json({ success: false, message: 'Chat not found.' });
        }

        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false
        });

        // ✅ Use the correct syntax for the Groq API
        const chatCompletion = await groq.chat.completions.create({
            // ✅ Updated to a current, supported, and fast model
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: prompt }],
        });

        // The Groq response structure is compatible with OpenAI's
        const reply = { ...chatCompletion.choices[0].message, timestamp: Date.now(), isImage: false };

        res.json({ success: true, reply });

        chat.messages.push(reply);
        await chat.save();
        await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });

    } catch (error) {
        console.error("Groq API Error:", error);

        // ✅ Enhanced error handling to provide more specific feedback
        // Groq SDK errors often have a 'status' property, similar to OpenAI's.
        if (error.status) {
            if (error.status === 401) {
                return res.status(401).json({ success: false, message: "Groq API authentication failed. Please check your GROQ_API_KEY." });
            }
            if (error.status === 429) {
                return res.status(429).json({ success: false, message: "You have exceeded your Groq API quota or rate limits." });
            }
        }
        
        // Fallback for other types of errors, including the original error message for more context
        res.status(500).json({ success: false, message: `Server error during text message generation. (Details: ${error.message})` });
    }
};

/**
 * Controller to save a user message and an AI reply to a chat.
 * This is used AFTER an image is generated on the client-side.
 */
export const saveMessageController = async (req, res) => {
    try {
        const { chatId, userMessage, aiReply } = req.body;
        const userId = req.user._id;

        if (!chatId || !userMessage || !aiReply) {
            return res.status(400).json({ success: false, message: 'Missing required message data.' });
        }

        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ success: false, message: 'Chat not found.' });
        }
        if (chat.userId.toString() !== userId.toString()) {
            return res.status(403).json({ success: false, message: 'User does not have permission to modify this chat.' });
        }

        chat.messages.push(userMessage);
        chat.messages.push(aiReply);
        await chat.save();

        res.status(200).json({ success: true, message: 'Chat history saved successfully.' });

    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ success: false, message: 'Server error while saving chat.' });
    }
};

