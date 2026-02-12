import React from "react";
import HighlightText from "../components/core/Homepage/HighlightText";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/AboutPage/Quote";
import FoundingStory from "../assets/Images/FoundingStory.png";
import StatsComponent from "../components/core/AboutPage/StatsComponent";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

function About() {
  return (
    <div className="w-full bg-richblack-900 text-white overflow-x-hidden">

      {/* HERO */}
      <section className="w-11/12 max-w-6xl mx-auto pt-24 pb-16 text-center">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Driving Innovation in Online Education for a{" "}
            <HighlightText text="Brighter Future" />
          </h1>

          <p className="text-richblack-200 text-base md:text-lg max-w-3xl mx-auto">
            Studynotion is at the forefront of driving innovation in online education.
            We're passionate about creating a brighter future by offering cutting-edge
            courses and nurturing a vibrant learning community.
          </p>
        </div>

        {/* Images */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <img
            src={BannerImage1}
            alt="About 1"
            className="w-[280px] sm:w-[300px] rounded-lg"
          />
          <img
            src={BannerImage2}
            alt="About 2"
            className="w-[280px] sm:w-[300px] rounded-lg"
          />
          <img
            src={BannerImage3}
            alt="About 3"
            className="w-[280px] sm:w-[300px] rounded-lg"
          />
        </div>
      </section>

      {/* QUOTE */}
      <section className="w-11/12 max-w-6xl mx-auto py-16">
        <Quote />
      </section>

      {/* FOUNDING STORY */}
      <section className="w-11/12 max-w-6xl mx-auto py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <h2 className="text-3xl font-semibold">Our Founding Story</h2>
            <p className="text-richblack-200 leading-relaxed">
              Our e-learning platform was born out of a shared vision and passion
              for transforming education in a rapidly evolving digital world.
            </p>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src={FoundingStory}
              alt="Founding Story"
              className="w-full max-w-md rounded-lg"
            />
          </div>

        </div>
      </section>

      {/* VISION + MISSION */}
      <section className="w-11/12 max-w-6xl mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
          
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Our Vision</h2>
            <p className="text-richblack-200 leading-relaxed">
              We aim to revolutionize learning using cutting-edge technology
              combined with engaging content.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Our Mission</h2>
            <p className="text-richblack-200 leading-relaxed">
              Our mission is to create a collaborative learning community
              where individuals can connect and grow together.
            </p>
          </div>

        </div>
      </section>

      {/* STATS — UNTOUCHED */}
      <StatsComponent />

      {/* LEARNING + CONTACT */}
      <section className="w-11/12 max-w-6xl mx-auto py-20 flex flex-col gap-16">
        <LearningGrid />
        <ContactFormSection />
      </section>

      {/* REVIEWS */}
      <section className="w-11/12 max-w-6xl mx-auto py-20">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Reviews from other learners
        </h2>

        <div className="bg-richblack-800 p-8 rounded-xl">
          <ReviewSlider />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
