import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/api";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);

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
    <header className="sticky top-0 z-50 border-b border-richblack-700 bg-richblack-900">
      <div className="mx-auto flex h-14 w-11/12 max-w-maxContent items-center justify-between">

        {/* ===== Logo ===== */}
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            width={160}
            height={42}
            className="object-contain"
          />
        </Link>

        {/* ===== Nav Links ===== */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-x-6 text-sm font-medium text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative flex cursor-pointer items-center gap-1 group">
                    <p className="transition hover:text-yellow-50">
                      {link.title}
                    </p>
                    <MdKeyboardArrowDown className="text-lg" />

                    {/* Dropdown */}
                    <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      
                      {/* Arrow */}
                      <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-richblack-5" />

                      {subLinks.length ? (
                        subLinks.map((subLink) => (
                          <Link
                            key={subLink._id}
                            to={`/catalog/${subLink.name}`}
                            className="block rounded-md px-2 py-2 text-sm transition hover:bg-richblack-50"
                          >
                            {subLink.name}
                          </Link>
                        ))
                      ) : (
                        <p className="text-sm text-richblack-400">
                          Loading...
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p
                      className={`transition ${
                        matchRoute(link.path)
                          ? "text-yellow-50"
                          : "text-richblack-25 hover:text-yellow-50"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* ===== Auth / Cart ===== */}
        <div className="flex items-center gap-x-4">

          {/* Cart */}
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-25 transition hover:text-yellow-50" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-50 text-xs font-bold text-richblack-900">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* Auth Buttons */}
          {token === null && (
            <>
              <Link to="/login">
                <button className="rounded-md border border-richblack-700 bg-richblack-800 px-3 py-1.5 text-sm text-richblack-100 transition hover:bg-richblack-700">
                  Log in
                </button>
              </Link>

              <Link to="/signup">
                <button className="rounded-md border border-richblack-700 bg-richblack-800 px-3 py-1.5 text-sm text-richblack-100 transition hover:bg-richblack-700">
                  Sign up
                </button>
              </Link>
            </>
          )}

          {/* Profile */}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
