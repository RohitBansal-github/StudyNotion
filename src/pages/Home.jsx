import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa"
import HighlightText from '../components/core/Homepage/HighlightText'
import CTAButton from '../components/core/Homepage/Button'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/Homepage/CodeBlocks'
import TimelineSection from '../components/core/Homepage/TimelineSection'
import LearningLanguageSection from '../components/core/Homepage/LearningLanguageSection'
import InstructorSection from '../components/core/Homepage/InstructorSection'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/Homepage/ExploreMore'
import ReviewSlider from '../components/common/ReviewSlider'

function Home() {
  return (
    <div className="text-white">

      {/* Section 1: Hero */}
      <div className='relative mx-auto flex flex-col w-11/12 items-center max-w-maxContent justify-center text-center'>
        
        <Link to="/signup">
          <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 text-white font-bold transition-all duration-200 hover:scale-95 shadow-[0_0_10px_rgba(255,255,255,0.5)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] w-fit'>
            <div className='flex items-center gap-2 rounded-full bg-richblack-800 px-10 py-2 text-white transition-all duration-200 group-hover:bg-richblack-900'>
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <h1 className='text-4xl sm:text-5xl md:text-6xl font-semibold mt-8'>
          Empower Your Future with <HighlightText text="Coding Skills" />
        </h1>

        <p className='mt-5 w-full sm:w-10/12 lg:w-8/12 text-lg sm:text-xl font-bold text-richblack-300'>
          Learn at your own pace with hands-on projects, quizzes, and personalized feedback from instructors.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 sm:gap-7 mt-8'>
          <CTAButton active={true} linkto="/signup">Learn More</CTAButton>
          <CTAButton active={false} linkto="/login">Book a Demo</CTAButton>
        </div>

        {/* Hero Video */}
        <div className="relative mt-20 flex justify-center items-center w-full">
          <div className="relative w-full max-w-[1250px] aspect-video">
            <div className="absolute inset-0 bg-white shadow-lg translate-x-[3%] translate-y-[3%] sm:translate-x-[2.5%] sm:translate-y-[3%] md:translate-x-[2%] md:translate-y-[2.5%] lg:translate-x-[1.5%] lg:translate-y-[2%] rounded"></div>
            <video muted autoPlay loop className="relative w-full h-full shadow-xl rounded">
              <source src={Banner} type="video/mp4" />
            </video>
          </div>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[200px] sm:w-[300px] md:w-[400px] h-8 sm:h-12 md:h-16 bg-white/70 blur-[80px] sm:blur-[100px] md:blur-[120px] rounded-full"></div>
        </div>
      </div>

      {/* Section 2: CodeBlocks */}
      <div className="px-4 sm:px-6 lg:px-12 mt-20 space-y-24">
        <CodeBlocks
          position="lg:flex-row"
          heading={<h2 className='text-4xl font-semibold'>Unlock Your <HighlightText text="Coding Potential"/> with our online courses</h2>}
          subheading="Designed by industry experts passionate about teaching coding."
          ctabtn1={{ text: "Try it yourself", linkto: "/signup", active: true }}
          ctabtn2={{ text: "Learn more", linkto: "/login", active: false }}
          codeblock={`<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><h1>Hello World</h1></body></html>`}
          codeColor="text-yellow-25"
          backgroundGradient="bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400"
        />

        <CodeBlocks
          position="lg:flex-row-reverse"
          heading={<h2 className='text-4xl font-semibold'>Learn by Doing <HighlightText text="Projects & Quizzes"/></h2>}
          subheading="Hands-on coding practice to build real-world skills."
          ctabtn1={{ text: "Try it yourself", linkto: "/signup", active: true }}
          ctabtn2={{ text: "Learn more", linkto: "/login", active: false }}
          codeblock={`<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><h1>Hello World</h1></body></html>`}
          codeColor="text-yellow-25"
          backgroundGradient="bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400"
        />
      </div>

      {/* Explore More */}
      <div className="mt-20">
        <ExploreMore />
      </div>

      {/* Section 3: Timeline & Learning */}
      <div className="bg-pure-greys-5 text-richblack-700 mt-32 py-20">
        <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center space-y-16">
          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 4: Instructor & Reviews */}
      <div className="w-11/12 max-w-maxContent mx-auto mt-20 space-y-16">
        <InstructorSection />
        <h2 className='text-center text-4xl font-semibold'>Reviews from Other Learners</h2>

        {/* Review Slider here */}

        <ReviewSlider/>


      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home
