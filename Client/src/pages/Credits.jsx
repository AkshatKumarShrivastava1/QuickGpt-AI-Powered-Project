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









// import React, { useState, useEffect } from 'react';
// import Loading from './Loading';
// import { useAppContext } from '../context/AppContext';
// import toast from 'react-hot-toast';

// const Credits = () => {
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { token, axios } = useAppContext();

//   const fetchPlans = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get('/credit/plan', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (data.success) setPlans(data.plans);
//       else toast.error(data.message || 'Failed to fetch plans');
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const purchasePlan = async (planId) => {
//     try {
//       const { data } = await axios.post(
//         '/credit/purchase',
//         { planId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (data.success) {
//         window.location.href = data.url;
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   if (loading) return <Loading />;

//   return (
//     <div className="max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800 dark:text-white">
//         Credit Plans
//       </h2>
//       <div className="flex flex-wrap justify-center gap-8">
//         {plans.map((plan) => (
//           <div
//             key={plan._id}
//             className={`border border-gray-200 dark:border-purple-700 rounded-lg shadow hover:shadow-lg transition-shadow p-6 min-w-[300px] flex flex-col ${
//               plan._id === 'pro'
//                 ? 'bg-purple-50 dark:bg-purple-900'
//                 : 'bg-white dark:bg-transparent'
//             }`}
//           >
//             <div className="flex-1">
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//                 {plan.name}
//               </h3>
//               <p className="text-2xl font-bold text-purple-600 dark:text-purple-300 mb-4">
//                 ${plan.price}
//                 <span className="text-base font-normal text-gray-600 dark:text-purple-200">
//                   {' '}
//                   / {plan.credits} credits
//                 </span>
//               </p>
//               <ul className="list-disc list-inside text-gray-700 text-sm dark:text-purple-200 space-y-1">
//                 {plan.features.map((feature, index) => (
//                   <li key={index}>{feature}</li>
//                 ))}
//               </ul>
//             </div>
//             <button
//               onClick={() =>
//                 toast.promise(purchasePlan(plan._id), {
//                   loading: 'Processing...',
//                   success: 'Redirecting to payment...',
//                   error: 'Failed to process purchase',
//                 })
//               }
//               className="mt-6 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-medium py-2 rounded transition-colors cursor-pointer"
//             >
//               Buy Now
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Credits;

// import React, { useState, useEffect } from 'react';
// import Loading from '../components/Loading'; // Assuming a Loading component exists
// import { useAppContext } from '../context/AppContext';
// import toast from 'react-hot-toast';
// import { useSearchParams, useNavigate } from 'react-router-dom'; // For handling URL params

// // New component to handle the success redirect from Stripe
// const PaymentSuccess = () => {
//     const { fetchUser, token } = useAppContext();
//     const navigate = useNavigate();

//     useEffect(() => {
//         // This effect runs when the component mounts after the redirect
//         toast.success("Payment successful! Updating your credits...");
        
//         // Re-fetch the user data to get the new credit balance
//         fetchUser(token).then(() => {
//             // After fetching, redirect back to the main credits page to clear the URL param
//             navigate('/credits');
//         });
//     }, [fetchUser, token, navigate]); // Dependencies for the effect

//     return <Loading />; // Show a loading spinner while we update the user data
// };


// const Credits = () => {
//     // Check if the URL has a `success=true` query parameter
//     const [searchParams] = useSearchParams();
//     const isSuccess = searchParams.get('success') === 'true';

//     const [plans, setPlans] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { token, axios } = useAppContext();

//     const fetchPlans = async () => {
//         setLoading(true);
//         try {
//             const { data } = await axios.get('/credit/plan', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             if (data.success) {
//                 setPlans(data.plans);
//             } else {
//                 toast.error(data.message || 'Failed to fetch plans');
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const purchasePlan = async (planId) => {
//         try {
//             const { data } = await axios.post(
//                 '/credit/purchase',
//                 { planId },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             if (data.success) {
//                 // Redirect the user to the Stripe checkout page
//                 window.location.href = data.url;
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//         }
//     };

//     useEffect(() => {
//         // Only fetch plans if it's not a success redirect
//         if (!isSuccess) {
//             fetchPlans();
//         }
//     }, [isSuccess]);

//     // If the URL indicates a successful payment, show the PaymentSuccess component
//     if (isSuccess) {
//         return <PaymentSuccess />;
//     }

//     if (loading) return <Loading />;

//     return (
//         <div className="max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-12">
//             <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800 dark:text-white">
//                 Credit Plans
//             </h2>
//             <div className="flex flex-wrap justify-center gap-8">
//                 {plans.map((plan) => (
//                     <div
//                         key={plan._id}
//                         className={`border border-gray-200 dark:border-purple-700 rounded-lg shadow hover:shadow-lg transition-shadow p-6 min-w-[300px] flex flex-col ${
//                             plan.name.toLowerCase().includes('pro')
//                                 ? 'bg-purple-50 dark:bg-purple-900'
//                                 : 'bg-white dark:bg-transparent'
//                         }`}
//                     >
//                         <div className="flex-1">
//                             <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//                                 {plan.name}
//                             </h3>
//                             <p className="text-2xl font-bold text-purple-600 dark:text-purple-300 mb-4">
//                                 ${plan.price}
//                                 <span className="text-base font-normal text-gray-600 dark:text-purple-200">
//                                     {' '}
//                                     / {plan.credits} credits
//                                 </span>
//                             </p>
//                             <ul className="list-disc list-inside text-gray-700 text-sm dark:text-purple-200 space-y-1">
//                                 {plan.features.map((feature, index) => (
//                                     <li key={index}>{feature}</li>
//                                 ))}
//                             </ul>
//                         </div>
//                         <button
//                             onClick={() =>
//                                 toast.promise(purchasePlan(plan._id), {
//                                     loading: 'Processing...',
//                                     success: 'Redirecting to payment...',
//                                     error: 'Failed to process purchase',
//                                 })
//                             }
//                             className="mt-6 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-medium py-2 rounded transition-colors cursor-pointer"
//                         >
//                             Buy Now
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Credits;

// import React from 'react';
// import Loading from '../pages/Loading'; // Corrected path
// import { useAppContext } from '../context/AppContext';
// import toast from 'react-hot-toast';
// import { useSearchParams, useNavigate } from 'react-router-dom';

// // This component now includes robust polling to wait for the backend update.
// const PaymentSuccess = () => {
//     const { fetchUser, token, user } = useAppContext();
//     const navigate = useNavigate();
//     const [initialCredits] = React.useState(user?.credits); // Store initial credits

//     React.useEffect(() => {
//         toast.success("Payment successful! Verifying your new credits...");

//         let attempts = 0;
//         const maxAttempts = 5; // Try up to 5 times

//         const verifyCredits = setInterval(() => {
//             attempts++;
//             // Re-fetch the user data to get the potentially new credit balance
//             fetchUser(token);

//             // The user object from the context will be updated by fetchUser.
//             // We check the latest value in the next interval.
//             // This is a simple polling mechanism. A more advanced one might check the new user object directly.
            
//             if (attempts >= maxAttempts) {
//                 clearInterval(verifyCredits);
//                 toast.error("Could not verify new credits automatically. Please refresh the page.");
//                 navigate('/credits');
//             }
//         }, 2000); // Check every 2 seconds

//         return () => clearInterval(verifyCredits); // Cleanup on unmount
//     }, [fetchUser, token, navigate]);

//     // This effect watches for the user object to change and have more credits.
//     React.useEffect(() => {
//         if (user && user.credits > initialCredits) {
//              toast.dismiss(); // Clear any loading toasts
//              toast.success("Credits updated successfully!");
//              navigate('/credits'); // Redirect back to the main credits page
//         }
//     }, [user, initialCredits, navigate]);


//     return <Loading text="Finalizing your purchase..." />;
// };


// const Credits = () => {
//     const [searchParams] = useSearchParams();
//     const isSuccess = searchParams.get('success') === 'true';

//     const [plans, setPlans] = React.useState([]);
//     const [loading, setLoading] = React.useState(true);
//     const { token, axios } = useAppContext();

//     const fetchPlans = React.useCallback(async () => {
//         setLoading(true);
//         try {
//             const { data } = await axios.get('/credit/plan', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             if (data.success) setPlans(data.plans);
//             else toast.error(data.message || 'Failed to fetch plans');
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//         } finally {
//             setLoading(false);
//         }
//     }, [token, axios]);

//     const purchasePlan = async (planId) => {
//         try {
//             const { data } = await axios.post(
//                 '/credit/purchase',
//                 { planId },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             if (data.success) {
//                 window.location.href = data.url;
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//         }
//     };

//     React.useEffect(() => {
//         if (!isSuccess) {
//             fetchPlans();
//         }
//     }, [isSuccess, fetchPlans]);

//     if (isSuccess) {
//         return <PaymentSuccess />;
//     }

//     if (loading) return <Loading />;

//     return (
//         <div className="max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-12">
//             <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800 dark:text-white">
//                 Credit Plans
//             </h2>
//             <div className="flex flex-wrap justify-center gap-8">
//                 {plans.map((plan) => (
//                     <div
//                         key={plan._id}
//                         className={`border border-gray-200 dark:border-purple-700 rounded-lg shadow hover:shadow-lg transition-shadow p-6 min-w-[300px] flex flex-col ${
//                             plan.name.toLowerCase().includes('pro')
//                                 ? 'bg-purple-50 dark:bg-purple-900'
//                                 : 'bg-white dark:bg-transparent'
//                         }`}
//                     >
//                         <div className="flex-1">
//                             <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//                                 {plan.name}
//                             </h3>
//                             <p className="text-2xl font-bold text-purple-600 dark:text-purple-300 mb-4">
//                                 ${plan.price}
//                                 <span className="text-base font-normal text-gray-600 dark:text-purple-200">
//                                     {' '}
//                                     / {plan.credits} credits
//                                 </span>
//                             </p>
//                             <ul className="list-disc list-inside text-gray-700 text-sm dark:text-purple-200 space-y-1">
//                                 {plan.features.map((feature, index) => (
//                                     <li key={index}>{feature}</li>
//                                 ))}
//                             </ul>
//                         </div>
//                         <button
//                             onClick={() =>
//                                 toast.promise(purchasePlan(plan._id), {
//                                     loading: 'Processing...',
//                                     success: 'Redirecting to payment...',
//                                     error: 'Failed to process purchase',
//                                 })
//                             }
//                             className="mt-6 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-medium py-2 rounded transition-colors cursor-pointer"
//                         >
//                             Buy Now
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// // export default Credits;
// import React, { useState, useEffect, useCallback } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { useAppContext } from '../context/AppContext';
// import toast from 'react-hot-toast';
// // Assuming you have a loading component, adjust the path if needed
// import Loading from '../pages/Loading';

// /**
//  * This component's only job is to set a flag in localStorage and redirect.
//  * It no longer handles polling or data fetching directly. This is a more
//  * robust solution to prevent re-render loops.
//  */
// const PaymentSuccess = () => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         // This effect runs only once when the component mounts.
//         console.log("PaymentSuccess mounted. Setting status flag in localStorage...");
        
//         // Set the flag that the AppContext will be listening for.
//         localStorage.setItem('payment_status', 'success');

//         // Redirect back to the main credits page. The AppContext will now handle
//         // the data fetching in the background upon the next page load or refresh.
//         navigate('/credits', { replace: true });

//     }, [navigate]); // Only depends on navigate, so it runs once.

//     return <Loading text="Finalizing your purchase, please wait..." />;
// };


// const Credits = () => {
//     const [searchParams] = useSearchParams();
//     // Check if the URL contains '?success=true'
//     const isSuccess = searchParams.get('success') === 'true';

//     const [plans, setPlans] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { token, axios } = useAppContext();

//     const fetchPlans = useCallback(async () => {
//         if (!token) {
//             setLoading(false);
//             return;
//         }
//         setLoading(true);
//         try {
//             const { data } = await axios.get('/credit/plan', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             if (data.success) {
//                 setPlans(data.plans);
//             } else {
//                 toast.error(data.message || 'Failed to fetch plans');
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//         } finally {
//             setLoading(false);
//         }
//     }, [token, axios]);

//     const purchasePlan = async (planId) => {
//         try {
//             // NOTE: Ensure your backend's purchasePlan controller uses this success_url.
//             const successUrl = `${window.location.origin}/credits?success=true`;
//             const cancelUrl = `${window.location.origin}/credits`;
//             const { data } = await axios.post(
//                 '/credit/purchase',
//                 { planId, success_url: successUrl, cancel_url: cancelUrl },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             if (data.success) {
//                 // Redirect the user to the Stripe checkout page
//                 window.location.href = data.url;
//             } else {
//                 toast.error(data.message);
//             }
//         // ✅ Corrected the syntax error from a period to an opening curly brace
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//         }
//     };

//     useEffect(() => {
//         // Only fetch plans if we are not on the success redirect page.
//         if (!isSuccess) {
//             fetchPlans();
//         }
//     }, [isSuccess, fetchPlans]);

//     // If the URL has ?success=true, render the success component.
//     if (isSuccess) {
//         return <PaymentSuccess />;
//     }

//     if (loading) return <Loading />;

//     return (
//         <div className="max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-12">
//             <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800 dark:text-white">
//                 Credit Plans
//             </h2>
//             <div className="flex flex-wrap justify-center gap-8">
//                 {plans.map((plan) => (
//                     <div
//                         key={plan._id}
//                         className={`border border-gray-200 dark:border-purple-700 rounded-lg shadow hover:shadow-lg transition-shadow p-6 min-w-[300px] flex flex-col ${
//                             plan.name.toLowerCase().includes('pro')
//                                 ? 'bg-purple-50 dark:bg-purple-900'
//                                 : 'bg-white dark:bg-transparent'
//                         }`}
//                     >
//                         <div className="flex-1">
//                             <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//                                 {plan.name}
//                             </h3>
//                             <p className="text-2xl font-bold text-purple-600 dark:text-purple-300 mb-4">
//                                 ${plan.price}
//                                 <span className="text-base font-normal text-gray-600 dark:text-purple-200">
//                                     {' '}
//                                     / {plan.credits} credits
//                                 </span>
//                             </p>
//                             <ul className="list-disc list-inside text-gray-700 text-sm dark:text-purple-200 space-y-1">
//                                 {plan.features.map((feature, index) => (
//                                     <li key={index}>{feature}</li>
//                                 ))}
//                             </ul>
//                         </div>
//                         <button
//                             onClick={() =>
//                                 toast.promise(purchasePlan(plan._id), {
//                                     loading: 'Processing...',
//                                     success: 'Redirecting to payment...',
//                                     error: 'Failed to process purchase',
//                                 })
//                             }
//                             className="mt-6 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-medium py-2 rounded transition-colors cursor-pointer"
//                         >
//                             Buy Now
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Credits;

// src/pages/Credits.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import Loading from '../pages/Loading';

const PAYMENT_KEY = 'payment_status_v2';

// Only sets a unique flag and redirects. No toast / fetch here.
const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // unique id so multiple mounts won't collide
    const payload = { status: 'success', id: Date.now() };
    localStorage.setItem(PAYMENT_KEY, JSON.stringify(payload));
    // redirect back to credits page; AppContext will pick up the localStorage flag
    navigate('/credits', { replace: true });
  }, [navigate]);

  return <Loading text="Finalizing your purchase, please wait..." />;
};

