import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/pages/home/Home";
import Login from "./components/pages/Auth/Login";
import Signup from "./components/pages/Auth/Signup";
import About from "./components/pages/About/About";
import VerifyOtp from "./components/pages/Auth/VerifyOtp";
import Account from "./components/pages/Account/Account";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import { UserData } from "./Context/UserContext";
import Courses from "./components/pages/courses/Courses";
import LoadingScreen from "./components/Loading/LoadingScreen";
import CourseDescription from "./components/pages/courses/CourseDescription";
import PaymentSuccess from "./components/pages/PaymentSuccess/PaymentSuccess";
import CourseStudy from "./components/pages/CourseStudy/CourseStudy";
import Lacture from "./components/pages/Lactures/Lacture";
import AdminDashboard from "./Admin/Dashboard/AdminDashboard";
import AdminCourses from "./Admin/Courses/AdminCourses";
import UsersTable from "./Admin/Users/UsersTable";
import Docs from "./components/pages/Doccumentation/Docs";

// 🧠 Move `useLocation` logic here
const AppContent = () => {
  const navigate=useNavigate()
  const { isAuth, user, loading } = UserData();
  const location = useLocation();
  const hideNavbarFooterPaths = ["/login", "/signup", "/verify","/admin/dashboard","/admin/users","/admin/courses",""];
  const hideShow = !hideNavbarFooterPaths.includes(location.pathname);
   useEffect(() => {
    if (isAuth && user?.userRole === "admin" && location.pathname === "/courses") {
      navigate("/account", { replace: true });
    }
  }, [isAuth, user, location.pathname, navigate]);


  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
        {hideShow && <Navbar isAuth={isAuth} user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/account"
          element={isAuth ? <Account user={user} /> : <Login />}
        />
        <Route path="/login" element={isAuth ? <Home /> : <Login />} />
        <Route path="/signup" element={isAuth ? <Home /> : <Signup />} />
        <Route path="/verify" element={isAuth ? <Home /> : <VerifyOtp />} />
        <Route path="/:id/dashboard" element={isAuth ? <Dashboard user={user} /> : <Login />} />
        <Route path="/course/:id" element={isAuth ? <CourseDescription user={user} /> : <Login />} />
        <Route path="/payment-success/:id" element={isAuth? <PaymentSuccess user={user} /> :<Login/> } />
        <Route path="/course/study/:id" element={isAuth? <CourseStudy user={user} /> :<Login/> } />
        <Route path="/docs/:id" element={isAuth? <Docs user={user} /> :<Login/> } />
        <Route path="/lactures/:id" element={isAuth? <Lacture user={user} /> :<Login/> } />
        <Route path="/admin/dashboard" element={isAuth? <AdminDashboard user={user} /> :<Login/> } />
        <Route path="/admin/courses" element={isAuth? <AdminCourses user={user} /> :<Login/> } />
        <Route path="/admin/users" element={isAuth? <UsersTable user={user} /> :<Login/> } />
      </Routes>
      {hideShow && <Footer />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
