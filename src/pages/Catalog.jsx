import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/api";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Coursecard from "../components/core/Catalog/Coursecard";

function Catalog() {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  // fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const normalize = (str) =>
        str.trim().toLowerCase().replace(/\s+/g, " ");

      const matchedCategory = res?.data?.AllCategories?.find(
        (ct) =>
          normalize(ct.name) ===
          normalize(catalogName.replace(/-/g, " "))
      );

      if (!matchedCategory) return;
      setCategoryId(matchedCategory._id);
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        setCatalogPageData(res);
      } catch (error) {
        console.log(error);
      }
    };

    if (categoryId) getCategoryDetails();
  }, [categoryId]);

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5">
      
      {/* ===== Header / Breadcrumb ===== */}
      <div className="mx-auto w-11/12 max-w-maxContent py-8">
        <p className="text-sm text-richblack-300">
          Home / Catalog /
          <span className="text-yellow-50 ml-1">
            {catalogPageData?.data?.selectedCategory?.name}
          </span>
        </p>

        <h1 className="mt-4 text-3xl font-bold">
          {catalogPageData?.data?.selectedCategory?.name}
        </h1>

        <p className="mt-2 max-w-3xl text-richblack-300">
          {catalogPageData?.data?.selectedCategory?.description}
        </p>
      </div>

      {/* ===== Content ===== */}
      <div className="mx-auto w-11/12 max-w-maxContent space-y-14 mb-12">

        {/* ===== Section 1 ===== */}
        <div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-semibold">
              Courses to get you started
            </h2>

            <div className="flex gap-6 text-sm font-medium text-richblack-300">
              <button className="text-yellow-50 border-b border-yellow-50 pb-1">
                Most Popular
              </button>
              <button className="hover:text-richblack-5 transition">
                New
              </button>
            </div>
          </div>

          <div className="mt-6">
            <CourseSlider
              courses={catalogPageData?.data?.selectedCategory?.courses}
            />
          </div>
        </div>

        {/* ===== Section 2 ===== */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Top Courses in{" "}
            <span className="text-yellow-50">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </h2>

          <CourseSlider
            courses={
              catalogPageData?.data?.differentCategory?.[0]?.courses
            }
          />
        </div>

        {/* ===== Section 3 ===== */}
        <div>
          <h2 className="text-2xl font-semibold mb-8">
            Frequently Bought
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {catalogPageData?.data?.topSellingCourses
              ?.slice(0, 4)
              .map((course, index) => (
                <Coursecard
                  key={index}
                  course={course}
                  Height={"h-[400px]"}
                />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Catalog;
