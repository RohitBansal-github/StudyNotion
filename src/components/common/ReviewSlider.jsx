import React, { useEffect, useState } from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"

import { Autoplay, Navigation } from "swiper/modules"

import ReactStars from "react-rating-stars-component"
import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/api"
import { FaStar } from "react-icons/fa"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchAllReviews = async () => {
      const response = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      )

      if (response?.data?.success) {
        setReviews(response.data.data)
      }
    }
    fetchAllReviews()
  }, [])

  return (
    <div className="w-full bg-richblack-900 py-12">
      <div className="mx-auto max-w-maxContent px-4">
        <Swiper
          slidesPerView={1}
          centeredSlides={true}
          spaceBetween={30}
          loop={true}
          watchOverflow={false}   // 🔥 IMPORTANT
          loopedSlides={reviews.length || 1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}       // arrows ON
          modules={[Autoplay, Navigation]}
          className="w-full"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div className="w-full max-w-[420px] rounded-xl bg-richblack-800 p-6 shadow-xl transition-all duration-300 hover:scale-[1.03]">
                
                {/* USER */}
                <div className="flex items-center gap-3">
                  <img
                    src={
                      review?.user?.image
                        ? review.user.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt="profile"
                    className="h-11 w-11 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-semibold text-richblack-5">
                      {review?.user?.firstName} {review?.user?.lastName}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {review?.course?.courseName}
                    </p>
                  </div>
                </div>

                {/* REVIEW */}
                <p className="mt-4 text-sm text-richblack-100">
                  “{review?.review}”
                </p>

                {/* RATING */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="font-semibold text-yellow-25">
                    {review?.rating.toFixed(1)}
                  </span>

                  <ReactStars
                    count={5}
                    value={review?.rating}
                    size={18}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider
