// import React, { useEffect, useRef } from 'react'
// import { useAppContext } from '../context/AppContext'
// import { useState } from 'react';
// import { assets } from '../assets/assets';
// import Message from './Message';
// import toast from 'react-hot-toast';


// const ChatBox = () => {
//   const containerRef = useRef(null);
//   const { selectedChat, theme ,user, axios,token,setUser} = useAppContext();
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [prompt, setPrompt] = useState('');
//   const [mode, setMode] = useState('text');
//   const [isPublished, setIsPublished] = useState(false);

//   // const onSubmit = (e) => {
//   //   try {
//   //     e.preventDefault();
//   //     if(!user) return toast('Login to send message')
//   //       setLoading(true)
//   //     const promptCopy = prompt
//   //     setPrompt('')
//   //     setMessages(prev=>[...prev,{role:'user',content:prompt,timestamp:
//   //       Date.now(),isImage:false
//   //     }])

//   //     const {data} =async axios.post(`/api/message/${mode}`,{chatId:
//   //       selectedChat._id,prompt,isPublished},{headers:{Authorization:token}})
//   //       if(data.success){
//   //         setMessages(prev=>[...prev,data.reply])
//   //         if(mode==='image'){
//   //           setUser(prev=>({...prev,credits:prev.credits-2}))
//   //         }else{
//   //           setUser(prev=>({...prev,credits:prev.credits-1}))
//   //         }
//   //       }else{
//   //         toast.error(data.message)
//   //         setPrompt(promptCopy)
//   //       }
//   //   } catch (error) {
//   //       toast.error(error.message)
//   //   }finally{
//   //     setPrompt('')
//   //     setLoading(false)
//   //   }
//   // }

//   const onSubmit = async (e) => {
//   e.preventDefault();
//   if(!user) return toast('Login to send message');
//   setLoading(true);
//   const promptCopy = prompt;
//   setPrompt('');
//   setMessages(prev => [...prev, {role:'user', content: prompt, timestamp: Date.now(), isImage: false}]);

//   try {
//     const { data } = await axios.post(`/message/${mode}`, {
//       chatId: selectedChat._id,
//       prompt,
//       isPublished
//     }, { headers: { Authorization: `Bearer ${token}` } });

//     if(data.success){
//       setMessages(prev => [...prev, data.reply]);
//       // Deduct credits
//       setUser(prev => ({
//         ...prev,
//         credits: prev.credits - (mode === 'image' ? 2 : 1)
//       }));
//     } else {
//       toast.error(data.message);
//       setPrompt(promptCopy);
//     }
//   } catch (error) {
//     toast.error(error.response?.data?.message || error.message);
//     setPrompt(promptCopy);
//   } finally {
//     setLoading(false);
//   }
// }

//   useEffect(() => {
//     if (selectedChat) {
//       setMessages(selectedChat.messages);
//     }
//   }, [selectedChat])


//   useEffect(() => {
//     if(containerRef.current){
//       containerRef.current.scrollTo({
//         top:containerRef.current.scrollHeight,
//         behavior:'smooth',
//       })
//     }
//   }, [messages])
//   return (
//     <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30
//     max-md:mt-14 2xl:pr-40'>
//       {/* Chat Messages */}
//       <div ref={containerRef} className='flex-1 overflow-y-scroll mb-5'>
//         {messages.length === 0 && (
//           <div className='h-full flex flex-col justify-center items-center gap-2 
//           text-primary'>
//             <img src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark}
//               className='w-40 max-w-56 sm:max-w-68' />
//             <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-400
//             dark:text-white'>Ask me Anything</p>
//           </div>
//         )}
//         {messages.map((message, index) => <Message key={index} message={message} />)}

//         {/* Three Dots Animation */}
//         {loading && <div className="loader flex items-center gap-1.5">
//           <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white
//           animate-bounce"></div>
//           <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white
//           animate-bounce"></div>
//           <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white
//           animate-bounce"></div>
//         </div>}
//       </div>

