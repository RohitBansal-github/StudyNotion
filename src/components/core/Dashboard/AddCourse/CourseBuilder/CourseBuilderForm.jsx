import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GrAddCircle } from "react-icons/gr";
import { BiRightArrow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import IconBtn from "../../../../common/IconBtn";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI";
import NestedView from "./NestedView";

function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [editSectionName, setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(false);

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!course?._id) {
      toast.error("Course ID not found. Please save course first.");
    }
  }, [course?._id]);

  const onSubmit = async (data) => {
    if (!course?._id) return;

    setLoading(true);
    let result;

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }

    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    setLoading(false);
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add at least one section");
      return;
    }

    if (
      course.courseContent.some(
        (section) => section.subSection.length === 0
      )
    ) {
      toast.error("Each section must have at least one lecture");
      return;
    }

    dispatch(setStep(3));
  };

  const handleChangedEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="rounded-xl bg-richblack-800 p-6 text-richblack-5">
      
      {/* ===== Header ===== */}
      <h2 className="mb-6 text-xl font-semibold border-b border-richblack-600 pb-3">
        Course Builder
      </h2>

      {/* ===== Form ===== */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="sectionName"
            className="text-sm font-medium text-richblack-200"
          >
            Section Name <sup className="text-pink-200">*</sup>
          </label>

          <input
            id="sectionName"
            placeholder="Add section name"
            {...register("sectionName", { required: true })}
            className="w-full rounded-md bg-richblack-700 px-3 py-2 text-richblack-5 outline-none transition focus:ring-2 focus:ring-yellow-50"
          />

          {errors.sectionName && (
            <span className="text-xs text-pink-200">
              Section name is required
            </span>
          )}
        </div>

        {/* ===== Action Buttons ===== */}
        <div className="flex items-center gap-6">
          <IconBtn
            type="submit"
            text={editSectionName ? "Update Section" : "Create Section"}
            outline={true}
            disabled={loading}
          >
            <GrAddCircle />
          </IconBtn>

          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline hover:text-richblack-100"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* ===== Sections List ===== */}
      {course?.courseContent?.length > 0 && (
        <div className="mt-10">
          <NestedView
            handleChangedEditSectionName={handleChangedEditSectionName}
          />
        </div>
      )}

      {/* ===== Footer Buttons ===== */}
      <div className="mt-12 flex justify-end gap-x-4 border-t border-richblack-600 pt-6">
        <button
          onClick={goBack}
          className="rounded-md border border-richblack-600 px-4 py-2 text-sm text-richblack-200 transition hover:bg-richblack-700"
        >
          Back
        </button>

        <IconBtn text="Next" onClick={goToNext}>
          <BiRightArrow />
        </IconBtn>
      </div>
    </div>
  );
}

export default CourseBuilderForm;
