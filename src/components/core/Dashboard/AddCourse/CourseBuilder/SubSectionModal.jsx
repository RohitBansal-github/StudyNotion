import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../../../../../slices/courseSlice";
import { createSubSection, updateSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { RxCross1 } from "react-icons/rx";
import Upload from "../CourseInformation/Upload";
import IconBtn from "../../../../common/IconBtn";

function SubSectionModal({ modalData, sectionId, setModalData, add = false, view = false, edit = false }) {
  const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm();
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  // Populate form if view/edit
  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, [modalData, view, edit, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo instanceof File
    );
  };

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();
    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) formData.append("title", currentValues.lectureTitle);
    if (currentValues.lectureDesc !== modalData.description) formData.append("description", currentValues.lectureDesc);
    if (currentValues.lectureVideo instanceof File) formData.append("videoFile", currentValues.lectureVideo);

    setLoading(true);
    const updatedSection = await updateSubSection(formData, token);

    if (updatedSection) {
      dispatch(setCourse({
        ...course,
        courseContent: course.courseContent.map((sec) =>
          sec._id === modalData.sectionId ? updatedSection : sec
        ),
      }));
      setModalData(null);
    }
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form");
      } else {
        await handleEditSubSection();
      }
      return;
    }

    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("videoFile", data.lectureVideo);
    formData.append("timeDuration", data.timeDuration);

    setLoading(true);
    const result = await createSubSection(formData, token);

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      );
      dispatch(setCourse({ ...course, courseContent: updatedCourseContent }));
    }

    setModalData(null);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-richblack-800 p-6 relative text-richblack-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </h2>
          <button
            onClick={() => !loading && setModalData(null)}
            className="text-richblack-300 hover:text-yellow-50 transition"
          >
            <RxCross1 size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          <div>
            <label htmlFor="lectureTitle" className="block mb-1 font-medium">Lecture Title</label>
            <input
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="w-full p-2 rounded-md bg-richblack-900 text-white border border-richblack-600 focus:border-yellow-50 focus:outline-none"
            />
            {errors.lectureTitle && <span className="text-pink-400 text-sm">Lecture Title is required</span>}
          </div>

          <div>
            <label htmlFor="lectureDesc" className="block mb-1 font-medium">Lecture Description</label>
            <textarea
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="w-full p-2 rounded-md bg-richblack-900 text-white border border-richblack-600 focus:border-yellow-50 focus:outline-none min-h-[130px]"
            />
            {errors.lectureDesc && <span className="text-pink-400 text-sm">Lecture Description is required</span>}
          </div>

          {!view && (
            <div className="flex justify-end mt-4">
              <IconBtn
                type="submit"
                text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                outline={false}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default SubSectionModal;