//       {mode==='image' && (
//         <label className='inline-flex items-center gap-2 text-sm mb-3 mx-auto'>
//           <p className="text-xs">Publish Generated Image to Community</p>
//           <input type="checkbox" className='cursor-pointer' />
//         </label>
//       )}


//       {/* Prompt Input Box */}
//       <form onSubmit={onSubmit} className='bg-primary/20 dark:bg-[#583C79]/30 border border-primary
//       dark:border-[#80609F]/30 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex
//       gap-4 items-center'>
//         <select onChange={(e) => setMode(e.target.value)} value={mode}
//           className='text-sm pl-3 pr-2 outline-none'>
//           <option className='dark:bg-purple-900' value='text'>Text</option>
//           <option className='dark:bg-purple-900' value='image'>Image</option>
//         </select>
//         <input type="text" onChange={(e) => setPrompt(e.target.value)} value={prompt}
//           placeholder="Type your text prompt here..."
//           className="flex-1 w-full text-sm outline-none" required />
//         <button disabled={loading}>
//           <img src={loading ? assets.stop_icon : assets.send_icon} className='w-8
//             cursor-pointer'/>
//         </button>
//       </form>
//     </div>
//   )
// }

// export default ChatBox


// import React, { useEffect, useRef, useState } from 'react';
// import { useAppContext } from '../context/AppContext';
// import { assets } from '../assets/assets';
// import Message from './Message';
// import toast from 'react-hot-toast';

// const ChatBox = () => {
//   const containerRef = useRef(null);
//   const { selectedChat, theme, user, axios, token, setUser, setChats, chats } = useAppContext();
  
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [prompt, setPrompt] = useState('');
//   const [mode, setMode] = useState('text');
//   const [isPublished, setIsPublished] = useState(false);

//   // Handle message submission
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) return toast('Login to send message');
//     if (!selectedChat) return toast.error('Select a chat first');

//     setLoading(true);
//     const promptCopy = prompt;
//     setPrompt('');

//     // Add temporary user message
//     setMessages(prev => [...prev, { role: 'user', content: prompt, timestamp: Date.now(), isImage: mode === 'image' }]);

//     try {
//       const { data } = await axios.post(`/message/${mode}`, 
//         { chatId: selectedChat._id, prompt, isPublished },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (data.success) {
//         // Add AI reply
//         setMessages(prev => [...prev, data.reply]);

//         // Update selected chat messages globally
//         setChats(prevChats =>
//           prevChats.map(chat =>
//             chat._id === selectedChat._id
//               ? { ...chat, messages: [...chat.messages, { role: 'user', content: prompt }, data.reply] }
//               : chat
//           )
//         );

//         // Deduct credits
//         setUser(prev => ({
//           ...prev,
//           credits: prev.credits - (mode === 'image' ? 2 : 1)
//         }));

//         // Reset isPublished for next image
//         if (mode === 'image') setIsPublished(false);

//       } else {
//         toast.error(data.message);
//         setPrompt(promptCopy);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//       setPrompt(promptCopy);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load messages when chat changes
//   useEffect(() => {
//     if (selectedChat) {
//       setMessages(selectedChat.messages || []);
//     }
//   }, [selectedChat]);

//   // Auto-scroll
//   useEffect(() => {
//     if (containerRef.current) {
//       containerRef.current.scrollTo({
//         top: containerRef.current.scrollHeight,
//         behavior: 'smooth',
//       });
//     }
//   }, [messages]);

//   return (
//     <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>

//       {/* Chat Messages */}
//       <div ref={containerRef} className='flex-1 overflow-y-scroll mb-5'>
//         {messages.length === 0 && (
//           <div className='h-full flex flex-col justify-center items-center gap-2 text-primary'>
//             <img src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark} className='w-40 max-w-56 sm:max-w-68' />
//             <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white'>
//               Ask me Anything
//             </p>
//           </div>
//         )}

