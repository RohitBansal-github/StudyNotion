import React from "react";
import * as Icons from "react-icons/vsc";
import { matchPath, NavLink, useLocation } from "react-router-dom";

function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName];
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const isActive = matchRoute(link.path);

  return (
    <NavLink
      to={link.path}
      className={`relative flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-yellow-800 text-yellow-50"
          : "text-richblack-300 hover:bg-richblack-700 hover:text-richblack-50"
      }`}
    >
      {/* Left Highlight Bar */}
      <span
        className={`absolute left-0 top-0 h-full w-[0.25rem] rounded-r-sm bg-yellow-50 transition-all ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Icon + Name */}
      <Icon className="text-lg" />
      <span>{link.name}</span>
    </NavLink>
  );
}

export default SidebarLink;
