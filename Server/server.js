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

// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";
// import connectDB from "./configs/db.js";
// import userRouter from "./routes/userRouter.js";
// import chatRouter from "./routes/chatRoutes.js";
// import messageRouter from "./routes/messageRoutes.js";
// import creditRouter from "./routes/creditRoutes.js";
// import { stripeWebhooks } from "./controllers/webhooks.js";

// const app = express();

// // Connect to MongoDB
// await connectDB();

// // Stripe webhooks
// app.post(
//   "/api/stripe",
//   express.raw({ type: "application/json" }),
//   stripeWebhooks
// );

// // CORS Middleware
// const FRONTEND_URL = process.env.CLIENT_URL || "http://localhost:5173";
// app.use(cors({
//   origin: FRONTEND_URL,
//   credentials: true,
// }));

// // Body parser
// app.use(express.json());

// // API Routes
// app.use("/api/user", userRouter);
// app.use("/api/chat", chatRouter);
// app.use("/api/message", messageRouter);
// app.use("/api/credit", creditRouter);

// // Serve React build
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname, "client/build")));

// // Catch-all route for React SPA
// // Use regex to avoid PathError issues with "*"
// app.get(/.*/, (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import connectDB from "./configs/db.js";
// import userRouter from "./routes/userRouter.js";
// import chatRouter from "./routes/chatRoutes.js";
// import messageRouter from "./routes/messageRoutes.js";
// import creditRouter from "./routes/creditRoutes.js";
// import { stripeWebhooks } from "./controllers/webhooks.js";

// const app = express();

// // Connect to MongoDB
// await connectDB();

// // Stripe webhooks
// app.post(
//   "/api/stripe",
//   express.raw({ type: "application/json" }),
//   stripeWebhooks
// );

// // CORS Middleware
// const FRONTEND_URL = process.env.CLIENT_URL || "http://localhost:5173";
// app.use(cors({
//   origin: FRONTEND_URL,
//   credentials: true,
// }));

// // Body parser
// app.use(express.json());

// // API Routes
// app.use("/api/user", userRouter);
// app.use("/api/chat", chatRouter);
// app.use("/api/message", messageRouter);
// app.use("/api/credit", creditRouter);

// // Paths for React build (client is outside server folder)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const buildPath = path.join(__dirname, "..", "client", "build");
// const indexHtmlPath = path.join(buildPath, "index.html");

// // Serve React build if it exists
// if (fs.existsSync(indexHtmlPath)) {
//   app.use(express.static(buildPath));

//   // Catch-all route for React SPA
//   app.get(/.*/, (req, res) => {
//     res.sendFile(indexHtmlPath);
//   });
// } else {
//   console.warn(
//     "Warning: React build folder not found. Run 'npm run build' in the client folder."
//   );
//   app.get(/.*/, (req, res) => {
//     res.status(404).send(
//       "React build not found. Please run 'npm run build' inside the client folder."
//     );
//   });
// }

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import connectDB from "./configs/db.js";
// import userRouter from "./routes/userRouter.js";
// import chatRouter from "./routes/chatRoutes.js";
// import messageRouter from "./routes/messageRoutes.js";
// import creditRouter from "./routes/creditRoutes.js";
// import { stripeWebhooks } from "./controllers/webhooks.js";

// const app = express();

// // Connect to MongoDB
// await connectDB();

// // Stripe webhooks (must come before express.json middleware)
// app.post(
//   "/api/stripe",
//   express.raw({ type: "application/json" }),
//   stripeWebhooks
// );

// // CORS Middleware
// const FRONTEND_URL = process.env.CLIENT_URL;
// app.use(cors({
//   origin: FRONTEND_URL,
//   credentials: true,
// }));

// // Body parser (after stripe webhook route)
// app.use(express.json());

// // API Routes
// app.use("/api/user", userRouter);
// app.use("/api/chat", chatRouter);
// app.use("/api/message", messageRouter);
// app.use("/api/credit", creditRouter);

// // Path helpers
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // React app path (index.html is directly inside Client/)
// const clientPath = path.join(__dirname, "..", "Client");
// const indexHtmlPath = path.join(clientPath, "index.html");

// // Serve React app
// if (fs.existsSync(indexHtmlPath)) {
//   app.use(express.static(clientPath));

//   // Catch-all for React SPA
//   app.get(/.*/, (req, res) => {
//     res.sendFile(indexHtmlPath);
//   });
// } else {
//   console.warn("⚠️ React index.html not found inside Client folder.");
//   app.get(/.*/, (req, res) => {
//     res.status(404).send("React index.html not found in Client folder.");
//   });
// }

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });


// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import connectDB from "./configs/db.js";
// import userRouter from "./routes/userRouter.js";
// import chatRouter from "./routes/chatRoutes.js";
// import messageRouter from "./routes/messageRoutes.js";
// import creditRouter from "./routes/creditRoutes.js";
// import { stripeWebhooks } from "./controllers/webhooks.js";

// const app = express();

// // Connect to MongoDB
// await connectDB();

// // Stripe webhooks (must come before express.json middleware)
// app.post(
//   "/api/stripe/webhook",
//   express.raw({ type: "application/json" }),
//   stripeWebhooks
// );

// // CORS Middleware
// const allowedOrigins = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : [];

// app.use(cors({
//   origin: (origin, callback) => {
//     // allow requests with no origin (like mobile apps or curl)
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true,
// }));

// // Body parser (after stripe webhook route)
// app.use(express.json());

// // API Routes
// app.use("/api/user", userRouter);
// app.use("/api/chat", chatRouter);
// app.use("/api/message", messageRouter);
// app.use("/api/credit", creditRouter);

// // Path helpers
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // React app path (index.html is directly inside Client/)
// const clientPath = path.join(__dirname, "..", "Client");
// const indexHtmlPath = path.join(clientPath, "index.html");

// // Serve React app
// if (fs.existsSync(indexHtmlPath)) {
//   app.use(express.static(clientPath));

//   // Catch-all for React SPA
//   app.get(/.*/, (req, res) => {
//     res.sendFile(indexHtmlPath);
//   });
// } else {
//   console.warn("⚠️ React index.html not found inside Client folder.");
//   app.get(/.*/, (req, res) => {
//     res.status(404).send("React index.html not found in Client folder.");
//   });
// }

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);

// });

import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRouter.js";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import creditRouter from "./routes/creditRoutes.js";
import { stripeWebhooks } from "./controllers/webhooks.js";

const app = express();

// ----- Connect to MongoDB -----
await connectDB();

// ----- Stripe Webhook -----
app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

// ----- CORS -----
const FRONTEND_URL = "https://quick-gpt-ai-powered-project-ep8m.vercel.app";

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// Handle preflight OPTIONS requests
app.options("*", cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

// ----- Body parser (after webhook) -----
app.use(express.json());

// ----- API Routes -----
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);
app.use("/api/credit", creditRouter);

// ----- Fallback route -----
app.get("/", (req, res) => {
  res.send("Backend is running. Frontend is deployed separately.");
});

// ----- Start server -----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
