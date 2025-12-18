import React, { useState } from 'react'
import { HomePageExplore } from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to Coding",
    "Most popular",
    "Skill paths",
    "Career paths"
];

function ExploreMore() {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((courses) => courses.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    return (
        <div className="my-16 px-4 sm:px-6 lg:px-12">
            {/* Heading */}
            <div className='text-4xl font-semibold text-center'>
                Unlock the <HighlightText text={"Power Of Code"} />
            </div>
            <p className='text-center text-richblack-300 mt-3 text-[16px]'>
                Learn to Build Anything You Can Imagine
            </p>

            {/* Tabs */}
            <div className='flex flex-wrap justify-center gap-3 mt-8 mb-8'>
                {tabsName.map((element, index) => (
                    <div
                        key={index}
                        className={`text-[16px] flex items-center gap-2 rounded-full px-6 py-2 cursor-pointer transition-all duration-200
                            ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium" : "bg-richblack-800 text-richblack-200 hover:bg-richblack-900 hover:text-richblack-5"}
                        `}
                        onClick={() => setMyCards(element)}
                    >
                        {element}
                    </div>
                ))}
            </div>

            {/* Course Cards */}
            <div className='overflow-x-auto'>
                <div className='flex gap-6 justify-center w-max mx-auto py-4'>
                    {courses.map((element, index) => (
                        <CourseCard
                            key={index}
                            cardData={element}
                            currentCard={currentCard}
                            setCurrentCard={setCurrentCard}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ExploreMore;
