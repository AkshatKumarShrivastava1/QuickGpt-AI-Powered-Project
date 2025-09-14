
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

import { useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// Use deployed backend in production, localhost in dev
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "https://quick-gpt-server-ashen.vercel.app/api";
axios.defaults.withCredentials = true; // important if you use cookies

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  // ----------------------- STATE -----------------------
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loadingUser, setLoadingUser] = useState(true);
  // ✅ 1. Add loading state for chat creation
  const [loadingChat, setLoadingChat] = useState(false);

  // ----------------------- THEME -----------------------
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ----------------------- USER -----------------------
  const fetchUser = async (tokenToUse) => {
    try {
      const { data } = await axios.get("/user/data", {
        headers: { Authorization: `Bearer ${tokenToUse}` },
      });
      if (data.success) setUser(data.user);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    if (token) fetchUser(token);
    else setLoadingUser(false);
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setChats([]);
    setSelectedChat(null);
    navigate("/");
    toast.success("Logged out successfully");
  };

  // ----------------------- CHATS -----------------------
  const fetchUsersChats = async () => {
    if (!user) return;
    try {
      const { data } = await axios.get("/chat/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        const chatsArray = data.chats || [];
        setChats(chatsArray);
        if (chatsArray.length > 0) {
          setSelectedChat(chatsArray[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ✅ 2. Update createNewChat to handle loading state
  const createNewChat = async () => {
    if (!user) return toast("Login to create new chat");
    if (loadingChat) return; // Prevent multiple clicks

    setLoadingChat(true);
    try {
      const { data } = await axios.get("/chat/create", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        // Fetch all chats again to get the updated list, which will also select the new chat
        await fetchUsersChats();
        toast.success("New chat created!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoadingChat(false); // Stop loading regardless of outcome
    }
  };

  // ----------------------- EFFECTS -----------------------
  useEffect(() => {
    if (user) {
      fetchUsersChats();
    } else {
      setChats([]);
      setSelectedChat(null);
    }
  }, [user]);

  // ----------------------- PROVIDE CONTEXT -----------------------
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
    loadingChat, // ✅ 3. Export the new loading state
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);









