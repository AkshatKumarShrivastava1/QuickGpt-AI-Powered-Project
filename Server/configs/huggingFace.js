import axios from 'axios';

// Get the API key from backend environment variables
const HF_ACCESS_TOKEN = process.env.HUGGINGFACE_API_KEY; 

// The Hugging Face model URL
const MODEL_API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

const headers = {
  "Authorization": `Bearer ${HF_ACCESS_TOKEN}`,
  "Content-Type": "application/json",
  "Accept": "image/png"
};

/**
 * Sends a text prompt to the Hugging Face API and returns the image data.
 * @param {string} prompt The text prompt for the image.
 * @returns {Promise<ArrayBuffer>} The image data as an ArrayBuffer.
 */
export const queryHuggingFace = async (prompt) => {
  try {
    const response = await axios.post(
      MODEL_API_URL,
      JSON.stringify({
        inputs: prompt
      }),
      { headers: headers, responseType: 'arraybuffer' }
    );
    
    // Check for a 503 response which means the model is loading
    if (response.status === 503) {
      throw new Error(`API error (${response.status}): Model is loading, please wait and try again.`);
    }

    if (response.status !== 200) {
      const errorText = Buffer.from(response.data).toString('utf-8');
      throw new Error(`API error (${response.status}): ${errorText}`);
    }
    
    return response.data;
  } catch (error) {
    console.error("Error calling Hugging Face API:", error);
    throw new Error(error.message || "Failed to get a response from the model.");
  }
};