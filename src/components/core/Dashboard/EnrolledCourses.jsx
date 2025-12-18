import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from "@ramonak/react-progress-bar";

function EnrolledCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const { token } = useSelector((state) => state.auth);

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch (error) {
      console.log("Unable to fetch enrolled courses", error);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, [token]);

  if (!enrolledCourses) return <p>Loading...</p>;
  if (enrolledCourses.length === 0)
    return <p>You have not enrolled in any course yet.</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Enrolled Courses</h2>

      <div className="grid grid-cols-1 gap-4">
        {enrolledCourses.map((course, index) => (
          <div
            key={course._id || index}
            className="flex flex-col md:flex-row items-center gap-4 p-4 border rounded-md bg-richblack-800 border-richblack-700"
          >
            {/* Thumbnail */}
            <img
              src={course.thumbnail}
              alt={course.courseName}
              className="h-32 w-48 rounded-md object-cover"
            />

            {/* Course Info */}
            <div className="flex-1">
              <p className="font-semibold text-lg">{course.courseName}</p>
              <p className="text-richblack-300">{course.courseDescription}</p>
              <p className="text-sm mt-1">
                Duration: <span className="font-medium">{course.totalDuration}</span>
              </p>
            </div>

            {/* Progress */}
            <div className="w-full md:w-1/3">
              <p className="text-sm mb-1">
                Progress: <span className="font-medium">{course.progressPercentage || 0}%</span>
              </p>
              <ProgressBar
                completed={course.progressPercentage || 0}
                height="8px"
                isLabelVisible={false}
                className="rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EnrolledCourses;
