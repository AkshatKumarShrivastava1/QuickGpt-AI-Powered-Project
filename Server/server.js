// import express from "express"
// import "dotenv/config"
// import cors from 'cors'
// import connectDB from "./configs/db.js"
// import userRouter from "./routes/userRouter.js"
// import chatRouter from "./routes/chatRoutes.js"
// import messageRouter from "./routes/messageRoutes.js"
// import creditRouter from "./routes/creditRoutes.js"
// import { stripeWebhooks } from "./controllers/webhooks.js"

// const app = express()

// await connectDB()

// //Stripe webhooks
// app.post(
//   "/api/stripe",
//   express.raw({ type: "application/json" }),
//   stripeWebhooks
// );


// //Middlewares
// //app.use(cors())
// const FRONTEND_URL = process.env.CLIENT_URL || req.headers.origin || 'http://localhost:5173';

// app.use(cors({
//   origin: [FRONTEND_URL],
//   credentials: true
// }));

// app.use(express.json())

// //Routes
// app.get('/',(req,res)=>res.send('Server is live'))
// app.use('/api/user',userRouter);
// app.use('/api/chat',chatRouter);
// app.use('/api/message',messageRouter);
// app.use('/api/credit',creditRouter)
 
// const PORT = process.env.PORT ||3000

// app.listen(PORT ,()=>{
//     console.log(`Server is running on port ${PORT}`)
// })

import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRouter.js";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import creditRouter from "./routes/creditRoutes.js";
import { stripeWebhooks } from "./controllers/webhooks.js";

const app = express();

// Connect to MongoDB
await connectDB();

// Stripe webhooks
app.post(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

// CORS Middleware
const FRONTEND_URL = process.env.CLIENT_URL || "http://localhost:5173";
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

// Body parser
app.use(express.json());

// API Routes
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);
app.use("/api/credit", creditRouter);

// Serve React build
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "client/build")));

// Catch-all route for React SPA
// Use regex to avoid PathError issues with "*"
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
