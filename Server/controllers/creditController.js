// import Transaction from "../models/Transaction.js";
// import Stripe from "stripe";


// const plans = [
//     {
//         _id: "basic",
//         name: "Basic",
//         price: 10,
//         credits: 100,
//         features: ['100 text generations', '50 image generations', 'Standard support', 'Access to basic models']
//     },
//     {
//         _id: "pro",
//         name: "Pro",
//         price: 20,
//         credits: 500,
//         features: ['500 text generations', '200 image generations', 'Priority support', 'Access to pro models', 'Faster response time']
//     },
//     {
//         _id: "premium",
//         name: "Premium",
//         price: 30,
//         credits: 1000,
//         features: ['1000 text generations', '500 image generations', '24/7 VIP support', 'Access to premium models', 'Dedicated account manager']
//     }
// ]

// //Api controller for getting all plans
// export const getPlans = async (req, res)=>{
//     try {
//         res.json({ success: true, plans })
//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// }

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// // API Controller for purchasing a plan
// export const purchasePlan = async (req, res) => {
//     try {
//         const { planId } = req.body;
//         const userId = req.user._id;

//         // find the plan from available plans
//         const plan = plans.find((plan) => plan._id === planId);

//         if (!plan) {
//             return res.json({
//                 success: false,
//                 message: "Invalid plan",
//             });
//         }

//         // ✅ Create new Transaction
//         const transaction = await Transaction.create({
//             userId: userId,
//             planId: plan._id,
//             amount: plan.price,
//             credits: plan.credits,
//             isPaid: false
//         });
//         //const {origin} = req.headers;
//         const FRONTEND_URL = process.env.CLIENT_URL || req.headers.origin || 'http://localhost:5173';
//         const session = await stripe.checkout.sessions.create({
//             line_items: [
//                 {
//                     price_data: {
//                         currency:"usd",
//                         unit_amount:plan.price*100,
//                         product_data:{
//                             name:plan.name
//                         }
//                     },
//                     quantity: 1,
//                 },
//             ],
//             mode: 'payment',
//             success_url: `${FRONTEND_URL}/loading`,
//             cancel_url: `${FRONTEND_URL}`,
//             metadata:{transactionId:transaction._id.toString(),appId:'quickgpt'},
//             expires_at:Math.floor(Date.now()/1000)+30*60
//         });

//         res.json({
//             success: true,
//             url:session.url
//         });
//     } catch (error) {
//         return res.json({
//             success: false,
//             message: error.message || "Something went wrong",
//         });
//     }
// };

import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Confirm Stripe payment
export const confirmPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ success: false, message: "Session ID required" });
    }

    // Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }

    // Get transaction ID from Stripe metadata
    const transactionId = session.metadata.transactionId;

    if (!transactionId) {
      return res.status(400).json({ success: false, message: "Transaction ID missing" });
    }

    // Find transaction
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    // Check if already paid
    if (transaction.isPaid) {
      return res.json({ success: true, message: "Payment already confirmed", newCredits: transaction.credits });
    }

    // Mark transaction as paid
    transaction.isPaid = true;
    await transaction.save();

    // Add credits to user
    const user = await User.findById(transaction.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.credits += transaction.credits;
    await user.save();

    res.json({ success: true, message: "Payment successful", newCredits: transaction.credits });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
};


