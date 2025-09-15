// import Stripe from "stripe";
// import Transaction from "../models/Transaction.js";
// import User from "../models/User.js";

// export const stripeWebhooks = async (request, response) => {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//   const sig = request.headers["stripe-signature"];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       request.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (error) {
//     return response.status(400).send(`Webhook Error: ${error.message}`);
//   }

//   // ✅ Handle the event
//   try {
//     switch (event.type) {
//     case "payment_intent.succeeded":{
//         const paymentIntent = event.data.object;
//         const sessionList = await stripe.checkout.sessions.list({
//             payment_intent:paymentIntent.id,
//         })
//         const session = sessionList.data[0];
//         const {transactionId,appId} = session.metadata;

//         if(appId==='quickgpt'){
//             const transaction = await Transaction.findOne({_id:transactionId,isPaid:false})

//             //Update credits in uder account
//             await User.updateOne({_id:transaction.userId},{$inc:{
//                 credits:transaction.credits
//             }})

//             //Update credit payment status
//             transaction.isPaid = true;
//             await transaction.save();
//         }else{
//             return response.json({received:true,message:"Ignore event:Invalid app"})
//         }
//         break;
//     }
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//       break;
//   }
//   response.json({received:true})
//   } catch (error) {
//         console.error("Webhook Processing error",error);
//         response.status(500).send('Internal server error')
//   }

//   // ✅ Respond to Stripe to acknowledge receipt of the event
//   response.status(200).send({ received: true });
// };

// import Stripe from "stripe";
// import Transaction from "../models/Transaction.js";
// import User from "../models/User.js";

// export const stripeWebhooks = async (request, response) => {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//   const sig = request.headers["stripe-signature"];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       request.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (error) {
//     return response.status(400).send(`Webhook Error: ${error.message}`);
//   }

//   // ✅ Handle the event
//   try {
//     switch (event.type) {
//       case "payment_intent.succeeded": {
//         const paymentIntent = event.data.object;
//         const sessionList = await stripe.checkout.sessions.list({
//           payment_intent: paymentIntent.id,
//         });
//         const session = sessionList.data[0];
//         const { transactionId, appId } = session.metadata;

//         if (appId === "quickgpt") {
//           const transaction = await Transaction.findOne({
//             _id: transactionId,
//             isPaid: false,
//           });

//           if (transaction) {
//             // Update credits in user account
//             await User.updateOne(
//               { _id: transaction.userId },
//               { $inc: { credits: transaction.credits } }
//             );

//             // Update credit payment status
//             transaction.isPaid = true;
//             await transaction.save();
//           }
//         } else {
//           return response.json({
//             received: true,
//             message: "Ignore event: Invalid app",
//           });
//         }
//         break;
//       }
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//         break;
//     }

//     // ✅ Only ONE final response here
//     return response.status(200).json({ received: true });
//   } catch (error) {
//     console.error("Webhook Processing error", error);
//     return response.status(500).send("Internal server error");
//   }
// };

// controllers/webhookController.js (simplified)
// import Stripe from 'stripe';
// import Transaction from '../models/Transaction.js';
// import User from '../models/User.js';

// export const stripeWebhooks = async (req, res) => {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//   const sig = req.headers['stripe-signature'];

//   let event;
//   try {
//     // IMPORTANT: req.body must be the raw body buffer (express.raw middleware)
//     event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
//   } catch (err) {
//     console.error('Webhook signature verification failed:', err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   try {
//     if (event.type === 'checkout.session.completed') {
//       const session = event.data.object;
//       const metadata = session.metadata || {};
//       const { transactionId, appId } = metadata;

//       if (appId !== 'quickgpt' || !transactionId) {
//         return res.status(200).json({ received: true, message: 'Ignored' });
//       }

//       const transaction = await Transaction.findOne({ _id: transactionId });
//       if (!transaction) {
//         console.warn('Transaction not found', transactionId);
//         return res.status(200).json({ received: true });
//       }

//       // idempotency: only process if not already paid
//       if (transaction.isPaid) {
//         return res.status(200).json({ received: true, message: 'Already processed' });
//       }

//       // update user credits
//       await User.updateOne({ _id: transaction.userId }, { $inc: { credits: transaction.credits } });
//       transaction.isPaid = true;
//       await transaction.save();
//       console.log('Transaction processed:', transactionId);
//     } else {
//       console.log('Unhandled event type', event.type);
//     }

//     return res.status(200).json({ received: true });
//   } catch (error) {
//     console.error('Error processing webhook', error);
//     return res.status(500).send('Internal server error');
//   }
// };

// controllers/webhooks.js
// import Stripe from "stripe";
// import Transaction from "../models/Transaction.js";
// import User from "../models/User.js";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const stripeWebhooks = async (req, res) => {
//   const sig = req.headers["stripe-signature"];

//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body, // raw body
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     console.error("❌ Webhook signature verification failed:", err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;

//     console.log("🔔 Checkout session completed:", session.id);

//     // ✅ Refetch full session to ensure metadata is included
//     let fullSession;
//     try {
//       fullSession = await stripe.checkout.sessions.retrieve(session.id, {
//         expand: ["line_items"],
//       });
//     } catch (err) {
//       console.error("❌ Failed to retrieve full session:", err.message);
//       return res.json({ received: true });
//     }

//     console.log("📦 Metadata received in webhook:", fullSession.metadata);

//     const { transactionId, userId } = fullSession.metadata || {};

//     if (!transactionId || !userId) {
//       console.error("❌ Missing transactionId or userId in metadata");
//       return res.json({ received: true });
//     }

//     try {
//       const transaction = await Transaction.findById(transactionId);
//       if (!transaction) {
//         console.error("❌ Transaction not found:", transactionId);
//         return res.json({ received: true });
//       }

//       if (transaction.isPaid) {
//         console.log("ℹ️ Transaction already processed:", transactionId);
//         return res.json({ received: true });
//       }

//       console.log(`➡️ Adding ${transaction.credits} credits to user ${userId}`);

//       const user = await User.findByIdAndUpdate(
//         userId,
//         { $inc: { credits: transaction.credits } },
//         { new: true }
//       );

//       if (!user) {
//         console.error("❌ User not found:", userId);
//         return res.json({ received: true });
//       }

//       transaction.isPaid = true;
//       await transaction.save();

//       console.log(`✅ Credits updated! User now has ${user.credits} credits`);
//     } catch (err) {
//       console.error("❌ Webhook processing error:", err);
//     }
//   }

//   res.json({ received: true });
// };

// In your controllers/webhooks.js
import User from "../models/User.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
  let event;

  try {
    // Use raw body for Stripe signature verification
    const signature = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("⚠️ Stripe webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata?.userId; // assuming you pass userId in metadata
    const creditsToAdd = parseInt(session.metadata?.credits) || 0;

    try {
      const user = await User.findById(userId);
      if (user) {
        user.credits += creditsToAdd;
        await user.save();
        console.log(`✅ Added ${creditsToAdd} credits to user ${user.email}`);
      } else {
        console.warn(`⚠️ User not found for ID: ${userId}`);
      }
    } catch (err) {
      console.error("Error updating credits:", err);
    }
  }

  res.json({ received: true });
};


