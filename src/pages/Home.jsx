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


function Home() {
  return (
    <div>
      {/* section1 */}

      <div className='relative mx-auto flex flex-col w-11/12 items-center max-w-maxContent justify-between text-white '>

        {/* Button for instructor*/}

        <Link to={"/signup"}>

          <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800  text-white font-bold  transition-all duration-200 hover:scale-95 w-fit shadow-[0_0_10px_rgba(255,255,255,0.5)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]'>

            <div className='flex flex-row items-center gap-2 rounded-full bg-richblack-800 px-10 py-[5px]  text-white transition-all duration-200 group-hover:bg-richblack-900'>

              <p>Become an Instructor</p>
              <FaArrowRight />

            </div>

          </div>
        </Link>

        {/* Heading */}

        <div className='text-center text-4xl font-semibold mt-8'>
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        {/* Subtext */}

        <div className='mt-5 w-[90%] text-center text-lg font-bold text-richblack-300'>
          with our online coding courses, you can learn at your own pace, from anywhere in the world,and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from Instructors.
        </div>

        {/* CTA buttons */}

        <div className='flex flex-row gap-7 mt-8'>
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        {/* Video */}

        <div className="relative mt-20 flex justify-center items-start px-4">

          {/* Container for video & background */}
          <div className="relative w-full max-w-[1250px] aspect-video">

            {/* White background, offset responsively */}
            <div className="
      absolute inset-0 bg-white shadow-lg
      translate-x-[3%] translate-y-[3.5%]   /* Default mobile */
      sm:translate-x-[2.5%] sm:translate-y-[3%] 
      md:translate-x-[2%] md:translate-y-[2.5%] 
      lg:translate-x-[1.5%] lg:translate-y-[2%]
    "></div>

            {/* Video above */}
            <video
              muted
              autoPlay
              loop
              className="relative w-full h-full shadow-xl"
            >
              <source src={Banner} type="video/mp4" />
            </video>
          </div>

          {/* Lamp-like glow shining upward */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 
                  w-[200px] sm:w-[300px] md:w-[400px] 
                  h-8 sm:h-12 md:h-16 
                  bg-white/70 blur-[80px] sm:blur-[100px] md:blur-[120px] rounded-full"></div>

        </div>



        {/* code section 1 */}

        <div className="px-4 sm:px-6 lg:px-12 w-full">
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className='text-4xl font-semibold'>
                Unlock Your  <HighlightText text={"Coding Potential "} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and passionate about sharing their knowledge with you."
            }
            ctabtn1={
              {
                text: "try it yourself",
                linkto: "/signup",
                active: true,
              }
            }
            ctabtn2={
              {
                text: "Learn more",
                linkto: "/login",
                active: false,
              }
            }
            codeblock={`<!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                </head>
                <body>
                <h1>Hello World</h1>
                </body>
                </html>`}

            codeColor={"text-yellow-25"}
            backgroundGradient={"bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400"}
          />


        </div>

        {/* code section 2 */}

        <div className="px-4 sm:px-6 lg:px-12 w-full ">
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className='text-4xl font-semibold'>
                Unlock Your  <HighlightText text={"Coding Potential "} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and passionate about sharing their knowledge with you."
            }
            ctabtn1={
              {
                text: "try it yourself",
                linkto: "/signup",
                active: true,
              }
            }
            ctabtn2={
              {
                text: "Learn more",
                linkto: "/login",
                active: false,
              }
            }
            codeblock={`<!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                </head>
                <body>
                <h1>Hello World</h1>
                </body>
                </html>`}

            codeColor={"text-yellow-25"}
            backgroundGradient={"bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400"}
          />


        </div>

        <ExploreMore/>



      </div>

      {/* section2 */}

      <div className='bg-pure-greys-5 text-richblack-700'>

        <div className='homepage_bg h-[333px]'>

          <div className='w-11/12 max-w-maxContent  flex flex-col items-center gap-5 mx-auto'>

            <div className='h-[150px]'></div>

            <div className='flex flex-row gap-7 text-white'>
              <CTAButton active={true} linkto={"/signup"}>

                <div className='flex flex-row gap-3 mx-auto items-center'>
                  Explore Full Catalog
                  <FaArrowRight />
                </div>

              </CTAButton>

              <CTAButton active={false} linkto={"/signup"}>
                <div>Learn More</div>
              </CTAButton>
            </div>

          </div>

        </div>

        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items center justify-between gap-7'>

          <div className='flex flex-row gap-5 mb-10 mt-[95px]'>

            <div className='text-4xl font-semibold w-[45%]'>
              Get the Skills you need for a
              <HighlightText text={"Job that is in demand"} />


            </div>

            <div className='flex flex-col gap-10 w-[40%]'>
              <div className='text-[16px]'>
                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div>
                  Learn more
                </div>
              </CTAButton>



            </div>


          </div>

        <TimelineSection/>

        <LearningLanguageSection/>

        </div>



      </div>



      {/* section3 */}

      <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>

      <InstructorSection/>

      <h2 className='text-center text-4xl font-semibold mt-10'> Review from Other Learners</h2>

      {/* Review Slider here */}



      </div>


      {/* footer */}
      
      <Footer/>


    </div>
  )
}

export default Home