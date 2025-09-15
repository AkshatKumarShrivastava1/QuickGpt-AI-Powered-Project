
// import { useEffect, useState, createContext, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// axios.defaults.baseURL = '/api'; // frontend proxy

// const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
//   const [token, setToken] = useState(localStorage.getItem("token") || null);
//   const [loadingUser, setLoadingUser] = useState(true);

//   // ✅ Apply dark/light theme to html element
//   useEffect(() => {
//     if (theme === "dark") document.documentElement.classList.add("dark");
//     else document.documentElement.classList.remove("dark");
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const fetchUser = async (tokenToUse) => {
//     try {
//       const { data } = await axios.get("/user/data", {
//         headers: { Authorization: `Bearer ${tokenToUse}` },
//       });
//       if (data.success) setUser(data.user);
//       else toast.error(data.message);
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     } finally {
//       setLoadingUser(false);
//     }
//   };

//   useEffect(() => {
//     if (token) fetchUser(token);
//     else setLoadingUser(false);
//   }, [token]);

//   const value = {
//     navigate,
//     user,
//     setUser,
//     theme,
//     setTheme,
//     chats,
//     setChats,
//     selectedChat,
//     setSelectedChat,
//     loadingUser,
//     token,
//     setToken,
//     axios,
//     fetchUser,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => useContext(AppContext);

// import { useEffect, useState, createContext, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// // Use deployed backend in production, localhost in dev
// axios.defaults.baseURL =
//   import.meta.env.VITE_API_URL || "https://quick-gpt-server-ashen.vercel.app/api";
// axios.defaults.withCredentials = true; // important if you use cookies

// const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//   const navigate = useNavigate();

//   // ----------------------- STATE -----------------------
//   const [user, setUser] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
//   const [token, setToken] = useState(localStorage.getItem("token") || null);
//   const [loadingUser, setLoadingUser] = useState(true);

//   // ----------------------- THEME -----------------------
//   useEffect(() => {
//     if (theme === "dark") document.documentElement.classList.add("dark");
//     else document.documentElement.classList.remove("dark");
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   // ----------------------- USER -----------------------
//   const fetchUser = async (tokenToUse) => {
//     try {
//       const { data } = await axios.get("/user/data", {
//         headers: { Authorization: `Bearer ${tokenToUse}` },
//       });
//       if (data.success) setUser(data.user);
//       else toast.error(data.message);
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     } finally {
//       setLoadingUser(false);
//     }
//   };

//   useEffect(() => {
//     if (token) fetchUser(token);
//     else setLoadingUser(false);
//   }, [token]);

//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     setUser(null);
//     setChats([]);
//     setSelectedChat(null);
//     navigate("/login");
//     toast.success("Logged out successfully");
//   };

//   // ----------------------- CHATS -----------------------
//   const fetchUsersChats = async () => {
//     if (!user) return;
//     try {
//       const { data } = await axios.get("/chat/get", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (data.success) {
//         const chatsArray = data.chats || [];
//         setChats(chatsArray);
//         if (chatsArray.length > 0) setSelectedChat(chatsArray[0]);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   const createNewChat = async () => {
//     if (!user) return toast("Login to create new chat");

//     try {
//       const { data } = await axios.get("/chat/create", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (data.success) {
//         const { data: chatsData } = await axios.get("/chat/get", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (chatsData.success) {
//           setChats(chatsData.chats);
//           setSelectedChat(chatsData.chats[0]);
//         }

//         toast.success("New chat created!");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   // ----------------------- EFFECTS -----------------------
//   useEffect(() => {
//     if (user) fetchUsersChats();
//     else {
//       setChats([]);
//       setSelectedChat(null);
//     }
//   }, [user]);

//   // ----------------------- PROVIDE CONTEXT -----------------------
//   const value = {
//     navigate,
//     user,
//     setUser,
//     theme,
//     setTheme,
//     chats,
//     setChats,
//     selectedChat,
//     setSelectedChat,
//     loadingUser,
//     token,
//     setToken,
//     axios,
//     fetchUser,
//     fetchUsersChats,
//     createNewChat,
//     logout,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => useContext(AppContext);

// import { useEffect, useState, createContext, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// // Use deployed backend in production, localhost in dev
// axios.defaults.baseURL =
//   import.meta.env.VITE_API_URL || "https://quick-gpt-server-ashen.vercel.app/api";
// axios.defaults.withCredentials = true; // important if you use cookies

// const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//   const navigate = useNavigate();

//   // ----------------------- STATE -----------------------
//   const [user, setUser] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
//   const [token, setToken] = useState(localStorage.getItem("token") || null);
//   const [loadingUser, setLoadingUser] = useState(true);
//   // ✅ 1. Add loading state for chat creation
//   const [loadingChat, setLoadingChat] = useState(false);

//   // ----------------------- THEME -----------------------
//   useEffect(() => {
//     if (theme === "dark") document.documentElement.classList.add("dark");
//     else document.documentElement.classList.remove("dark");
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   // ----------------------- USER -----------------------
//   const fetchUser = async (tokenToUse) => {
//     try {
//       const { data } = await axios.get("/user/data", {
//         headers: { Authorization: `Bearer ${tokenToUse}` },
//       });
//       if (data.success) setUser(data.user);
//       else toast.error(data.message);
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     } finally {
//       setLoadingUser(false);
//     }
//   };

//   useEffect(() => {
//     if (token) fetchUser(token);
//     else setLoadingUser(false);
//   }, [token]);

//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     setUser(null);
//     setChats([]);
//     setSelectedChat(null);
//     navigate("/");
//     toast.success("Logged out successfully");
//   };

//   // ----------------------- CHATS -----------------------
//   const fetchUsersChats = async () => {
//     if (!user) return;
//     try {
//       const { data } = await axios.get("/chat/get", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (data.success) {
//         const chatsArray = data.chats || [];
//         setChats(chatsArray);
//         if (chatsArray.length > 0) {
//           setSelectedChat(chatsArray[0]);
//         }
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   // ✅ 2. Update createNewChat to handle loading state
//   const createNewChat = async () => {
//     if (!user) return toast("Login to create new chat");
//     if (loadingChat) return; // Prevent multiple clicks

//     setLoadingChat(true);
//     try {
//       const { data } = await axios.get("/chat/create", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (data.success) {
//         // Fetch all chats again to get the updated list, which will also select the new chat
//         await fetchUsersChats();
//         toast.success("New chat created!");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     } finally {
//       setLoadingChat(false); // Stop loading regardless of outcome
//     }
//   };

//   // ----------------------- EFFECTS -----------------------
//   useEffect(() => {
//     if (user) {
//       fetchUsersChats();
//     } else {
//       setChats([]);
//       setSelectedChat(null);
//     }
//   }, [user]);

//   // ----------------------- PROVIDE CONTEXT -----------------------
//   const value = {
//     navigate,
//     user,
//     setUser,
//     theme,
//     setTheme,
//     chats,
//     setChats,
//     selectedChat,
//     setSelectedChat,
//     loadingUser,
//     token,
//     setToken,
//     axios,
//     fetchUser,
//     fetchUsersChats,
//     createNewChat,
//     logout,
//     loadingChat, // ✅ 3. Export the new loading state
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => useContext(AppContext);





// import { useEffect, useState, createContext, useContext, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_API_URL || '/api';

// const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
//   const [token, setToken] = useState(localStorage.getItem("token") || null);
//   const [loadingUser, setLoadingUser] = useState(true);
//   const [loadingChat, setLoadingChat] = useState(false);

//   useEffect(() => {
//     if (theme === "dark") document.documentElement.classList.add("dark");
//     else document.documentElement.classList.remove("dark");
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   // ✅ Wrapped in useCallback to prevent re-creation on re-renders, which fixes the loop.
//   const fetchUser = useCallback(async (tokenToUse) => {
//     if (!tokenToUse) {
//         setLoadingUser(false);
//         return;
//     }
//     try {
//       const { data } = await axios.get("/user/data", {
//         headers: { Authorization: `Bearer ${tokenToUse}` },
//       });
//       if (data.success) {
//         setUser(data.user);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     } finally {
//       setLoadingUser(false);
//     }
//   }, []); // No dependencies needed as it doesn't rely on component state

//   useEffect(() => {
//     if (token) fetchUser(token);
//     else setLoadingUser(false);
//   }, [token, fetchUser]);

//   const logout = useCallback(() => {
//     localStorage.removeItem("token");
//     setToken(null);
//     setUser(null);
//     setChats([]);
//     setSelectedChat(null);
//     navigate("/");
//     toast.success("Logged out successfully");
//   }, [navigate]);

//   const fetchUsersChats = useCallback(async () => {
//     // ✅ Added dependency on `token` to ensure the correct token is used
//     if (!user || !token) return;
//     try {
//       const { data } = await axios.get("/chat/get", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (data.success) {
//         const chatsArray = data.chats || [];
//         setChats(chatsArray);
//         if (chatsArray.length > 0 && !selectedChat) {
//           setSelectedChat(chatsArray[0]);
//         }
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   }, [user, token, selectedChat]);
//   
//   const createNewChat = useCallback(async () => {
//     if (!user) return toast("Login to create new chat");
//     if (loadingChat) return;

