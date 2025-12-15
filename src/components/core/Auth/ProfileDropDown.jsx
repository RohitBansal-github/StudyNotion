import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../services/operations/authAPI";
import { createPortal } from "react-dom";

function ProfileDropDown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.profile.user);

  const handleLogout = () => {
    dispatch(logout(navigate));
    setOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get button position for absolute placement
  const [dropdownStyles, setDropdownStyles] = useState({});

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyles({
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [open]);

  return (
    <>
      {/* Avatar / Button */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full bg-richblack-600 flex items-center justify-center text-richblack-5 font-bold"
      >
        <img
          src={
            user?.image ||
            `https://api.dicebear.com/5.x/initials/svg?seed=${user?.name || "User"}`
          }
          alt="Profile"
          className="w-10 h-10 rounded-full cursor-pointer"
        />
      </button>

      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            style={dropdownStyles}
            className="absolute bg-richblack-800 rounded-md shadow-lg py-2 z-50 border border-richblack-700"
          >
            <button
              onClick={() => {
                navigate("/dashboard/my-profile");
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-richblack-5 hover:bg-richblack-700 transition-colors"
            >
              Profile
            </button>
            <button
              onClick={() => {
                navigate("/settings");
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-richblack-5 hover:bg-richblack-700 transition-all duration-200 ease-in-out"
            >
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-pink-200 hover:bg-richblack-700 transition-colors"
            >
              Logout
            </button>
          </div>,
          document.body
        )}
    </>
  );
}

export default ProfileDropDown;
