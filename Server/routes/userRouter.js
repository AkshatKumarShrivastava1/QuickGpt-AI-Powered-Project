import express from 'express'
import { getPublishedImages, getUser, loginUser, registerUser } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/auth.js';

const userRouter = express.Router();
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser);
userRouter.get('/data',authMiddleware,getUser)
userRouter.get('/published-images',getPublishedImages)

export default userRouter