//     setLoadingChat(true);
//     try {
//       const { data } = await axios.get("/chat/create", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (data.success) {
//         await fetchUsersChats();
//         toast.success("New chat created!");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     } finally {
//       setLoadingChat(false);
//     }
//   }, [user, token, loadingChat, fetchUsersChats]);

//   useEffect(() => {
//     if (user) {
//         fetchUsersChats();
//     }
//     else {
//       setChats([]);
//       setSelectedChat(null);
//     }
//   }, [user?._id, fetchUsersChats]);

//   const value = {
//     navigate,
//     user,
//     setUser,
//     theme,
//     setTheme,
//     chats,
//     setChats,
//     selectedChat,
//     setSelectedChat,
//     loadingUser,
//     token,
//     setToken,
//     axios,
//     fetchUser,
//     fetchUsersChats,
//     createNewChat,
//     logout,
//     loadingChat,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => useContext(AppContext);



// import { useEffect, useState, createContext, useContext, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_API_URL || '/api';

// const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//     const navigate = useNavigate();

//     const [user, setUser] = useState(null);
//     const [chats, setChats] = useState([]);
//     const [selectedChat, setSelectedChat] = useState(null);
//     const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
//     const [token, setToken] = useState(localStorage.getItem("token") || null);
//     const [loadingUser, setLoadingUser] = useState(true);
//     const [loadingChat, setLoadingChat] = useState(false);

