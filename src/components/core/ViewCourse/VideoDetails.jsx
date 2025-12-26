import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import { Player } from "video-react"
import { AiFillPlayCircle } from "react-icons/ai"
import IconBtn from "../../common/IconBtn"

function VideoDetails() {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const playerRef = useRef(null)
  const location = useLocation()

  const { token } = useSelector((state) => state.auth)
  const { courseSectionData = [], completedLectures = [] } = useSelector(
    (state) => state.viewCourse
  )

  const [videoData, setVideoData] = useState(null)
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)

  /* ---------------- LOAD VIDEO DATA ---------------- */
  useEffect(() => {
    if (!courseSectionData.length) return

    const section = courseSectionData.find(
      (sec) => sec._id === sectionId
    )

    const video = section?.subSection?.find(
      (sub) => sub._id === subSectionId
    )

    setVideoData(video || null)
    setVideoEnded(false)
  }, [courseSectionData, sectionId, subSectionId, location.pathname])

  /* ---------------- HELPERS ---------------- */
  const getIndexes = () => {
    const secIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    )

    if (secIndex === -1) return {}

    const subIndex =
      courseSectionData[secIndex]?.subSection?.findIndex(
        (sub) => sub._id === subSectionId
      )

    return { secIndex, subIndex }
  }

  const isFirstVideo = () => {
    const { secIndex, subIndex } = getIndexes()
    return secIndex === 0 && subIndex === 0
  }

  const isLastVideo = () => {
    const { secIndex, subIndex } = getIndexes()
    if (secIndex == null || subIndex == null) return true

    return (
      secIndex === courseSectionData.length - 1 &&
      subIndex ===
        courseSectionData[secIndex].subSection.length - 1
    )
  }

  /* ---------------- NAVIGATION ---------------- */
  const goToNextVideo = () => {
    const { secIndex, subIndex } = getIndexes()
    if (secIndex == null || subIndex == null) return

    const section = courseSectionData[secIndex]

    if (subIndex < section.subSection.length - 1) {
      const nextId = section.subSection[subIndex + 1]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextId}`
      )
    } else if (secIndex < courseSectionData.length - 1) {
      const nextSection = courseSectionData[secIndex + 1]
      navigate(
        `/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSection.subSection[0]._id}`
      )
    }
  }

  const goToPrevVideo = () => {
    const { secIndex, subIndex } = getIndexes()
    if (secIndex == null || subIndex == null) return

    if (subIndex > 0) {
      const prevId =
        courseSectionData[secIndex].subSection[subIndex - 1]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevId}`
      )
    } else if (secIndex > 0) {
      const prevSection = courseSectionData[secIndex - 1]
      const lastVideo =
        prevSection.subSection[
          prevSection.subSection.length - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${prevSection._id}/sub-section/${lastVideo}`
      )
    }
  }

  /* ---------------- MARK COMPLETE ---------------- */
  const handleLectureCompletion = async () => {
    if (!token) return
    setLoading(true)

    const res = await markLectureAsComplete(
      { courseId, subSectionId },
      token
    )

    if (res) dispatch(updateCompletedLectures(subSectionId))
    setLoading(false)
  }

  /* ---------------- FALLBACK ---------------- */
  if (!videoData) {
    return <div className="text-white">No Video Found</div>
  }

  return (
    <div className="text-white">
      <Player
        ref={playerRef}
        aspectRatio="16:9"
        fluid={true} 
        playsInline
        src={videoData.videoUrl}
        onEnded={() => setVideoEnded(true)}
      >
        <AiFillPlayCircle />
      </Player>

      {videoEnded && (
        <div className="mt-4 flex flex-col gap-3">
          {!completedLectures.includes(subSectionId) && (
            <IconBtn
              disabled={loading}
              onClick={handleLectureCompletion}
              text={loading ? "Loading..." : "Mark As Completed"}
            />
          )}

          <IconBtn
            text="Rewatch"
            onClick={() => {
              playerRef.current?.seek(0)
              setVideoEnded(false)
            }}
          />

          <div className="flex gap-4">
            {!isFirstVideo() && (
              <button onClick={goToPrevVideo}>Prev</button>
            )}
            {!isLastVideo() && (
              <button onClick={goToNextVideo}>Next</button>
            )}
          </div>
        </div>
      )}

      <h1 className="mt-4 text-xl font-bold">{videoData.title}</h1>
      <p className="mt-2 text-richblack-200">
        {videoData.description}
      </p>
    </div>
  )
}

export default VideoDetails
