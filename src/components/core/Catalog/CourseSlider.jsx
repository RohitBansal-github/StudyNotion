import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Coursecard from "./Coursecard";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Autoplay, Navigation } from "swiper/modules";

const CourseSlider = ({ courses }) => {
  return (
    <div className="w-full">

      {courses?.length ? (
        <Swiper
          key={courses?.length}
          slidesPerView={1}
          spaceBetween={20}
          loop={courses?.length > 1}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay, Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          className="pb-10"
        >
          {courses.map((course, index) => (
            <SwiperSlide key={course?._id || index}>
              <Coursecard course={course} Height="h-60" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex items-center justify-center py-12">
          <p className="text-richblack-400 text-sm">
            No courses available
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseSlider;
