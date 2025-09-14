import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VscEdit } from "react-icons/vsc";  // 👈 Edit icon import
import IconBtn from "../../common/IconBtn";

function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="bg-richblack-900 text-white p-6 md:p-10 space-y-8 min-h-screen">
      <h1 className="text-3xl font-bold">My Profile</h1>

      {/* section 1 */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-richblack-800 p-6 rounded-2xl shadow-md">
        <div className="flex items-center gap-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[90px] rounded-full object-cover border-2 border-yellow-400"
          />
          <div>
            <p className="text-xl font-semibold">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-gray-400">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => navigate("/dashboard/settings")}
        >
          <VscEdit className="text-lg" />  {/* 👈 Icon added */}
        </IconBtn>
      </div>

      {/* section 2 */}
      <div className="bg-richblack-800 p-6 rounded-2xl shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">About</p>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <VscEdit className="text-lg" />
          </IconBtn>
        </div>
        <p className="text-gray-300">
          {user?.additionalDetails?.about ?? "Write something about yourself"}
        </p>
      </div>

      {/* section 3 */}
      <div className="bg-richblack-800 p-6 rounded-2xl shadow-md space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">Personal Details</p>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <VscEdit className="text-lg" />
          </IconBtn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-400">First Name</p>
            <p className="font-medium">{user?.firstName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Last Name</p>
            <p className="font-medium">{user?.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Phone Number</p>
            <p className="font-medium">
              {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Gender</p>
            <p className="font-medium">
              {user?.additionalDetails?.gender ?? "Add Gender"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Date of Birth</p>
            <p className="font-medium">
              {user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
