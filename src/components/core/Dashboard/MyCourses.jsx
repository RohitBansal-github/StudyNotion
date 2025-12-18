import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import IconBtn from '../../common/IconBtn';
import { IoIosAddCircle } from 'react-icons/io';
import CoursesTable from './InstructorCourses/CoursesTable';

function MyCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // added loading state

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">My Courses</h1>
        <IconBtn
          text="Add Course"
          onClick={() => navigate("/dashboard/add-course")}
        >
          <IoIosAddCircle />
        </IconBtn>
      </div>

      {loading ? (
        <p>Loading courses...</p>
      ) : courses.length > 0 ? (
        <CoursesTable courses={courses} setCourses={setCourses} />
      ) : (
        <p>No courses found. Click "Add Course" to create one.</p>
      )}
    </div>
  );
}

export default MyCourses;