//         {messages.map((message, index) => <Message key={index} message={message} />)}

//         {/* Loading indicator */}
//         {loading && (
//           <div className="loader flex items-center gap-1.5">
//             <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
//             <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
//             <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
//           </div>
//         )}
//       </div>

//       {/* Publish Image Checkbox */}
//       {mode === 'image' && (
//         <label className='inline-flex items-center gap-2 text-sm mb-3 mx-auto'>
//           <p className="text-xs">Publish Generated Image to Community</p>
//           <input
//             type="checkbox"
//             checked={isPublished}
//             onChange={() => setIsPublished(prev => !prev)}
//             className='cursor-pointer'
//           />
//         </label>
//       )}

//       {/* Input Box */}
//       <form onSubmit={onSubmit} className='bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark:border-[#80609F]/30 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center'>
//         <select onChange={(e) => setMode(e.target.value)} value={mode} className='text-sm pl-3 pr-2 outline-none'>
//           <option className='dark:bg-purple-900' value='text'>Text</option>
//           <option className='dark:bg-purple-900' value='image'>Image</option>
//         </select>
//         <input
//           type="text"
//           onChange={(e) => setPrompt(e.target.value)}
//           value={prompt}
//           placeholder="Type your text prompt here..."
//           className="flex-1 w-full text-sm outline-none"
//           required
//         />
//         <button disabled={loading}>
//           <img src={loading ? assets.stop_icon : assets.send_icon} className='w-8 cursor-pointer' />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChatBox;

// import React, { useEffect, useRef, useState } from 'react';
// import { useAppContext } from '../context/AppContext';
// import { assets } from '../assets/assets';
// import Message from './Message';
// import toast from 'react-hot-toast';
// import { generateImageWithHuggingFace } from '../utils/huggingfaceApi.js';

// const ChatBox = () => {
//     const containerRef = useRef(null);
//     const { selectedChat, theme, user, axios, token, setUser, setChats, setSelectedChat, chats } = useAppContext();

//     const [messages, setMessages] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [prompt, setPrompt] = useState('');
//     const [mode, setMode] = useState('text');
//     const [isPublished, setIsPublished] = useState(false);

//     const uploadToCloudinary = async (imageBlob) => {
//         const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
//         const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

//         if (!cloudName || !uploadPreset) {
//             toast.error("Cloudinary credentials are not configured. Please check your .env file.");
//             return null;
//         }

//         const formData = new FormData();
//         formData.append('file', imageBlob);
//         formData.append('upload_preset', uploadPreset);

//         try {
//             toast.loading('Uploading image...');
//             const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//                 method: 'POST',
//                 body: formData,
//             });
//             const data = await response.json();
//             toast.dismiss();
//             if (data.secure_url) {
//                 toast.success('Image uploaded successfully!');
//                 return data.secure_url;
//             } else {
//                 throw new Error('Upload failed. No secure URL returned.');
//             }
//         } catch (error) {
//             toast.dismiss();
//             console.error('Cloudinary upload error:', error);
//             toast.error('Failed to upload image to cloud.');
//             return null;
//         }
//     };

//     const onSubmit = async (e) => {
//         e.preventDefault();
//         if (!user) return toast.error('Please log in to start a chat.');
//         if (!selectedChat) return toast.error('Please select a chat first.');
//         if (!prompt.trim()) return;

//         setLoading(true);
//         const currentPrompt = prompt;
//         setPrompt('');

//         if (mode === 'image') {
//             await handleImageGeneration(currentPrompt);
//         } else {
//             await handleTextMessage(currentPrompt);
//         }

//         setLoading(false);
//     };

//     const handleTextMessage = async (currentPrompt) => {
//         const userMessage = { role: 'user', content: currentPrompt, timestamp: Date.now(), isImage: false };
//         setMessages(prev => [...prev, userMessage]);

