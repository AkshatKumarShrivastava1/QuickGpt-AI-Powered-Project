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


import React, { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import Message from './Message';
import toast from 'react-hot-toast';

const ChatBox = () => {
  const containerRef = useRef(null);
  const { selectedChat, theme, user, axios, token, setUser, setChats, chats } = useAppContext();
  
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState('text');
  const [isPublished, setIsPublished] = useState(false);

  // Handle message submission
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast('Login to send message');
    if (!selectedChat) return toast.error('Select a chat first');

    setLoading(true);
    const promptCopy = prompt;
    setPrompt('');

    // Add temporary user message
    setMessages(prev => [...prev, { role: 'user', content: prompt, timestamp: Date.now(), isImage: mode === 'image' }]);

    try {
      const { data } = await axios.post(`/message/${mode}`, 
        { chatId: selectedChat._id, prompt, isPublished },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        // Add AI reply
        setMessages(prev => [...prev, data.reply]);

        // Update selected chat messages globally
        setChats(prevChats =>
          prevChats.map(chat =>
            chat._id === selectedChat._id
              ? { ...chat, messages: [...chat.messages, { role: 'user', content: prompt }, data.reply] }
              : chat
          )
        );

        // Deduct credits
        setUser(prev => ({
          ...prev,
          credits: prev.credits - (mode === 'image' ? 2 : 1)
        }));

        // Reset isPublished for next image
        if (mode === 'image') setIsPublished(false);

      } else {
        toast.error(data.message);
        setPrompt(promptCopy);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setPrompt(promptCopy);
    } finally {
      setLoading(false);
    }
  };

  // Load messages when chat changes
  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages || []);
    }
  }, [selectedChat]);

  // Auto-scroll
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

      {/* Chat Messages */}
      <div ref={containerRef} className='flex-1 overflow-y-scroll mb-5'>
        {messages.length === 0 && (
          <div className='h-full flex flex-col justify-center items-center gap-2 text-primary'>
            <img src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark} className='w-40 max-w-56 sm:max-w-68' />
            <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white'>
              Ask me Anything
            </p>
          </div>
        )}

        {messages.map((message, index) => <Message key={index} message={message} />)}

        {/* Loading indicator */}
        {loading && (
          <div className="loader flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
          </div>
        )}
      </div>

      {/* Publish Image Checkbox */}
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

      {/* Input Box */}
      <form onSubmit={onSubmit} className='bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark:border-[#80609F]/30 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center'>
        <select onChange={(e) => setMode(e.target.value)} value={mode} className='text-sm pl-3 pr-2 outline-none'>
          <option className='dark:bg-purple-900' value='text'>Text</option>
          <option className='dark:bg-purple-900' value='image'>Image</option>
        </select>
        <input
          type="text"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          placeholder="Type your text prompt here..."
          className="flex-1 w-full text-sm outline-none"
          required
        />
        <button disabled={loading}>
          <img src={loading ? assets.stop_icon : assets.send_icon} className='w-8 cursor-pointer' />
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
