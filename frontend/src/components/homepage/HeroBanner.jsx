import { Icon } from "@iconify/react";
import { useState } from "react";

export const HeroBanner = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("English");

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    return (
        <div className="flex items-center justify-between bg-[#ECEEF1] py-2 px-4 w-full md:px-8">
            <div className="flex items-center cursor-pointer hover:underline hover:decoration-secondary-text-color ">
                <Icon
                    icon="material-symbols:stars-rounded"
                    color="#4222C4"
                    height="20"
                />
                <span className="text-xs md:text-sm lg:text-base text-secondary-text-color ml-2">
                    Sell on Platform
                </span>
            </div>

            <div className="flex text-sm md:text-base items-center font-mono">
                <span className="text-secondary-text-color ml-2 pt-1 cursor-pointer font-semibold">
                    Platform
                </span>
                <Icon icon="material-symbols:star" color="#4222C4" height="17" className="mt-1 ml-1" />
            </div>

            <div className="flex items-center">
                <select
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    className="bg-[#F1F1F2] text-sm md:text-base text-[#4222C4] py-1 px-3 rounded-md focus:outline-none cursor-pointer"
                >
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="Arabic">Arabic</option>
                </select>

            </div>
        </div>
    );
};
