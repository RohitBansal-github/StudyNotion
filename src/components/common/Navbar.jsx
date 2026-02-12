import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiMenu, FiX } from "react-icons/fi";
import { VscChevronDown, VscSignOut, VscSettingsGear } from "react-icons/vsc";
import * as Icons from "react-icons/vsc";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { sidebarLinks } from "../../data/dashboard-links";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { logout } from "../../services/operations/authAPI";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/api";
import ConfirmationModal from "./ConfirmationModal";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [confirmationModal, setConfirmationModal] = useState(null);
  const [subLinks, setSubLinks] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(result.data.AllCategories || []);
      } catch (error) {
        console.log("Could not fetch categories");
      }
    };
    fetchCategories();
  }, []);

  function matchRoute(route) {
    return matchPath({ path: route }, location.pathname);
  }

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 border-b border-richblack-700 bg-richblack-900">
        <div className="mx-auto flex h-14 w-11/12 max-w-maxContent items-center justify-between">

          <Link to="/">
            <img src={logo} alt="logo" width={160} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-x-6 text-sm font-medium text-richblack-25">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="relative group cursor-pointer">
                      <div className="flex items-center gap-1 hover:text-yellow-50">
                        {link.title}
                        <VscChevronDown />
                      </div>

                      <div className="invisible absolute left-1/2 top-full mt-3 w-56 -translate-x-1/2 rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                        {subLinks.map((sub) => (
                          <Link
                            key={sub._id}
                            to={`/catalog/${sub.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            className="block rounded px-2 py-2 hover:bg-richblack-50"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link to={link.path}>
                      <p className={`${matchRoute(link.path) ? "text-yellow-50" : "hover:text-yellow-50"}`}>
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-x-4">
            {token ? (
              <ProfileDropDown />
            ) : (
              <>
                <Link to="/login">
                  <button className="rounded-md border border-richblack-700 bg-richblack-800 px-4 py-2 text-sm text-richblack-100 hover:bg-richblack-700 transition">
                    Log in
                  </button>
                </Link>

                <Link to="/signup">
                  <button className="rounded-md bg-yellow-50 px-4 py-2 text-sm font-medium text-richblack-900 hover:bg-yellow-100 transition">
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <FiMenu className="text-2xl text-richblack-25" />
          </button>
        </div>
      </header>

      {/* ================= MOBILE SIDEBAR ================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 md:hidden">
          <div className="absolute left-0 top-0 h-full w-72 bg-richblack-800 p-5 flex flex-col justify-between overflow-y-auto">

            {/* TOP SECTION */}
            <div className="flex flex-col gap-4">

              <div className="flex justify-end">
                <FiX
                  className="text-2xl text-richblack-200 cursor-pointer"
                  onClick={() => setMobileOpen(false)}
                />
              </div>

              {/* Navbar Links */}
              <div className="flex flex-col gap-1">
                {NavbarLinks.map((link, index) => {
                  if (link.title === "Catalog") {
                    return (
                      <div key={index}>
                        <button
                          onClick={() => setCatalogOpen(!catalogOpen)}
                          className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm font-medium text-richblack-300 hover:bg-richblack-700"
                        >
                          <span>Catalog</span>
                          <VscChevronDown className={`${catalogOpen ? "rotate-180" : ""}`} />
                        </button>

                        {catalogOpen && (
                          <div className="ml-6 flex flex-col gap-1">
                            {subLinks.map((sub) => (
                              <Link
                                key={sub._id}
                                to={`/catalog/${sub.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                onClick={() => setMobileOpen(false)}
                                className="text-sm text-richblack-400 hover:text-yellow-50"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={index}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-4 py-2 text-sm font-medium text-richblack-300 hover:bg-richblack-700"
                    >
                      {link.title}
                    </Link>
                  );
                })}
              </div>

              {/* Dashboard Links */}
              {token && (
                <>
                  <div className="my-4 h-[1px] bg-richblack-600"></div>

                  {sidebarLinks.map((link) => {
                    if (link.type && user?.accountType !== link.type) return null;

                    const Icon = link.icon ? Icons[link.icon] : null;
                    const isOpen = openDropdown === link.id;

                    if (link.children) {
                      return (
                        <div key={link.id}>
                          <button
                            onClick={() => setOpenDropdown(isOpen ? null : link.id)}
                            className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm font-medium text-richblack-300 hover:bg-richblack-700"
                          >
                            <div className="flex items-center gap-3">
                              {Icon && <Icon />}
                              {link.name}
                            </div>
                            <VscChevronDown className={`${isOpen ? "rotate-180" : ""}`} />
                          </button>

                          {isOpen &&
                            link.children.map((child) => (
                              <Link
                                key={child.id}
                                to={child.path}
                                onClick={() => setMobileOpen(false)}
                                className="ml-8 flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-richblack-400 hover:bg-richblack-700"
                              >
                                {child.icon && Icons[child.icon] && React.createElement(Icons[child.icon])}
                                {child.name}
                              </Link>
                            ))}
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={link.id}
                        to={link.path}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-richblack-300 hover:bg-richblack-700"
                      >
                        {Icon && <Icon />}
                        {link.name}
                      </Link>
                    );
                  })}

                  {/* Settings */}
                  <Link
                    to="/dashboard/settings"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-richblack-300 hover:bg-richblack-700"
                  >
                    <VscSettingsGear />
                    Settings
                  </Link>
                </>
              )}
            </div>

            {/* Bottom Section */}
            <div>
              <div className="my-4 h-[1px] bg-richblack-600"></div>

              {token ? (
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Are you sure?",
                      text2: "You will be logged out.",
                      btn1Text: "Logout",
                      btn2Text: "Cancel",
                      btn1Handler: () => {
                        dispatch(logout(navigate));
                        setConfirmationModal(null);
                        setMobileOpen(false);
                      },
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-richblack-300 hover:bg-richblack-700"
                >
                  <VscSignOut />
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link to="/login">
                    <button 
                    onClick={() => setMobileOpen(false)}
                    className="w-full rounded-md border border-richblack-700 bg-richblack-800 py-2 text-sm text-richblack-100 hover:bg-richblack-700">
                      Log in
                    </button>
                  </Link>

                  <Link to="/signup">
                    <button
                    onClick={() => setMobileOpen(false)}
                    className="w-full rounded-md bg-yellow-50 py-2 text-sm font-medium text-richblack-900 hover:bg-yellow-100">
                      Sign up
                    </button>
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </>
  );
}

export default Navbar;
