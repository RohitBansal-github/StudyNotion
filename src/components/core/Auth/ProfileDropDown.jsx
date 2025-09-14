import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI';

function ProfileDropDown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar / Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full bg-richblack-600 flex items-center justify-center text-richblack-5 font-bold"
      >
<img
  src={user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${user?.name || "User"}`}
  alt="Profile"
  className="w-10 h-10 rounded-full cursor-pointer"
/>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-richblack-800 rounded-md shadow-lg py-2 z-50 border border-richblack-700">
          <button
            onClick={() => { navigate("/dashboard/my-profile"); setOpen(false); }}
            className="w-full text-left px-4 py-2 text-richblack-5 hover:bg-richblack-700 transition-colors"
          >
            Profile
          </button>
          <button
            onClick={() => { navigate("/settings"); setOpen(false); }}
            className="w-full text-left px-4 py-2 text-richblack-5 hover:bg-richblack-700 transition-all duration-200 ease-in-out
"
          >
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-pink-200 hover:bg-richblack-700 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropDown;
