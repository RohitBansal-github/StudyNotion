import React from 'react'

function HighlightText({ text }) {
  return (
    <span
      className="
        relative font-bold
        bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500
        bg-clip-text text-transparent
        tracking-tight
        whitespace-nowrap
      "
    >
      {text}
    </span>
  )
}

export default HighlightText
