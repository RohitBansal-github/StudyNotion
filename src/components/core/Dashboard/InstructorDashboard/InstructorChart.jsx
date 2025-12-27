import React, { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState("students")

  const getRandomColors = (num) =>
    Array.from({ length: num }, () =>
      `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`
    )

  const chartData = {
    labels: courses.map((c) => c.courseName),
    datasets: [
      {
        data:
          currChart === "students"
            ? courses.map((c) => c.totalStudentsEnrolled)
            : courses.map((c) => c.totalAmountGenerated),
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  }

  return (
    <div className="text-richblack-5">
      <p className="text-lg font-semibold mb-4">Visualise</p>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setCurrChart("students")}
          className={`px-4 py-2 rounded-lg ${
            currChart === "students"
              ? "bg-yellow-50 text-black"
              : "bg-richblack-700"
          }`}
        >
          Students
        </button>

        <button
          onClick={() => setCurrChart("income")}
          className={`px-4 py-2 rounded-lg ${
            currChart === "income"
              ? "bg-yellow-50 text-black"
              : "bg-richblack-700"
          }`}
        >
          Income
        </button>
      </div>

      <div className="max-w-xs mx-auto">
        <Pie data={chartData} />
      </div>
    </div>
  )
}

export default InstructorChart
