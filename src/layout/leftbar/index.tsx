import React from "react";
import { BsTrello } from "react-icons/bs";

const LeftBar = () => {
    return (
        
            <div className="flex items-center cursor-pointer gap-3 px-[10px] py-[8px] rounded-[5px] text-sm text-[#579dff] bg-[#092957]">
                <BsTrello />
                <p>Board</p>
            </div>
        
    );
};

export default LeftBar;
