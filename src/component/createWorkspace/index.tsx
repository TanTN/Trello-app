import React, { ReactElement, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { v4 as uuidv4 } from "uuid";

import { AiOutlineCheck } from "react-icons/ai";
import { RiMoreFill } from "react-icons/ri";

import { listImages } from "../../assets";
import { useDispatch } from "react-redux";
import { addWorkspace } from "../../store/reducer";
import { useNavigate } from "react-router-dom";

const CreateWorkspace = ({ children }: { children: ReactElement }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [backgroundImg, setBackgroundImg] = useState<string | null>(
        listImages[0]
    );
    const [backgroundColor, setBackgroundColor] = useState<string | null>("");
    const [bgImgActiveIndex, setBgImgActiveIndex] = useState<number | null>(0);
    const [bgColorActiveIndex, setBgColorActiveIndex] = useState<number | null>(
        null
    );
    const [title, setTitle] = useState<string>("");

    const listColor: string[] = [
        "color1",
        "color2",
        "color3",
        "color4",
        "color5",
    ];

    const createWorkspace = () => {
        if (title) {
            const id = uuidv4()
            if (bgImgActiveIndex) {
                dispatch(
                    addWorkspace({
                        id,
                        title,
                        isStar: false,
                        backgroundImg,
                    })
                );
            } else {
                dispatch(
                    addWorkspace({
                        id,
                        title,
                        isStar: false,
                        backgroundColor,
                    })
                );
            }
            navigate(`itemBoard/${id}`)
        }
    };
    return (
        <Tippy
            placement="right-end"
            interactive
            delay={[100, 0]}
            trigger="mousedown"
            render={(attrs) => (
                <div
                    className="w-[304px] bg-[#282e33] rounded-[8px]"
                    tabIndex={1}
                    {...attrs}
                >
                    <p className="text-center h-[40px] leading-[40px]">
                        Create board
                    </p>
                    <div className="px-[12px] pb-[12px]">
                        
                        {/* background active */}
                        <div
                            className={`${backgroundColor} mb-[8px] w-[200px] h-[128px] mx-auto bg-cover rounded-[4px]`}
                        >
                            {(bgImgActiveIndex || bgImgActiveIndex == 0) && (
                                <img
                                    src={backgroundImg ?? ""}
                                    className="w-full h-full"
                                />
                            )}
                        </div>

                        <p className="mt-[12px] mb-[4px] text-sm font-medium">
                            Background
                        </p>

                        {/* Set image */}
                        <div className="grid grid-cols-4 gap-x-2 mb-[8px]">
                            {listImages.map((image, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setBackgroundImg(image);
                                        setBgImgActiveIndex(index);
                                        setBgColorActiveIndex(null);
                                    }}
                                    className="relative w-full h-[40px]"
                                >
                                    <img
                                        src={image}
                                        alt="anhBg"
                                        className="rounded-[5px] cursor-pointer object-cover w-full h-full"
                                    />
                                    {bgImgActiveIndex == index && (
                                        <div className="absolute cursor-pointer top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[#ffffff]">
                                            <AiOutlineCheck />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* set color */}
                        <div className="grid grid-cols-6 gap-1">
                            {listColor.map((color, index) => (
                                <div
                                    key={index}
                                    className={`${color} relative cursor-pointer w-full h-[40px] rounded-[5px]`}
                                    onClick={() => {
                                        setBackgroundColor(color);
                                        setBgColorActiveIndex(index);
                                        setBgImgActiveIndex(null);
                                    }}
                                >
                                    {bgColorActiveIndex === index && (
                                        <div className="absolute cursor-pointer top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[#ffffff]">
                                            <AiOutlineCheck />
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="flex items-center justify-center bg-background-box rounded-[5px]">
                                <RiMoreFill />
                            </div>
                        </div>

                        {/* set title */}
                        <div className="mt-[12px] ">
                            <label
                                htmlFor="inputTitle"
                                className="mb-[4px] text-sm font-medium"
                            >
                                Board title{" "}
                                <span className="text-[#fa1e00]">*</span>
                            </label>
                            <input
                                id="inputTitle"
                                value={title}
                                type="text"
                                className={`w-full text-base outline-none border-[2px] ${
                                    title
                                        ? "border-[#0189f8]"
                                        : "border-[#ff4517]"
                                } text-textColor bg-[#222728] px-[10px] py-[6px] rounded-md`}
                                autoFocus
                                onChange={(e) =>
                                    setTitle(e.target.value.trim())
                                }
                            />
                        </div>

                            {/* create workspace */}
                        <button
                            className={`w-full bg-background-box py-[8px] mt-[15px] rounded-md ${
                                title
                                    ? "cursor-pointer hover:bg-background-box-hover"
                                    : "cursor-not-allowed hover:bg-background-box"
                            }`}
                            onClick={createWorkspace}
                        >
                            Create
                        </button>
                    </div>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
};

export default CreateWorkspace;