//         try {
//             const { data } = await axios.post(`/message/text`,
//                 { chatId: selectedChat._id, prompt: currentPrompt },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             if (data.success) {
//                 setMessages(prev => [...prev, data.reply]);
//                 const updatedChats = chats.map(chat =>
//                     chat._id === selectedChat._id ? { ...chat, messages: [...chat.messages, userMessage, data.reply] } : chat
//                 );
//                 setChats(updatedChats);
//                 setSelectedChat(prev => ({ ...prev, messages: [...prev.messages, userMessage, data.reply] }));
//                 setUser(prev => ({ ...prev, credits: prev.credits - 1 }));
//             } else {
//                 toast.error(data.message);
//                 setMessages(prev => prev.filter(msg => msg.timestamp !== userMessage.timestamp));
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Failed to get response.');
//             setMessages(prev => prev.filter(msg => msg.timestamp !== userMessage.timestamp));
//         }
//     };

//     const handleImageGeneration = async (currentPrompt) => {
//         const userMessage = { role: 'user', content: currentPrompt, timestamp: Date.now(), isImage: false };
//         setMessages(prev => [...prev, userMessage]);

//         const imageBlob = await generateImageWithHuggingFace(currentPrompt);
//         if (!imageBlob) {
//             setMessages(prev => prev.filter(msg => msg.timestamp !== userMessage.timestamp));
//             return;
//         }

//         const imageUrl = await uploadToCloudinary(imageBlob);
//         if (!imageUrl) {
//             setMessages(prev => prev.filter(msg => msg.timestamp !== userMessage.timestamp));
//             return;
//         }

//         const aiReply = { role: 'assistant', content: imageUrl, timestamp: Date.now(), isImage: true, isPublished };
//         setMessages(prev => [...prev, aiReply]);

//         try {
//             await axios.post('/message/save',
//                 { chatId: selectedChat._id, userMessage, aiReply },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             if (isPublished) {
//                 await axios.post('/community/publish',
//                     { prompt: currentPrompt, imageUrl },
//                     { headers: { Authorization: `Bearer ${token}` } }
//                 );
//                 toast.success('Image published to community!');
//             }

//             const updatedChats = chats.map(chat =>
//                 chat._id === selectedChat._id ? { ...chat, messages: [...chat.messages, userMessage, aiReply] } : chat
//             );
//             setChats(updatedChats);
//             setSelectedChat(prev => ({ ...prev, messages: [...prev.messages, userMessage, aiReply] }));
//             setUser(prev => ({ ...prev, credits: prev.credits - 2 }));
//             setIsPublished(false);

//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Failed to save or publish image.');
//             setMessages(prev => prev.filter(msg => msg.timestamp !== userMessage.timestamp && msg.timestamp !== aiReply.timestamp));
//         }
//     };

//     useEffect(() => {
//         if (selectedChat) {
//             setMessages(selectedChat.messages || []);
//         }
//     }, [selectedChat]);

//     useEffect(() => {
//         if (containerRef.current) {
//             containerRef.current.scrollTo({
//                 top: containerRef.current.scrollHeight,
//                 behavior: 'smooth',
//             });
//         }
//     }, [messages]);

