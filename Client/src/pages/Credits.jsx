// import React, { useState,useEffect } from 'react'
// import Loading from './Loading';
// import { dummyPlans } from '../assets/assets';
// import { useAppContext } from '../context/AppContext';
// import toast from 'react-hot-toast';


// const Credits = () => {
//   const [plans, setPlans] = useState([])
//   const [loading, setLoading] = useState(true);
//   const {token,axios} =useAppContext()

//   const fetchPlans = async () => {
//     try {
//       const {data} = await axios.get('/credit/plan',{
//         headers:{
//           Authorization:token
//         }
//       })
//       if(data.success){
//         setPlans(data.plans)
//       }else{
//         toast.error(data.message || 'Failed to fetch plans')
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//     setLoading(false)
//   }

//   const purchasePlan = async(planId)=>{
//     try {
//       const {data} = await axios.post('/credit/purchase',{planId},
//         {headers:{Authorization:token}})
//         if(data.success){
//           window.location.href = data.url
//       }else{
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     fetchPlans()
//   }, [])

//   if (loading) return <Loading/>
//   return (
//     <div className="max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 
//     lg:px-8 py-12">
//       <h2 className="text-3xl font-semibold text-center mb-10 xl:mt-30
//       text-gray-800 dark:text-white">Credit Plans</h2>
//       <div className="flex flex-wrap justify-center gap-8">
//         {plans.map((plan) => (
//           <div key={plan._id} className={`border border-gray-200
//           dark:border-purple-700 rounded-1g shadow hover:shadow-lg
//           transition-shadow p-6 min-w-[300px] flex flex-col ${plan._id==="pro"?
//           "bg-purple-50 dark:bg-purple-900":"bg-white dark:bg-transparent"}`}>
//             <div className="flex-1">
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white
//               mb-2">{plan.name}</h3>
//               <p className='text-2xl font-bold text-purple-600 dark:text-purple-300
//               mb-4'>${plan.price}
//                 <span className='text-base font-normal text-gray-600 
//                 dark:text-purple-200'>{' '}/{plan.credits} credits</span>
//               </p>
//               <ul className='list-disc list-inside text-gray-700 text-sm 
//               dark:text-purple-200 space-y-1'>
//                 {plan.features.map((feature,index) => (
//                   <li key={index}>{feature}</li>
//                 ))}
//               </ul>
//             </div>
//             <button onClick={()=>toast.promise(purchasePlan(plan._id),{loading:
//               'Processing...'})} className='mt-6 bg-purple-600 hover:bg-purple-700
//               active:bg-purple-800 text-white font-medium py-2 rounded
//               transition-colors cursor-pointer'>Buy Now</button>
//             </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Credits

// import React, { useState, useEffect } from 'react';
// import Loading from './Loading';
// import { useAppContext } from '../context/AppContext';
// import toast from 'react-hot-toast';

// const Credits = () => {
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { token, axios } = useAppContext();

//   // Fetch all credit plans from backend
//   const fetchPlans = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get('/credit/plan', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (data.success) setPlans(data.plans);
//       else toast.error(data.message || 'Failed to fetch plans');
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Purchase a plan
//   const purchasePlan = async (planId) => {
//     try {
//       const { data } = await axios.post(
//         '/credit/purchase',
//         { planId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (data.success) {
//         window.location.href = data.url; // redirect to payment gateway
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   if (loading) return <Loading />;

//   return (
//     <div className="max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800 dark:text-white">
//         Credit Plans
//       </h2>
//       <div className="flex flex-wrap justify-center gap-8">
//         {plans.map((plan) => (
//           <div
//             key={plan._id}
//             className={`border border-gray-200 dark:border-purple-700 rounded-lg shadow hover:shadow-lg transition-shadow p-6 min-w-[300px] flex flex-col ${
//               plan._id === 'pro'
//                 ? 'bg-purple-50 dark:bg-purple-900'
//                 : 'bg-white dark:bg-transparent'
//             }`}
//           >
//             <div className="flex-1">
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//                 {plan.name}
//               </h3>
//               <p className="text-2xl font-bold text-purple-600 dark:text-purple-300 mb-4">
//                 ${plan.price}
//                 <span className="text-base font-normal text-gray-600 dark:text-purple-200">
//                   {' '}
//                   / {plan.credits} credits
//                 </span>
//               </p>
//               <ul className="list-disc list-inside text-gray-700 text-sm dark:text-purple-200 space-y-1">
//                 {plan.features.map((feature, index) => (
//                   <li key={index}>{feature}</li>
//                 ))}
//               </ul>
//             </div>
//             <button
//               onClick={() =>
//                 toast.promise(purchasePlan(plan._id), {
//                   loading: 'Processing...',
//                   success: 'Redirecting to payment...',
//                   error: 'Failed to process purchase',
//                 })
//               }
//               className="mt-6 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-medium py-2 rounded transition-colors cursor-pointer"
//             >
//               Buy Now
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Credits;

