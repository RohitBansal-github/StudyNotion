import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import OpenRoute from "./components/core/Auth/OpenRoute";
import { useState } from "react";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter overflow-y-scroll" >
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={            <OpenRoute>
              <Login  setIsLoggedIn={setIsLoggedIn}/>
            </OpenRoute>}/>
        <Route
          path="signup"
          element={
            <OpenRoute>
              <SignUp  setIsLoggedIn={setIsLoggedIn}/>
            </OpenRoute>
          }
        />
        <Route path="forgot-password" element={
          <OpenRoute>
            <ForgotPassword/>
          </OpenRoute>
        }/>
        <Route path="update-password/:id" element={
          <OpenRoute>
            <UpdatePassword/>
          </OpenRoute>
        }/>
        <Route path="verify-email" element={
          <OpenRoute>
            <VerifyEmail/>
          </OpenRoute>
        }/>
        <Route path="about" element={
          <OpenRoute>
            <About/>
          </OpenRoute>
        }/>

        <Route element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }>
        <Route path="dashboard/my-profile" element={<MyProfile/>}/>

        </Route>


      </Routes>
    </div>
  );
}

export default App;
