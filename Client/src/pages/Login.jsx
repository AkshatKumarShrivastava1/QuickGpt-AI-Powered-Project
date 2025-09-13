// import React, { useState } from 'react'
// import { useAppContext } from '../context/AppContext';
// import toast from 'react-hot-toast';


// const Login = () => {
//     const [state, setState] = useState("login");
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const { axios, setToken, fetchUser } = useAppContext()
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         //const url = state === "login" ? '/api/user/login':'/api/user/register'
//         const API_URL = "http://localhost:3000/api";

//         const url = state === "login"
//             ? `${API_URL}/user/login`
//             : `${API_URL}/user/register`;


//         try {
//             const { data } = await axios.post(url, { name, email, password })
//             if (data.success) {
//                 setToken(data.token)
//                 localStorage.setItem('token', data.token)
//                 fetchUser(data.token)
//                 console.log("Token received from backend:", data.token);
//             } else {
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }
//     return (
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
//             <p className="text-2xl font-medium m-auto">
//                 <span className="text-purple-700">User</span> {state === "login" ? "Login" : "Sign Up"}
//             </p>
//             {state === "register" && (
//                 <div className="w-full">
//                     <p>Name</p>
//                     <input onChange={(e) => setName(e.target.value)} value={name}
//                         placeholder="type here"
//                         className="border border-gray-200 rounded w-full p-2 mt-1 
//                     outline-purple-700" type="text" required />
//                 </div>
//             )}
//             <div className="w-full ">
//                 <p>Email</p>
//                 <input onChange={(e) => setEmail(e.target.value)} value={email}
//                     placeholder="type here"
//                     className="border border-gray-200 rounded w-full p-2 mt-1 
//                 outline-purple-700" type="email" required />
//             </div>
//             <div className="w-full ">
//                 <p>Password</p>
//                 <input onChange={(e) => setPassword(e.target.value)} value={password}
//                     placeholder="type here"
//                     className="border border-gray-200 rounded w-full p-2 mt-1 
//                  outline-purple-700" type="password" required />
//             </div>
//             {state === "register" ? (
//                 <p>
//                     Already have account? <span onClick={() => setState("login")}
//                         className="text-purple-700 cursor-pointer">click here</span>
//                 </p>
//             ) : (
//                 <p>
//                     Create an account? <span onClick={() => setState("register")}
//                         className="text-purple-700 cursor-pointer">click here</span>
//                 </p>
//             )}
//             <button type='submit' className="bg-purple-700 hover:bg-purple-800 transition-all 
//             text-white w-full py-2 rounded-md cursor-pointer">
//                 {state === "register" ? "Create Account" : "Login"}
//             </button>
//         </form>
//     )
// }

// export default Login;


// import React, { useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import toast from "react-hot-toast";

// const Login = () => {
//   const [state, setState] = useState("login"); // "login" or "register"
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { loginOrRegister } = useAppContext();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (state === "register" && !name) {
//       return toast.error("Name is required for registration");
//     }
//     await loginOrRegister(state, name, email, password);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
//     >
//       <p className="text-2xl font-medium m-auto">
//         <span className="text-purple-700">User</span> {state === "login" ? "Login" : "Sign Up"}
//       </p>

//       {state === "register" && (
//         <div className="w-full">
//           <p>Name</p>
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Type here"
//             className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700"
//             type="text"
//             required
//           />
//         </div>
//       )}

//       <div className="w-full">
//         <p>Email</p>
//         <input
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Type here"
//           className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700"
//           type="email"
//           required
//         />
//       </div>

//       <div className="w-full">
//         <p>Password</p>
//         <input
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Type here"
//           className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700"
//           type="password"
//           required
//         />
//       </div>

//       {state === "register" ? (
//         <p>
//           Already have an account?{" "}
//           <span onClick={() => setState("login")} className="text-purple-700 cursor-pointer">
//             Click here
//           </span>
//         </p>
//       ) : (
//         <p>
//           Create an account?{" "}
//           <span onClick={() => setState("register")} className="text-purple-700 cursor-pointer">
//             Click here
//           </span>
//         </p>
//       )}

//       <button
//         type="submit"
//         className="bg-purple-700 hover:bg-purple-800 transition-all text-white w-full py-2 rounded-md cursor-pointer"
//       >
//         {state === "register" ? "Create Account" : "Login"}
//       </button>
//     </form>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { axios, setToken, fetchUser } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Use proxy path, no hardcoded localhost
    const url = state === "login" ? '/user/login' : '/user/register';

    try {
      const { data } = await axios.post(url, { name, email, password });
      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        await fetchUser(data.token); // wait for user fetch
        console.log("Token received from backend:", data.token);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
      <p className="text-2xl font-medium m-auto">
        <span className="text-purple-700">User</span> {state === "login" ? "Login" : "Sign Up"}
      </p>

      {state === "register" && (
        <div className="w-full">
          <p>Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700"
            type="text"
            required
          />
        </div>
      )}

      <div className="w-full">
        <p>Email</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="type here"
          className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700"
          type="email"
          required
        />
      </div>

      <div className="w-full">
        <p>Password</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="type here"
          className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700"
          type="password"
          required
        />
      </div>

      {state === "register" ? (
        <p>
          Already have account?{" "}
          <span onClick={() => setState("login")} className="text-purple-700 cursor-pointer">
            click here
          </span>
        </p>
      ) : (
        <p>
          Create an account?{" "}
          <span onClick={() => setState("register")} className="text-purple-700 cursor-pointer">
            click here
          </span>
        </p>
      )}

      <button
        type="submit"
        className="bg-purple-700 hover:bg-purple-800 transition-all text-white w-full py-2 rounded-md cursor-pointer"
      >
        {state === "register" ? "Create Account" : "Login"}
      </button>
    </form>
  );
};

export default Login;
