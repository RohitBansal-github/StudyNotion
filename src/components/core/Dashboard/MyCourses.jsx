import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import IconBtn from "../../common/IconBtn";
import { IoIosAddCircle } from "react-icons/io";
import CoursesTable from "./InstructorCourses/CoursesTable";

function MyCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const result = await fetchInstructorCourses(token);
        if (Array.isArray(result)) setCourses(result);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [token]);

  return (
    <div className="w-full space-y-6">

      {/* ===== Header Section ===== */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-semibold text-richblack-5 sm:text-3xl">
            My Courses
          </h1>
          <p className="text-sm text-richblack-300 mt-1">
            Manage and track all your created courses
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <IconBtn
            text="Add Course"
            onClick={() => navigate("/dashboard/add-course")}
            customClasses="w-full sm:w-auto justify-center"
          >
            <IoIosAddCircle className="text-lg" />
          </IconBtn>
        </div>
      </div>

      {/* ===== Content Section ===== */}
      <div className="bg-richblack-800 rounded-xl p-4 sm:p-6 border border-richblack-700">

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-richblack-400 border-t-yellow-50"></div>
          </div>
        ) : courses.length > 0 ? (
          <div className="overflow-x-auto">
            <CoursesTable courses={courses} setCourses={setCourses} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-richblack-300 text-lg font-medium">
              No Courses Found
            </p>
            <p className="text-richblack-400 text-sm mt-2">
              Click on "Add Course" to create your first course.
            </p>

            <button
              onClick={() => navigate("/dashboard/add-course")}
              className="mt-6 rounded-md bg-yellow-50 px-5 py-2 text-richblack-900 font-medium hover:bg-yellow-100 transition"
            >
              Create Course
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default MyCourses;
