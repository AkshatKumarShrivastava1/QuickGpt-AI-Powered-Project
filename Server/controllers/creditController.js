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
import Stripe from "stripe";
import User from "../models/User.js";

const plans = [
    {
        _id: "basic",
        name: "Basic",
        price: 10,
        credits: 100,
        features: ['100 text generations', '50 image generations', 'Standard support', 'Access to basic models']
    },
    {
        _id: "pro",
        name: "Pro",
        price: 20,
        credits: 500,
        features: ['500 text generations', '200 image generations', 'Priority support', 'Access to pro models', 'Faster response time']
    },
    {
        _id: "premium",
        name: "Premium",
        price: 30,
        credits: 1000,
        features: ['1000 text generations', '500 image generations', '24/7 VIP support', 'Access to premium models', 'Dedicated account manager']
    }
]

export const getPlans = async (req, res)=>{
    try {
        res.json({ success: true, plans })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const purchasePlan = async (req, res) => {
    try {
        const { planId } = req.body;
        const userId = req.user._id;

        const plan = plans.find((plan) => plan._id === planId);

        if (!plan) {
            return res.json({
                success: false,
                message: "Invalid plan",
            });
        }

        const transaction = await Transaction.create({
            userId: userId,
            planId: plan._id,
            amount: plan.price,
            credits: plan.credits,
            isPaid: false
        });
        
        // const FRONTEND_URL = process.env.CLIENT_URL || req.headers.origin || 'http://localhost:5173';
        // const session = await stripe.checkout.sessions.create({
        //     line_items: [
        //         {
        //             price_data: {
        //                 currency:"usd",
        //                 unit_amount:plan.price*100,
        //                 product_data:{
        //                     name:plan.name
        //                 }
        //             },
        //             quantity: 1,
        //         },
        //     ],
        //     mode: 'payment',
        //     success_url: `${FRONTEND_URL}/success`,
        //     cancel_url: `${FRONTEND_URL}`,
        //     metadata: {
        //         transactionId: transaction._id.toString(), 
        //         appId: 'quickgpt',
        //         userId: userId.toString()
        //     },
        //     expires_at:Math.floor(Date.now()/1000)+30*60
        // });

        // controllers/creditController.js (purchasePlan excerpt)
const FRONTEND_URL = process.env.CLIENT_URL || req.headers.origin || 'http://localhost:5173';

const session = await stripe.checkout.sessions.create({
  line_items: [
    {
      price_data: {
        currency: 'usd',
        unit_amount: plan.price * 100,
        product_data: { name: plan.name },
      },
      quantity: 1,
    },
  ],
  mode: 'payment',
  success_url: req.body.success_url || `${FRONTEND_URL}/credits?success=true`,
  cancel_url: req.body.cancel_url || FRONTEND_URL,
  metadata: {
    transactionId: transaction._id.toString(),
    appId: 'quickgpt',
    userId: userId.toString(),
  },
  expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
});
console.log("✅ Checkout session created:", session.id, session.metadata);


        res.json({
            success: true,
            url:session.url
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};

export const stripeWebhooks = async (request, response) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const { transactionId, appId } = session.metadata;

        if (appId === "quickgpt") {
          const transaction = await Transaction.findOne({
            _id: transactionId,
            isPaid: false,
          });

          if (transaction) {
            await User.updateOne(
              { _id: transaction.userId },
              { $inc: { credits: transaction.credits } }
            );

            transaction.isPaid = true;
            await transaction.save();
          }
        } else {
          return response.json({
            received: true,
            message: "Ignore event: Invalid app",
          });
        }
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
        break;
    }

    return response.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook Processing error", error);
    return response.status(500).send("Internal server error");
  }
};