//     useEffect(() => {
//         if (theme === "dark") document.documentElement.classList.add("dark");
//         else document.documentElement.classList.remove("dark");
//         localStorage.setItem("theme", theme);
//     }, [theme]);

//     const fetchUser = useCallback(async (tokenToUse) => {
//         if (!tokenToUse) {
//             setLoadingUser(false);
//             return;
//         }
//         try {
//             const { data } = await axios.get("/user/data", {
//                 headers: { Authorization: `Bearer ${tokenToUse}` },
//             });
//             if (data.success) {
//                 setUser(data.user);
//             } else {
//                  if (localStorage.getItem("token")) toast.error(data.message);
//             }
//         } catch (error) {
//              if (localStorage.getItem("token")) {
//                 toast.error(error.response?.data?.message || "Session expired.");
//                 localStorage.removeItem("token");
//                 setToken(null);
//              }
//         } finally {
//             setLoadingUser(false);
//         }
//     }, []);

//     useEffect(() => {
//         if (token) {
//             fetchUser(token);
//         } else {
//             setLoadingUser(false);
//         }
//     }, [token, fetchUser]);
    
//     // ✅ NEW: This effect checks for a payment success flag in localStorage.
//     // This is a more robust way to handle the post-payment update.
//     useEffect(() => {
//         const paymentStatus = localStorage.getItem('payment_status');
//         if (paymentStatus === 'success' && token) {
//             toast.success("Payment successful! Updating credits...");
//             fetchUser(token);
//             // IMPORTANT: Clear the flag immediately to prevent re-fetching on the next reload.
//             localStorage.removeItem('payment_status');
//         }
//     }, [token, fetchUser]); // This effect runs when the app loads and the token is available.


//     const logout = useCallback(() => {
//         localStorage.removeItem("token");
//         setToken(null);
//         setUser(null);
//         setChats([]);
//         setSelectedChat(null);
//         navigate("/");
//         toast.success("Logged out successfully");
//     }, [navigate]);

//     const fetchUsersChats = useCallback(async () => {
//         if (!user || !token) return;
//         try {
//             const { data } = await axios.get("/chat/get", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             if (data.success) {
//                 const chatsArray = data.chats || [];
//                 setChats(chatsArray);
//                 if (chatsArray.length > 0) {
//                      setSelectedChat(prev => prev || chatsArray[0]);
//                 }
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//         }
//     }, [user, token]);
    
