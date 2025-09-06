import React from 'react'
import CTAButton from './Button'
import { TypeAnimation } from 'react-type-animation'

function CodeBlocks({ position, heading, subheading, ctabtn1, ctabtn2, codeblock, codeColor }) {
    return (
        <div
            className={`flex flex-col lg:flex-row ${position} my-20 justify-between gap-36`}
        >
            {/* section 1 */}
            <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[50%] flex flex-col gap-6">
                {heading}

                <div className="text-richblack-300 font-bold">
                    {subheading}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 mt-7">
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className="flex gap-2 items-center">
                            {ctabtn1.text}
                        </div>
                    </CTAButton>

                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        <div className="flex gap-2 items-center">
                            {ctabtn2.text}
                        </div>
                    </CTAButton>
                </div>
            </div>

            {/* section 2 */}
            <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[50%] h-fit flex flex-row py-4 rounded-md shadow-md bg-richblack-800">
                {/* line numbers */}
                <div className="w-[10%] text-center flex flex-col text-richblack-400 font-inter font-bold text-xs sm:text-sm">
                    {Array.from({ length: 13 }, (_, i) => (
                        <p key={i}>{i + 1}</p>
                    ))}
                </div>

                {/* code block */}
                <div
                    className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 text-xs sm:text-sm`}
                >
                    <TypeAnimation
                        sequence={[codeblock, 1000, ""]}
                        repeat={Infinity}
                        style={{ whiteSpace: "pre-line", display: "block" }}
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default CodeBlocks