//     return (
//         <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>
//             <div ref={containerRef} className='flex-1 overflow-y-scroll mb-5'>
//                 {messages.length === 0 && (
//                     <div className='h-full flex flex-col justify-center items-center gap-2 text-primary'>
//                         <img src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark} alt="logo" className='w-40 max-w-56 sm:max-w-68' />
//                         <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white'>
//                             Ask me Anything
//                         </p>
//                     </div>
//                 )}
//                 {messages.map((message, index) => <Message key={index} message={message} />)}
//                 {loading && (
//                     <div className="loader flex items-center gap-1.5">
//                         <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
//                         <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
//                         <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
//                     </div>
//                 )}
//             </div>
//             {mode === 'image' && (
//                 <label className='inline-flex items-center gap-2 text-sm mb-3 mx-auto'>
//                     <p className="text-xs">Publish Generated Image to Community</p>
//                     <input
//                         type="checkbox"
//                         checked={isPublished}
//                         onChange={() => setIsPublished(prev => !prev)}
//                         className='cursor-pointer'
//                     />
//                 </label>
//             )}
//             <form onSubmit={onSubmit} className='bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark:border-[#80609F]/30 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center'>
//                 <select onChange={(e) => setMode(e.target.value)} value={mode} className='text-sm pl-3 pr-2 outline-none bg-transparent'>
//                     <option className='dark:bg-purple-900' value='text'>Text</option>
//                     <option className='dark:bg-purple-900' value='image'>Image</option>
//                 </select>
//                 <input
//                     type="text"
//                     onChange={(e) => setPrompt(e.target.value)}
//                     value={prompt}
//                     placeholder="Type your text prompt here..."
//                     className="flex-1 w-full text-sm outline-none bg-transparent"
//                     required
//                 />
//                 <button disabled={loading}>
//                     <img src={loading ? assets.stop_icon : assets.send_icon} alt="send" className='w-8 cursor-pointer' />
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default ChatBox;

// import React, { useEffect, useRef, useState } from 'react';
// import { useAppContext } from '../context/AppContext';
// import { assets } from '../assets/assets';
// import Message from './Message';
// import toast from 'react-hot-toast';
// import { generateImageWithHuggingFace } from '../utils/huggingfaceApi.js';

// const ChatBox = () => {
//     const containerRef = useRef(null);
//     const { selectedChat, theme, user, axios, token, setUser, setChats, setSelectedChat } = useAppContext();

//     const [messages, setMessages] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [prompt, setPrompt] = useState('');
//     const [mode, setMode] = useState('text');
//     const [isPublished, setIsPublished] = useState(false);

//     const uploadToCloudinary = async (imageBlob) => {
//         const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
//         const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

//         if (!cloudName || !uploadPreset) {
//             toast.error("Cloudinary credentials are not configured. Please check your .env file.");
//             return null;
//         }

//         const formData = new FormData();
//         formData.append('file', imageBlob);
//         formData.append('upload_preset', uploadPreset);

//         try {
//             // ✅ Changed toast to be more generic
//             toast.loading('Processing image...');
//             const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//                 method: 'POST',
//                 body: formData,
//             });
//             const data = await response.json();
//             toast.dismiss();
//             if (data.secure_url) {
//                 toast.success('Image processed successfully!');
//                 return data.secure_url;
//             } else {
//                 throw new Error('Upload failed. No secure URL returned.');
//             }
//         } catch (error) {
//             toast.dismiss();
//             console.error('Cloudinary upload error:', error);
//             toast.error('Failed to upload image to cloud.');
//             return null;
//         }
//     };

//     const onSubmit = async (e) => {
//         e.preventDefault();
//         if (!user) return toast.error('Please log in to start a chat.');
//         if (!selectedChat) return toast.error('Please select a chat first.');
//         if (!prompt.trim()) return;

//         setLoading(true);
//         const currentPrompt = prompt;
//         setPrompt('');

//         if (mode === 'image') {
//             await handleImageGeneration(currentPrompt);
//         } else {
//             await handleTextMessage(currentPrompt);
//         }

//         setLoading(false);
//     };

//     const handleTextMessage = async (currentPrompt) => {
//         const userMessage = { role: 'user', content: currentPrompt, timestamp: Date.now(), isImage: false };
//         setMessages(prev => [...prev, userMessage]);

//         try {
//             const { data } = await axios.post(`/message/text`,
//                 { chatId: selectedChat._id, prompt: currentPrompt },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             if (data.success) {
//                 const aiReply = data.reply;
//                 setMessages(prev => [...prev, aiReply]);
                