const Credits = () => {
  const [searchParams] = useSearchParams();
  const isSuccess = searchParams.get('success') === 'true';

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, axios, user } = useAppContext();

  const fetchPlans = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.get('/credit/plan', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setPlans(data.plans);
      } else {
        toast.error(data.message || 'Failed to fetch plans');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }, [token, axios]);

  const purchasePlan = async (planId) => {
    try {
      // tell backend where to redirect after checkout (we still pass to backend)
      const successUrl = `${window.location.origin}/credits?success=true`;
      const cancelUrl = `${window.location.origin}/credits`;
      const { data } = await axios.post(
        '/credit/purchase',
        { planId, success_url: successUrl, cancel_url: cancelUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success && data.url) {
        // go to stripe checkout
        window.location.href = data.url;
      } else {
        toast.error(data.message || 'Failed to create session');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (!isSuccess) fetchPlans();
  }, [isSuccess, fetchPlans]);

  if (isSuccess) return <PaymentSuccess />;
  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800 dark:text-white">
        Credit Plans {user ? `(Your credits: ${user.credits ?? 0})` : ''}
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className={`border border-gray-200 dark:border-purple-700 rounded-lg shadow hover:shadow-lg transition-shadow p-6 min-w-[300px] flex flex-col ${
              plan.name.toLowerCase().includes('pro')
                ? 'bg-purple-50 dark:bg-purple-900'
                : 'bg-white dark:bg-transparent'
            }`}
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {plan.name}
              </h3>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-300 mb-4">
                ${plan.price}
                <span className="text-base font-normal text-gray-600 dark:text-purple-200">
                  {' '}
                  / {plan.credits} credits
                </span>
              </p>
              <ul className="list-disc list-inside text-gray-700 text-sm dark:text-purple-200 space-y-1">
                {plan.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() =>
                toast.promise(purchasePlan(plan._id), {
                  loading: 'Processing...',
                  success: 'Redirecting to payment...',
                  error: 'Failed to process purchase',
                })
              }
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
