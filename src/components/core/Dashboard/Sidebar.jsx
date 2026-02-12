import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import {
  VscSignOut,
  VscSettingsGear,
  VscChevronDown,
} from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../common/ConfirmationModal";

function Sidebar({ closeSidebar }) {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmationModal, setConfirmationModal] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  if (profileLoading || authLoading) {
    return (
      <div className="mt-10 text-center text-richblack-200">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-full min-w-[240px] flex-col justify-between border-r border-richblack-700 bg-richblack-800 p-5">

      {/* ===== Links Section ===== */}
      <div className="flex flex-col gap-1">

        {sidebarLinks.map((link) => {
          if (link.type && user?.accountType !== link.type) return null;

          if (link.children) {
            const isOpen = openDropdown === link.id;

            return (
              <div key={link.id}>
                <button
                  onClick={() =>
                    setOpenDropdown(isOpen ? null : link.id)
                  }
                  className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm font-medium text-richblack-300 hover:bg-richblack-700 transition"
                >
                  <div className="flex items-center gap-3">
                    <link.icon className="text-lg" />
                    <span>{link.name}</span>
                  </div>

                  <VscChevronDown
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="ml-6 mt-1 flex flex-col gap-1">
                    {link.children.map((child) => (
                      <SidebarLink
                        key={child.id}
                        link={child}
                        iconName={child.icon}
                        onClick={closeSidebar}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <SidebarLink
              key={link.id}
              link={link}
              iconName={link.icon}
              onClick={closeSidebar}
            />
          );
        })}
      </div>

      {/* ===== Bottom Section ===== */}
      <div>
        <div className="my-4 h-[1px] w-full bg-richblack-600"></div>

        <div className="flex flex-col gap-3">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
            onClick={closeSidebar}
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

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </div>
  );
}

export default Sidebar;
