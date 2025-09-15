import CommunityImage from '../models/CommunityImage.js';
import Chat from '../models/Chat.js';

// Controller to publish a new image to the community
export const publishImage = async (req, res) => {
  try {
    // Add a robust check to ensure the user object is valid
    if (!req.user || !req.user._id || !req.user.name) {
      return res.status(401).json({ success: false, message: 'Authentication error: User data is missing.' });
    }

    const { prompt, imageUrl } = req.body;
    const userId = req.user._id;
    const userName = req.user.name;

    if (!prompt || !imageUrl) {
      return res.status(400).json({ success: false, message: 'Prompt and imageUrl are required.' });
    }

    const newImage = await CommunityImage.create({
      userId,
      userName,
      prompt,
      imageUrl,
    });

    res.status(201).json({ success: true, message: 'Image published successfully!', image: newImage });
  } catch (error) {
    console.error('Error publishing image:', error);
    res.status(500).json({ success: false, message: 'Server error while publishing image.' });
  }
};

// Controller to get all published images
export const getPublishedImages = async (req, res) => {
  try {
    // Fetch images and sort by the newest first
    const images = await CommunityImage.find().sort({ createdAt: -1 });
    res.json({ success: true, images });
  } catch (error) {
    console.error('Error fetching published images:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching images.' });
  }
};

