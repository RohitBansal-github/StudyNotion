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
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import Contact from "./pages/Contact";

import Error from "./pages/Error";
import AddCourse from "./components/core/Dashboard/AddCourse/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Settings from "./components/core/Dashboard/Settings";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter overflow-y-scroll" >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path = "catalog/:catalogName" element={<Catalog/>}/>
        <Route path = "courses/:courseId" element = {<CourseDetails/>}/>

        <Route path="login" element={<OpenRoute>
          <Login setIsLoggedIn={setIsLoggedIn} />
        </OpenRoute>} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <SignUp setIsLoggedIn={setIsLoggedIn} />
            </OpenRoute>
          }
        />
        <Route path="forgot-password" element={
          <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
        } />
        <Route path="update-password/:id" element={
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        } />
        <Route path="verify-email" element={
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        } />
        <Route path="about" element={
          <OpenRoute>
            <About />
          </OpenRoute>
        } />
        <Route path="contact" element={
          <OpenRoute>
            <Contact/>
          </OpenRoute>
        }/>

        <Route element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>
          {/* Route for all users */}
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings />} />

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/cart" element={<Cart />} />

                <Route path="dashboard/enrolled-courses"
                  element={<EnrolledCourses />} />
              </>
            )
          }
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
              <Route path="dashboard/instructor" element={<Instructor/>} />
              <Route path="dashboard/add-course" element={<AddCourse/>} />
              
              <Route path="dashboard/my-courses" element={<MyCourses/>} />
              <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>} />
              </>
            )
          }

        </Route>

        <Route element = {
          <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>
        }>

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
              <Route
              path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
              element={<VideoDetails/>}
               />
              </>
            )
          }

        </Route>



        <Route path="*" element = {<Error/>}/>


      </Routes>
    </div>
  );
}

export default App;