// import React, { useState, useEffect } from 'react';
// import Loading from './Loading';
// import { useAppContext } from '../context/AppContext';
// import toast from 'react-hot-toast';

// const Credits = () => {
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { token: contextToken, axios } = useAppContext();

//   // Use token from context or fallback to localStorage (after payment redirect)
//   const token = contextToken || localStorage.getItem('token');

//   // Fetch all credit plans from backend
//   const fetchPlans = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get('/credit/plan', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (data.success) setPlans(data.plans);
//       else toast.error(data.message || 'Failed to fetch plans');
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Purchase a plan
//   const purchasePlan = async (planId) => {
//     try {
//       const { data } = await axios.post(
//         '/credit/purchase',
//         { planId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (data.success) {
//         // Save token to localStorage in case page reloads after payment
//         if (contextToken) localStorage.setItem('token', contextToken);

//         // Redirect to payment gateway
//         window.location.href = data.url;
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   useEffect(() => {
//     if (!token) return; // prevent API call if token is missing
//     fetchPlans();
//   }, [token]);

//   if (loading) return <Loading />;

//   return (
//     <div className="max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800 dark:text-white">
//         Credit Plans
//       </h2>
//       <div className="flex flex-wrap justify-center gap-8">
//         {plans.map((plan) => (
//           <div
//             key={plan._id}
//             className={`border border-gray-200 dark:border-purple-700 rounded-lg shadow hover:shadow-lg transition-shadow p-6 min-w-[300px] flex flex-col ${
//               plan._id === 'pro'
//                 ? 'bg-purple-50 dark:bg-purple-900'
//                 : 'bg-white dark:bg-transparent'
//             }`}
//           >
//             <div className="flex-1">
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//                 {plan.name}
//               </h3>
//               <p className="text-2xl font-bold text-purple-600 dark:text-purple-300 mb-4">
//                 ${plan.price}
//                 <span className="text-base font-normal text-gray-600 dark:text-purple-200">
//                   {' '}
//                   / {plan.credits} credits
//                 </span>
//               </p>
//               <ul className="list-disc list-inside text-gray-700 text-sm dark:text-purple-200 space-y-1">
//                 {plan.features.map((feature, index) => (
//                   <li key={index}>{feature}</li>
//                 ))}
//               </ul>
//             </div>
//             <button
//               onClick={() =>
//                 toast.promise(purchasePlan(plan._id), {
//                   loading: 'Processing...',
//                   success: 'Redirecting to payment...',
//                   error: 'Failed to process purchase',
//                 })
//               }
//               className="mt-6 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-medium py-2 rounded transition-colors cursor-pointer"
//             >
//               Buy Now
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Credits;

import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Credits = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token: contextToken, axios, setUser } = useAppContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Always fallback to localStorage token
  const token = contextToken || localStorage.getItem("token");

  // Fetch all credit plans
  const fetchPlans = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const { data } = await axios.get('/credit/plan', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) setPlans(data.plans);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Purchase a plan
  const purchasePlan = async (planId) => {
    try {
      const { data } = await axios.post(
        '/credit/purchase',
        { planId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        // Save token to localStorage in case of redirect
        if (contextToken) localStorage.setItem("token", contextToken);

        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Confirm payment if redirected from Stripe
  const confirmPayment = async (sessionId) => {
    try {
      const { data } = await axios.post(
        '/credit/confirm',
        { sessionId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success("Payment successful! Credits added.");
        setUser(prev => ({ ...prev, credits: data.newCredits }));
        navigate("/credits"); // Clean URL after confirmation
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // On mount
  useEffect(() => {
    fetchPlans();

    // Check for Stripe session_id in URL
    const sessionId = searchParams.get("session_id");
    if (sessionId && token) {
      confirmPayment(sessionId);
    }
  }, [token]);

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800 dark:text-white">
        Credit Plans
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {plans.map(plan => (
          <div key={plan._id} className={`border border-gray-200 dark:border-purple-700 rounded-lg shadow hover:shadow-lg transition-shadow p-6 min-w-[300px] flex flex-col ${plan._id === 'pro' ? 'bg-purple-50 dark:bg-purple-900' : 'bg-white dark:bg-transparent'}`}>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-300 mb-4">
                ${plan.price}
                <span className="text-base font-normal text-gray-600 dark:text-purple-200"> / {plan.credits} credits</span>
              </p>
              <ul className="list-disc list-inside text-gray-700 text-sm dark:text-purple-200 space-y-1">
                {plan.features.map((feature, idx) => <li key={idx}>{feature}</li>)}
              </ul>
            </div>
            <button
              onClick={() => toast.promise(purchasePlan(plan._id), { loading: 'Processing...', success: 'Redirecting to payment...', error: 'Failed to process purchase' })}
              className="mt-6 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-medium py-2 rounded transition-colors cursor-pointer"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Credits;