//                 // ✅ Use functional updates to prevent stale state issues
//                 const newMessagesForGlobalState = [userMessage, aiReply];
//                 setChats(prevChats => prevChats.map(chat =>
//                     chat._id === selectedChat._id ? { ...chat, messages: [...chat.messages, ...newMessagesForGlobalState] } : chat
//                 ));
//                 setSelectedChat(prev => prev ? { ...prev, messages: [...prev.messages, ...newMessagesForGlobalState] } : null);
//                 setUser(prev => ({ ...prev, credits: prev.credits - 1 }));
//             } else {
//                 toast.error(data.message);
//                 setMessages(prev => prev.filter(msg => msg.timestamp !== userMessage.timestamp));
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Failed to get response.');
//             setMessages(prev => prev.filter(msg => msg.timestamp !== userMessage.timestamp));
//         }
//     };

//     // ✅ Refactored this entire function for more robust error handling and state management
//     const handleImageGeneration = async (currentPrompt) => {
//         const userMessage = { role: 'user', content: currentPrompt, timestamp: Date.now(), isImage: false };
//         setMessages(prev => [...prev, userMessage]);

//         const imageBlob = await generateImageWithHuggingFace(currentPrompt);
//         if (!imageBlob) {
//             setMessages(prev => prev.filter(msg => msg.timestamp !== userMessage.timestamp));
//             return;
//         }

//         const imageUrl = await uploadToCloudinary(imageBlob);
//         if (!imageUrl) {
//             setMessages(prev => prev.filter(msg => msg.timestamp !== userMessage.timestamp));
//             return;
//         }

//         const aiReply = { role: 'assistant', content: imageUrl, timestamp: Date.now(), isImage: true, isPublished };
        
//         // --- Backend Operations ---
//         try {
//             // Step 1: Save the message to the chat first. This is the primary action.
//             await axios.post('/message/save',
//                 { chatId: selectedChat._id, userMessage, aiReply },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             // Step 2: If saving is successful, update all global states definitively.
//             const newMessagesForGlobalState = [userMessage, aiReply];
//             setMessages(prev => [...prev, aiReply]);

//             setChats(prevChats =>
//                 prevChats.map(chat =>
//                     chat._id === selectedChat._id
//                         ? { ...chat, messages: [...chat.messages, ...newMessagesForGlobalState] }
//                         : chat
//                 )
//             );
//             setSelectedChat(prevSelectedChat =>
//                 prevSelectedChat
//                     ? { ...prevSelectedChat, messages: [...prevSelectedChat.messages, ...newMessagesForGlobalState] }
//                     : null
//             );
//             setUser(prevUser => ({ ...prevUser, credits: prevUser.credits - 2 }));

//             // Step 3: Handle the optional publish step. Its failure will not affect the chat.
//             if (isPublished) {
//                 try {
//                     await axios.post('/community/publish',
//                         { prompt: currentPrompt, imageUrl },
//                         { headers: { Authorization: `Bearer ${token}` } }
//                     );
//                     toast.success('Image published to community!');
//                 } catch (publishError) {
//                     toast.error(publishError.response?.data?.message || 'Failed to publish, but it is saved in your chat.');
//                 }
//             }
//             setIsPublished(false);

//         } catch (saveError) {
//             // This catch block now only triggers if saving the main chat fails.
//             toast.error(saveError.response?.data?.message || 'Failed to save chat history.');
//             setMessages(prev => prev.filter(msg => msg.timestamp !== userMessage.timestamp));
//         }
//     };


//     useEffect(() => {
//         if (selectedChat) {
//             setMessages(selectedChat.messages || []);
//         }
//     }, [selectedChat?._id]);

//     useEffect(() => {
//         if (containerRef.current) {
//             containerRef.current.scrollTo({
//                 top: containerRef.current.scrollHeight,
//                 behavior: 'smooth',
//             });
//         }
//     }, [messages]);

