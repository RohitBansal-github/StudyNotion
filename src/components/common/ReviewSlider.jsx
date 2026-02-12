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
    <div className="w-full mt-16">
      <div className="mx-auto max-w-7xl px-4">

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          watchOverflow={false}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          // navigation={true}
          modules={[Autoplay, Navigation]}
          className="w-full"
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index} className="flex justify-center py-6">
              <div className="w-full max-w-[380px] rounded-xl bg-richblack-800 p-6 shadow-lg transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl">
                
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
                    <p className="font-semibold text-richblack-5 leading-tight">
                      {review?.user?.firstName} {review?.user?.lastName}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {review?.course?.courseName}
                    </p>
                  </div>
                </div>

                {/* REVIEW */}
                <p className="mt-4 text-sm text-richblack-100 leading-relaxed line-clamp-4">
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
