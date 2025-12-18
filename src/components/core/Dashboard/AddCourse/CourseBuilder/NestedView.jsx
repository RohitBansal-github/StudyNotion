import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RxDropdownMenu,
} from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";

import ConfirmationModal from "../../../../common/ConfirmationModal";
import SubSectionModal from "./SubSectionModal";

function NestedView({ handleChangedEditSectionName }) {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({ sectionId, courseId: course._id }, token);
    if (result) dispatch(setCourse(result));
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async (subSectionId, SectionId) => {
    await deleteSubSection({ subSectionId, sectionId: SectionId }, token);

    const updatedCourseContent = course.courseContent.map((section) =>
      section._id === SectionId
        ? { ...section, subSection: section.subSection.filter(sub => sub._id !== subSectionId) }
        : section
    );
    dispatch(setCourse({ ...course, courseContent: updatedCourseContent }));

    if (viewSubSection?._id === subSectionId) setViewSubSection(null);
    if (editSubSection?._id === subSectionId) setEditSubSection(null);
    setConfirmationModal(null);
  };

  return (
    <div className="mt-10 rounded-xl bg-richblack-800 p-6 text-richblack-5">
      {course?.courseContent?.map((section) => (
        <details key={section._id} open className="mb-4 rounded-md bg-richblack-700">
          <summary className="flex items-center justify-between cursor-pointer gap-x-3 border-b border-richblack-600 px-4 py-2 transition hover:bg-richblack-600">
            <div className="flex items-center gap-x-3">
              <RxDropdownMenu className="text-yellow-50 text-lg" />
              <p className="font-medium">{section.sectionName}</p>
            </div>

            <div className="flex items-center gap-x-3 text-richblack-300">
              <button
                onClick={() => handleChangedEditSectionName(section._id, section.sectionName)}
                className="hover:text-yellow-50 transition"
              >
                <MdEdit />
              </button>

              <button
                onClick={() =>
                  setConfirmationModal({
                    text1: "Delete this section",
                    text2: "All lectures inside this section will be deleted",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: () => handleDeleteSection(section._id),
                    btn2Handler: () => setConfirmationModal(null),
                  })
                }
                className="hover:text-pink-400 transition"
              >
                <RiDeleteBin6Line />
              </button>

              <BiSolidDownArrow className="text-xs text-richblack-400" />
            </div>
          </summary>

          <div className="mt-2 space-y-2 px-4">
            {section?.subSection?.map((sub) => (
              <div
                key={sub._id}
                onClick={() => setViewSubSection(sub)}
                className="flex items-center justify-between gap-x-3 rounded-md border border-richblack-600 px-3 py-2 transition hover:bg-richblack-600 cursor-pointer"
              >
                <div className="flex items-center gap-x-3">
                  <RxDropdownMenu />
                  <p>{sub.title}</p>
                </div>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-x-3"
                >
                  <button
                    onClick={() => setEditSubSection({ ...sub, sectionId: section._id })}
                    className="hover:text-yellow-50 transition"
                  >
                    <MdEdit />
                  </button>

                  <button
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Delete this Lecture",
                        text2: "Selected lecture will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDeleteSubSection(sub._id, section._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                    className="hover:text-pink-400 transition"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => setAddSubSection(section._id)}
              className="mt-3 flex items-center gap-x-2 text-yellow-50 hover:underline transition"
            >
              <AiOutlinePlus />
              <span>Add Lecture</span>
            </button>
          </div>
        </details>
      ))}

      {/* ===== Modals ===== */}
      {addSubSection && (
        <SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} />
      )}

      {viewSubSection && (
        <SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true} />
      )}

      {editSubSection && (
        <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} />
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}

export default NestedView;
