import React from 'react'
import HighlightText from '../Homepage/HighlightText'

function Quote() {
  return (
    <div className="w-11/12 max-w-4xl mx-auto text-center py-10 px-6">
      <p className="text-lg md:text-2xl font-medium leading-relaxed text-richblack-200">
        We are passionate about revolutionizing the way we learn. Our innovative platform{" "}
        <HighlightText text={"combines technology"} />
        <span className="text-brown-500 font-semibold"> expertise</span>, and community to create an
        <span className="text-yellow-50 font-semibold"> unparalleled educational experience.</span>
      </p>
    </div>
  )
}

export default Quote
