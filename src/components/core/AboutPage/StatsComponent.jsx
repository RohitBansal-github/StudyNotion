import React from 'react'

const stats = [
  { count: "5k+", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
]

function StatsComponent() {
  return (
    <section className="w-full bg-richblack-900 py-14">
      <div className="mx-auto w-11/12 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((data, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-richblack-800 rounded-lg py-6 shadow-md hover:scale-105 transition-transform duration-300"
            >
              <h1 className="text-3xl md:text-4xl font-extrabold text-richblack-600">
                {data.count}
              </h1>
              <h2 className="text-richblack-200 text-sm md:text-base mt-2">
                {data.label}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsComponent
