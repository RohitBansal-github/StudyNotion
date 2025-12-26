import React from 'react'
import HighlightText from '../components/core/Homepage/HighlightText'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/StatsComponent'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'

function About() {
  return (
    <div className='mt-[100px] text-white bg-richblack-900'>
      
      {/* Section 1 - Hero */}
      <section className='w-11/12 max-w-6xl mx-auto flex flex-col items-center gap-10 text-center'>
        <header className='space-y-6'>
          <h1 className='text-3xl md:text-4xl font-bold leading-snug'>
            Driving Innovation in Online Education for a{" "}
            <HighlightText text={"Brighter Future"} />
          </h1>
          <p className='text-richblack-200 text-lg max-w-3xl mx-auto'>
            Studynotion is at the forefront of driving innovation in online education. We're passionate 
            about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, 
            and nurturing a vibrant learning community.
          </p>
        </header>

        <div className='flex flex-col md:flex-row gap-4 items-center justify-center'>
          <img src={BannerImage1} alt="About Us 1" className='w-[300px] rounded-lg shadow-lg'/>
          <img src={BannerImage2} alt="About Us 2" className='w-[300px] rounded-lg shadow-lg'/>
          <img src={BannerImage3} alt="About Us 3" className='w-[300px] rounded-lg shadow-lg'/>
        </div>
      </section>

      {/* Section 2 - Quote */}
      <section className='w-11/12 max-w-6xl mx-auto py-16'>
        <Quote />
      </section>

      {/* Section 3 - Founding Story, Vision, Mission */}
      <section className='w-11/12 max-w-6xl mx-auto py-16 space-y-20'>

        {/* Founding Story */}
        <div className='flex flex-col md:flex-row items-center gap-10'>
          <div className='flex-1 space-y-6'>
            <h2 className='text-3xl font-semibold'>Our Founding Story</h2>
            <p className='text-richblack-200 leading-relaxed'>
              Our e-learning platform was born out of a shared vision and passion for transforming education. 
              It all began with a group of educators, technologists, and lifelong learners who recognized 
              the need for accessible, flexible, and high-quality learning opportunities in a rapidly 
              evolving digital world.
            </p>
          </div>
          <div className='flex-1 flex justify-center'>
            <img src={FoundingStory} alt="Founding Story" className='max-w-md rounded-lg shadow-lg'/>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className='grid md:grid-cols-2 gap-12'>
          <div className='space-y-6'>
            <h2 className='text-3xl font-semibold'>Our Vision</h2>
            <p className='text-richblack-200 leading-relaxed'>
              With this vision in mind, we set out on a journey to create an e-learning platform that would 
              revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop 
              a robust and intuitive platform that combines cutting-edge technology with engaging content, 
              fostering a dynamic and interactive learning experience.
            </p>
          </div>

          <div className='space-y-6'>
            <h2 className='text-3xl font-semibold'>Our Mission</h2>
            <p className='text-richblack-200 leading-relaxed'>
              Our mission goes beyond just delivering courses online. We wanted to create a vibrant community 
              of learners, where individuals can connect, collaborate, and learn from one another. We believe 
              that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of 
              collaboration through forums, live sessions, and networking opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 - Stats */}
      <StatsComponent />

      {/* Section 5 - Learning + Contact */}
      <section className='w-11/12 max-w-6xl mx-auto py-20 flex flex-col items-center gap-10'>
        <LearningGrid />
        <ContactFormSection />
      </section>

      {/* Section 6 - Reviews */}
      <section className='w-11/12 max-w-6xl mx-auto py-20'>
        <h2 className='text-3xl font-semibold mb-6'>Reviews from other learners</h2>
        {/* ReviewSlider (Add later) */}
        <div className='bg-richblack-800 p-10 rounded-xl text-center text-richblack-200'>
          
          <ReviewSlider/>
          
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  )
}

export default About
