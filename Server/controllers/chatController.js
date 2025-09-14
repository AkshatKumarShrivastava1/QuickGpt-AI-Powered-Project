import Chat from "../models/Chat.js";

// API Controller for creating a new chat
export const createChat = async (req, res) => {
  try {
    const userId = req.user._id; // assuming req.user is set by auth middleware

    const chatData = {
      userId,
      messages: [],
      name: "New Chat",
      userName: req.user.name,
    };

    await Chat.create(chatData);

    res.json({
      success: true,
      message: "Chat created",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API Controller for getting all chat
// export const getChat = async (req, res) => {
//   try {
//     const userId = req.user._id; // assuming req.user is set by auth middleware
//     const chats = await Chat.find({userId}).sort({updatedAt:-1})

//     res.json({
//       success: true,
//       message: chats,
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// API Controller for getting all chats
// export const getChat = async (req, res) => {
//   try {
//     const userId = req.user._id; // assuming req.user is set by auth middleware
//     const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });

//     res.json({
//       success: true,
//       chats,   // ✅ correct field name
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const getChat = async (req, res) => {
  try {
    const userId = req.user._id; // assuming req.user is set by auth middleware
    const userName = req.user.name; // get username from authenticated user

    let chats = await Chat.find({ userId }).sort({ updatedAt: -1 });

    // ✅ If no chats exist, create a new one
    if (chats.length === 0) {
      const newChat = await Chat.create({
        userId,
        messages: [],
        name: "New Chat",
        userName,
      });
      // Set the chats array to contain our new chat
      chats = [newChat];
    }

    res.json({
      success: true,
      chats,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API Controller for deleting chat
export const deleteChat = async (req, res) => {
  try {
    const userId = req.user._id; // assuming req.user is set by auth middleware
    const {chatId} =req.body;

    await Chat.deleteOne({_id:chatId,userId})

    res.json({
      success: true,
      message: "chat deleted",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }

};
