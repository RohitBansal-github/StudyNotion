import React from "react";

function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses = "",
  type = "button",
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      type={type}
      className={`
        flex items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold
        transition-all duration-200
        ${outline
          ? "border border-yellow-300 text-yellow-300 hover:bg-yellow-500 hover:text-richblack-900"
          : "bg-yellow-300 text-richblack-900 hover:bg-yellow-500"}
        disabled:opacity-50 disabled:cursor-not-allowed
        ${customClasses}
      `}
    >
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
}

export default IconBtn;
