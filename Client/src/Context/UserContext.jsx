import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Server } from "../main";
import { toast, ToastContainer } from "react-toastify";
// import { isAuth } from './../../../Server/App/middleware/isAuth';
const contextClass = {
  success: "bg-blue-600",
  error: "bg-red-600",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};
// const UserContext = createContext();
const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  const [isAuth, setisAuth] = useState(false);

  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

// function logoutUser(navigate) {
//   localStorage.removeItem("token");
//   localStorage.removeItem("tokenCreatedAt");
//   setisAuth(false);
//   setUser(null);
//   toast.info("Session expired. Please log in again.");
//   navigate("/login");
// }

  async function loginUser(userEmail, userPassword, navigate,fetchMyCourses) {
    // console.log("Login attempt:", userEmail, userPassword); // ✅ DEBUG LINE
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${Server}/api/user/login`, {
        userEmail,
        userPassword,
      });
      // console.log("Response:", data); // ✅ DEBUG LINE
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      //  localStorage.setItem("tokenCreatedAt", Date.now().toString());
      setUser(data.user);
      setisAuth(true);
      navigate("/");
      fetchMyCourses()

    //  setTimeout(() => {
    //   logoutUser(navigate);
    // }, 3600000); // 1 hour

    } catch (error) {
      console.log("Login error:", error); // ✅ DEBUG LINE
      setisAuth(false);
      setBtnLoading(false);
      toast.error(error?.response?.data?.message);
    }
  }
// useEffect((navigate) => {
//   const createdAt = localStorage.getItem("tokenCreatedAt");

//   if (createdAt) {
//     const elapsed = Date.now() - parseInt(createdAt, 10);

//     if (elapsed >= 3600000) {
//       // Token already expired
//       logoutUser(navigate);
//     } else {
//       // Logout after remaining time
//       setTimeout(() => {
//         logoutUser(navigate);
//       }, (3600000) - elapsed);
//     }
//   }
// }, []);


 async function registerUser(userName, userEmail, profilePhoto, userPassword, navigate) {
  setBtnLoading(true);
  try {
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("userEmail", userEmail);
    formData.append("userPassword", userPassword);
    formData.append("profilePhoto", profilePhoto); // this should be the actual file

    const { data } = await axios.post(`${Server}/api/user/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success(data.message);
    localStorage.setItem("activationToken", data.activationToken);
    setBtnLoading(false);
    navigate("/verify");
  } catch (error) {
    console.log("Signup error:", error);
    setBtnLoading(false);
    toast.error(error?.response?.data?.msg || "Registration failed");
  }
}


  async function verifyOtp(otp, navigate) {
    try {
      const activationToken = localStorage.getItem("activationToken");
      const { data } = await axios.post(`${Server}/api/user/verify`, {
        otp,
        activationToken,
      });
      // console.log("Response:", data); // ✅ DEBUG LINE
      toast.success(data.message);
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log("Verification Error:", error); // ✅ DEBUG LINE
      // setisAuth(false);
      // setBtnLoading(false);
      toast.error(error?.response?.data?.message);
    }
  }


  async function fetchUser() {
    try {
      const { data } = await axios.get(`${Server}/api/user/myprofile`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setisAuth(true);
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      // toast.error()
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuth,
        setisAuth,
        loginUser,
        btnLoading,
        loading,
        registerUser,
        verifyOtp,
        fetchUser
      }}
    >
      {children} <ToastContainer
        // toastClassName={(context) =>
        //   contextClass[context?.type || "default"] +
        //   " relative flex p-4 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
        // }
        className={` relative flex p-4 min-h-5 rounded-md justify-between overflow-hidden cursor-pointer`}
        position="top-center"
        hideProgressBar
        autoClose={2000}
      />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
