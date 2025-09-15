import toast from 'react-hot-toast';

/**
 * Generates an image using the Hugging Face Inference API with the Stable Diffusion model.
 * This function includes detailed error handling for model loading and API key issues.
 *
 * @param {string} prompt - The text prompt for the image generation.
 * @returns {Promise<Blob|null>} The image Blob if successful, otherwise null.
 */
export async function generateImageWithHuggingFace(prompt) {
  // CORRECT SYNTAX for Vite: Use import.meta.env and ensure your .env file
  // uses the VITE_ prefix (e.g., VITE_HUGGINGFACE_API_KEY)
  const HUGGING_FACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

  if (!HUGGING_FACE_API_KEY || !HUGGING_FACE_API_KEY.startsWith('hf_')) {
      const errorMessage = "Hugging Face API key is missing or invalid. Please check your .env file.";
      console.error(errorMessage);
      toast.error(errorMessage);
      return null;
  }

  // You can find more models here: https://huggingface.co/models?pipeline_tag=text-to-image
  const modelUrl = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

  console.log("Requesting image generation from Hugging Face...");
  toast.loading('Generating image, please wait...');

  try {
    const response = await fetch(modelUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "image/png" // We expect a direct image response
      },
      body: JSON.stringify({
        inputs: prompt,
      }),
    });

    toast.dismiss(); // Dismiss the loading toast

    // Handle the specific 503 error when the model is loading
    if (response.status === 503) {
      const errorJson = await response.json();
      const waitTime = Math.ceil(errorJson.estimated_time);
      const waitMessage = `Model is warming up. Please try again in about ${waitTime} seconds.`;
      console.warn(waitMessage);
      toast.error(waitMessage);
      return null;
    }

    // Handle all other non-successful responses (e.g., 401 Unauthorized for bad key)
    if (!response.ok) {
        const errorJson = await response.json(); // Hugging Face often returns JSON on error
        const errorMessage = `API Error (${response.status}): ${errorJson.error || 'Unknown error'}`;
        console.error("Hugging Face API Error Details:", errorJson);
        throw new Error(errorMessage);
    }

    // The response is the image file itself (a blob)
    const imageBlob = await response.blob();
    console.log("Image Blob received successfully.");

    // IMPORTANT: Check if the returned blob is actually an image.
    // If the API key is wrong, it sometimes returns a JSON error as a blob.
    if (!imageBlob.type.startsWith('image/')) {
        console.error("API did not return a valid image. Check your API key and model status.");
        toast.error("Image generation failed. The API did not return a valid image.");
        return null;
    }
    
    return imageBlob;

  } catch (error) {
    toast.dismiss(); // Ensure loading toast is dismissed on error
    console.error("An error occurred during image generation:", error);
    toast.error(error.message || "Failed to generate image.");
    return null;
  }
}