import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice';

function EditCourse() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const populateCourseDetails = async () => {
      setLoading(true);
      const result = await getFullDetailsOfCourse(courseId, token);

      if (result?.courseDetails) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result.courseDetails));
        dispatch(setStep(1));
      }

      setLoading(false);
    };

    populateCourseDetails();
  }, [courseId, token, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-richblack-200">
        Loading course details...
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold text-richblack-5">Edit Course</h1>
      <div>
        {course ? (
          <RenderSteps />
        ) : (
          <p className="text-richblack-300">Course not found</p>
        )}
      </div>
    </div>
  );
}

export default EditCourse;