//     return (
//         <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>
//             <div ref={containerRef} className='flex-1 overflow-y-scroll mb-5'>
//                 {messages.length === 0 && (
//                     <div className='h-full flex flex-col justify-center items-center gap-2 text-primary'>
//                         <img src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark} alt="logo" className='w-40 max-w-56 sm:max-w-68' />
//                         <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white'>
//                             Ask me Anything
//                         </p>
//                     </div>
//                 )}
//                 {messages.map((message, index) => <Message key={`${message.timestamp}-${index}`} message={message} />)}
//                 {loading && (
//                     <div className="loader flex items-center gap-1.5">
//                         <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
//                         <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
//                         <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
//                     </div>
//                 )}
//             </div>
//             {mode === 'image' && (
//                 <label className='inline-flex items-center gap-2 text-sm mb-3 mx-auto'>
//                     <p className="text-xs">Publish Generated Image to Community</p>
//                     <input
//                         type="checkbox"
//                         checked={isPublished}
//                         onChange={() => setIsPublished(prev => !prev)}
//                         className='cursor-pointer'
//                     />
//                 </label>
//             )}
//             <form onSubmit={onSubmit} className='bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark:border-[#80609F]/30 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center'>
//                 <select onChange={(e) => setMode(e.target.value)} value={mode} className='text-sm pl-3 pr-2 outline-none bg-transparent'>
//                     <option className='dark:bg-purple-900' value='text'>Text</option>
//                     <option className='dark:bg-purple-900' value='image'>Image</option>
//                 </select>
//                 <input
//                     type="text"
//                     onChange={(e) => setPrompt(e.target.value)}
//                     value={prompt}
//                     placeholder="Type your text prompt here..."
//                     className="flex-1 w-full text-sm outline-none bg-transparent"
//                     required
//                 />
//                 <button disabled={loading}>
//                     <img src={loading ? assets.stop_icon : assets.send_icon} alt="send" className='w-8 cursor-pointer' />
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default ChatBox;