//     const createNewChat = useCallback(async () => {
//         if (!user || !token) return toast("Login to create new chat");
//         if (loadingChat) return;
//         setLoadingChat(true);
//         try {
//             const { data } = await axios.get("/chat/create", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             if (data.success) {
//                 await fetchUsersChats();
//                 toast.success("New chat created!");
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//         } finally {
//             setLoadingChat(false);
//         }
//     }, [user, token, loadingChat, fetchUsersChats]);

//     useEffect(() => {
//         if (user?._id) {
//             fetchUsersChats();
//         } else {
//             setChats([]);
//             setSelectedChat(null);
//         }
//     }, [user?._id, fetchUsersChats]);

//     const value = {
//         navigate, user, setUser,
//         theme, setTheme,
//         chats, setChats,
//         selectedChat, setSelectedChat,
//         loadingUser, token, setToken,
//         axios, fetchUser,
//         fetchUsersChats, createNewChat,
//         logout, loadingChat,
//     };

//     return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => useContext(AppContext);

// src/context/AppContext.jsx
import { useEffect, useState, createContext, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_API_URL || '/api';

const AppContext = createContext();
const PAYMENT_KEY = 'payment_status_v2';

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingChat, setLoadingChat] = useState(false);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const fetchUser = useCallback(async (tokenToUse) => {
    if (!tokenToUse) {
      setLoadingUser(false);
      return;
    }
    try {
      const { data } = await axios.get('/user/data', {
        headers: { Authorization: `Bearer ${tokenToUse}` },
      });
      if (data.success) {
        setUser(data.user);
      } else {
        if (localStorage.getItem('token')) toast.error(data.message);
      }
    } catch (error) {
      if (localStorage.getItem('token')) {
        toast.error(error.response?.data?.message || 'Session expired.');
        localStorage.removeItem('token');
        setToken(null);
      }
    } finally {
      setLoadingUser(false);
    }
  }, []);

  useEffect(() => {
    if (token) fetchUser(token);
    else setLoadingUser(false);
  }, [token, fetchUser]);

  // Robust payment processing:
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PAYMENT_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      // We expect { status: 'success'|'processing', id: number }
      if (!parsed || !parsed.status) return;

      // If success — immediately mark as processing (synchronously).
      if (parsed.status === 'success' && token) {
        // mark so subsequent mounts/effects see 'processing' and skip
        localStorage.setItem(PAYMENT_KEY, JSON.stringify({ status: 'processing', id: parsed.id }));
        (async () => {
          try {
            await fetchUser(token); // update user (credits)
            toast.success('Payment successful! Credits updated 🎉');
          } catch (err) {
            toast.error('Payment processed but failed to update user.');
          } finally {
            // clear flag
            localStorage.removeItem(PAYMENT_KEY);
          }
        })();
      }
    } catch (err) {
      // ignore parse errors
      console.error('Payment key parse error', err);
    }
  }, [token, fetchUser]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setChats([]);
    setSelectedChat(null);
    navigate('/');
    toast.success('Logged out successfully');
  }, [navigate]);

  // ... fetchUsersChats, createNewChat same as before (omitted for brevity) ...
  // For completeness paste your existing functions here (unchanged).

  const fetchUsersChats = useCallback(async () => {
    if (!user || !token) return;
    try {
      const { data } = await axios.get('/chat/get', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        const chatsArray = data.chats || [];
        setChats(chatsArray);
        if (chatsArray.length > 0) {
          setSelectedChat(prev => prev || chatsArray[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }, [user, token]);

  const createNewChat = useCallback(async () => {
    if (!user || !token) return toast('Login to create new chat');
    if (loadingChat) return;
    setLoadingChat(true);
    try {
      const { data } = await axios.get('/chat/create', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        await fetchUsersChats();
        toast.success('New chat created!');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoadingChat(false);
    }
  }, [user, token, loadingChat, fetchUsersChats]);

  useEffect(() => {
    if (user?._id) fetchUsersChats();
    else {
      setChats([]);
      setSelectedChat(null);
    }
  }, [user?._id, fetchUsersChats]);

  const value = {
    navigate,
    user,
    setUser,
    theme,
    setTheme,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    loadingUser,
    token,
    setToken,
    axios,
    fetchUser,
    fetchUsersChats,
    createNewChat,
    logout,
    loadingChat,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
