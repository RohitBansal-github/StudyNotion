import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../../../common/IconBtn';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';

function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  // Pre-populate checkbox if course is already published
  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue('public', true);
    }
  }, [course?.status, setValue]);

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate('/dashboard/my-courses');
  };

  const handleCoursePublish = async () => {
    const isPublic = getValues('public');

    // No changes, just redirect
    if (
      (course?.status === COURSE_STATUS.PUBLISHED && isPublic) ||
      (course?.status === COURSE_STATUS.DRAFT && !isPublic)
    ) {
      goToCourses();
      return;
    }

    // Form updated, call API
    const formData = new FormData();
    formData.append('courseId', course._id);
    formData.append('status', isPublic ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT);

    setLoading(true);
    const result = await editCourseDetails(formData, token);
    setLoading(false);

    if (result) goToCourses();
  };

  const onSubmit = () => {
    handleCoursePublish();
  };

  const goBack = () => {
    dispatch(setStep(2));
  };

  return (
    <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6 space-y-6">
      <h2 className="text-lg font-semibold text-richblack-5">Publish Course</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="public"
            {...register('public')}
            className="h-4 w-4 rounded accent-yellow-50"
          />
          <label htmlFor="public" className="text-richblack-5">
            Make this course public
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={goBack}
            disabled={loading}
            className="flex items-center rounded-md bg-richblack-500 px-4 py-2 text-richblack-100 hover:bg-richblack-600 transition"
          >
            Back
          </button>

          <IconBtn type="submit" disabled={loading} text="Save Changes" />
        </div>
      </form>
    </div>
  );
}

export default PublishCourse;