import React, { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import Message from './Message';
import toast from 'react-hot-toast';
import { generateImageWithHuggingFace } from '../utils/huggingfaceApi.js';

const ChatBox = () => {
  const containerRef = useRef(null);
  const { selectedChat, theme, user, axios, token, setUser, setChats, setSelectedChat } = useAppContext();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState('text');
  const [isPublished, setIsPublished] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || '';

  const uploadToCloudinary = async (imageBlob) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      toast.error("Cloudinary credentials not configured.");
      return null;
    }

    const formData = new FormData();
    formData.append('file', imageBlob);
    formData.append('upload_preset', uploadPreset);

    try {
      toast.loading('Processing image...');
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      toast.dismiss();
      if (data.secure_url) {
        toast.success('Image processed successfully!');
        return data.secure_url;
      } else {
        throw new Error('Upload failed.');
      }
    } catch (error) {
      toast.dismiss();
      console.error('Cloudinary upload error:', error);
      toast.error('Failed to upload image.');
      return null;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error('Please log in.');
    if (!selectedChat) return toast.error('Select a chat first.');
    if (!prompt.trim()) return;

    setLoading(true);
    const currentPrompt = prompt;
    setPrompt('');

    if (mode === 'image') {
      await handleImageGeneration(currentPrompt);
    } else {
      await handleTextMessage(currentPrompt);
    }

    setLoading(false);
  };

  const handleTextMessage = async (currentPrompt) => {
    const userMessage = { role: 'user', content: currentPrompt, timestamp: Date.now(), isImage: false };
    setMessages(prev => [...prev, userMessage]);

    try {
      const { data } = await axios.post(`/message/text`,
        { chatId: selectedChat._id, prompt: currentPrompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        const aiReply = data.reply;
        const newMessages = [userMessage, aiReply];

        setMessages(prev => [...prev, aiReply]);
        setChats(prevChats => prevChats.map(chat =>
          chat._id === selectedChat._id ? { ...chat, messages: [...chat.messages, ...newMessages] } : chat
        ));
        setSelectedChat(prev => prev ? { ...prev, messages: [...prev.messages, ...newMessages] } : null);
        setUser(prev => ({ ...prev, credits: prev.credits - 1 }));
      } else {
        toast.error(data.message);
        setMessages(prev => prev.filter(msg => msg.timestamp !== userMessage.timestamp));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to get response.');
      setMessages(prev => prev.filter(msg => msg.timestamp !== userMessage.timestamp));
    }
  };

  const handleImageGeneration = async (currentPrompt) => {
    const userMessage = { role: 'user', content: currentPrompt, timestamp: Date.now(), isImage: false };
    setMessages(prev => [...prev, userMessage]);

    const imageBlob = await generateImageWithHuggingFace(currentPrompt);
    if (!imageBlob) {
      setMessages(prev => prev.filter(msg => msg.timestamp !== userMessage.timestamp));
      return;
    }

    const imageUrl = await uploadToCloudinary(imageBlob);
    if (!imageUrl) {
      setMessages(prev => prev.filter(msg => msg.timestamp !== userMessage.timestamp));
      return;
    }

    const aiReply = { role: 'assistant', content: imageUrl, timestamp: Date.now(), isImage: true, isPublished };

    try {
      // Save chat messages first
      await axios.post('/message/save',
        { chatId: selectedChat._id, userMessage, aiReply },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newMessages = [userMessage, aiReply];
      setMessages(prev => [...prev, aiReply]);
      setChats(prevChats => prevChats.map(chat =>
        chat._id === selectedChat._id ? { ...chat, messages: [...chat.messages, ...newMessages] } : chat
      ));
      setSelectedChat(prev => prev ? { ...prev, messages: [...prev.messages, ...newMessages] } : null);
      setUser(prev => ({ ...prev, credits: prev.credits - 2 }));

      // Publish image if requested
      if (isPublished) {
        try {
          const response = await axios.post(`${API_BASE}/community/publish`,
            { prompt: currentPrompt, imageUrl },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (response.data?.success) {
            toast.success('Image published to community!');
          } else {
            console.warn('Publish response indicates failure, but chat saved:', response.data);
          }
        } catch (publishError) {
          console.warn('Publish error ignored (chat already saved):', publishError);
        }
        setIsPublished(false);
      }
    } catch (saveError) {
      toast.error(saveError.response?.data?.message || 'Failed to save chat history.');
      setMessages(prev => prev.filter(msg => msg.timestamp !== userMessage.timestamp));
    }
  };

  useEffect(() => {
    if (selectedChat) setMessages(selectedChat.messages || []);
  }, [selectedChat?._id]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>
      <div ref={containerRef} className='flex-1 overflow-y-scroll mb-5'>
        {messages.length === 0 && (
          <div className='h-full flex flex-col justify-center items-center gap-2 text-primary'>
            <img src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark} alt="logo" className='w-40 max-w-56 sm:max-w-68' />
            <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white'>
              Ask me Anything
            </p>
          </div>
        )}
        {messages.map((message, index) => <Message key={`${message.timestamp}-${index}`} message={message} />)}
        {loading && (
          <div className="loader flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
          </div>
        )}
      </div>

      {mode === 'image' && (
        <label className='inline-flex items-center gap-2 text-sm mb-3 mx-auto'>
          <p className="text-xs">Publish Generated Image to Community</p>
          <input
            type="checkbox"
            checked={isPublished}
            onChange={() => setIsPublished(prev => !prev)}
            className='cursor-pointer'
          />
        </label>
      )}

      <form onSubmit={onSubmit} className='bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark:border-[#80609F]/30 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center'>
        <select onChange={(e) => setMode(e.target.value)} value={mode} className='text-sm pl-3 pr-2 outline-none bg-transparent'>
          <option className='dark:bg-purple-900' value='text'>Text</option>
          <option className='dark:bg-purple-900' value='image'>Image</option>
        </select>
        <input
          type="text"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          placeholder="Type your text prompt here..."
          className="flex-1 w-full text-sm outline-none bg-transparent"
          required
        />
        <button disabled={loading}>
          <img src={loading ? assets.stop_icon : assets.send_icon} alt="send" className='w-8 cursor-pointer' />
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
