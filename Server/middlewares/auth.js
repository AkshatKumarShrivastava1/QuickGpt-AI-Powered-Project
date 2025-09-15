// import jwt from 'jsonwebtoken'
// import User from '../models/User.js';


// export const protect = async(req,res,next)=>{
//     let token = req.headers.authorization;
//     try {
//         const decoded = jwt.verify(token,process.env.JWT_SECRET)
//         const userId = decoded.id;
//         const user = await User.findById(userId);
//         if(!user){
//             return res.json({success:false,message:'Not authorized , user not found'})
//         }
//         req.user = user;
//         next()
//     } catch (error) {
//         res.status(401).json({message:'Not authorized, token failed'})
//     }
// }

// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   let token;
//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select("-password");
//       return next();
//     } catch (error) {
//       return res.status(401).json({ success: false, message: "Not authorized, token failed" });
//     }
//   }
//   res.status(401).json({ success: false, message: "Not authorized, no token" });
// };

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// ✅ Renamed the function to authMiddleware to match what your routes expect
export const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    // ✅ Use _id to correctly decode the token we created in userController.js
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the full user object to the request
    const user = await User.findOne({ _id }).select('-password').lean(); // Using .lean() for a plain object
    
    if (!user) {
        return res.status(401).json({ success: false, message: 'User not found.' });
    }
    
    req.user = user;

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ success: false, message: 'Request is not authorized' });
  }
};

