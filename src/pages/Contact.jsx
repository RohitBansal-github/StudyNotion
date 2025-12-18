import React from "react"

import Footer from "../components/common/Footer"
// import ReviewSlider from "../components/common/ReviewSlider"
// import ContactDetails from "../components/core/ContactUsPage/ContactDetails"
import ContactUsForm from "../components/ContactPage/ContactUsForm"

const Contact = () => {
  return (
    <div className="bg-richblack-900 text-white min-h-screen">
      {/* Contact Section */}
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col lg:flex-row justify-between gap-10">
        {/* Contact Details (optional) */}
        {/* <div className="lg:w-[40%]">
          <ContactDetails />
        </div> */}

        {/* Contact Form */}
        <div className="w-full lg:w-[60%]">
          <ContactUsForm />
        </div>
      </div>

      {/* Reviews / Extra Section */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-center gap-8">
        {/* Reviews from Other Learners */}
        {/* <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider /> */}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Contact
