import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { VscSignOut, VscSettingsGear } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../common/ConfirmationModal";

function Sidebar() {
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmationModal, setConfirmationModal] = useState(null);

  if (profileLoading || authLoading) {
    return (
      <div className="mt-10 text-center text-richblack-200">Loading...</div>
    );
  }

  return (
    <div>
      {/* Sidebar wrapper */}
      <div className="flex h-[calc(100vh-3.5rem)] min-w-[230px] flex-col justify-between border-r border-richblack-700 bg-richblack-800 p-5">
        
        {/* Links */}
        <div className="flex flex-col gap-1">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink
                key={link.id}
                link={link}
                iconName={link.icon}
              />
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-4 h-[1px] w-full bg-richblack-600"></div>

        {/* Settings + Logout */}
        <div className="flex flex-col gap-2">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />

          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are You Sure?",
                text2: "You will be logged out of your Account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-richblack-300 hover:bg-richblack-700 transition"
          >
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}

export default Sidebar;
