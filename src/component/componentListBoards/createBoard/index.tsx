import { ReactElement, useState,useEffect } from "react";
import Tippy from "@tippyjs/react/headless";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import { AiOutlineCheck } from "react-icons/ai";
// import { RiMoreFill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";

import { listImages } from "../../../assets";
import { useDispatch } from "react-redux";
import { addBoard, addBoardInHistory } from "../../../store/reducer";

const CreateBoard = ({ children, offsetButtonHeader }: { children: ReactElement;  offsetButtonHeader? :boolean}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [backgroundImg, setBackgroundImg] = useState<string | null>(
        listImages[0]
    );
    const [backgroundColor, setBackgroundColor] = useState<string | null>("");
    const [bgImgActiveIndex, setBgImgActiveIndex] = useState<number>(0);
    const [bgColorActiveIndex, setBgColorActiveIndex] = useState<number>(
        -1
    );
    const [title, setTitle] = useState<string>("");
    const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsMobile(true)
        }
        const resizeWebView = () => {
            if (window.innerWidth < 768) {
                setIsMobile(true)
            }
        }
        window.addEventListener("resize", resizeWebView)
        return () => window.removeEventListener("resize",resizeWebView)
    },[])

    // class visible background color
    const listColor: string[] = [
        "color1",
        "color2",
        "color3",
        "color4",
        "color5",
    ];

    const handleAddBoard = () => {
        if (title) {
            const id = uuidv4();
            if (bgColorActiveIndex >= 0) {

                // have background color
                const newBoard = {
                    id,
                    title,
                    isStar: false,
                    backgroundColor,

                }
                dispatch(
                    addBoard(newBoard)
                );
                dispatch(addBoardInHistory(newBoard))

            } else {

                // have background image
                const newBoard = {
                    id,
                    title,
                    isStar: false,
                    backgroundImg,
                }
                dispatch(
                    addBoard(newBoard)
                );
                dispatch(addBoardInHistory(newBoard))

            }
            navigate(`itemBoard/${id}`);
        }
    };
    console.log(offsetButtonHeader)
    return (
        <Tippy
        delay={[100, 0]}
        zIndex={1000}
        placement={offsetButtonHeader ? "bottom-end" : isMobile ? "top-end" : "right-end" }
        offset={offsetButtonHeader ? [0,10] : isMobile ? [0, -140] : [0,10]}
        interactive
        visible={isShowPopup}
        onClickOutside={() => setIsShowPopup(false)}

        render={(attrs) => (
            <div
                className="relative w-[304px] bg-[#282e33] rounded-[8px]"
                tabIndex={-1}
                {...attrs}
            >
                <p className="text-center h-[40px] leading-[40px]">
                    Create board
                </p>
                <div className="px-[12px] pb-[12px]">
                    {/* background active */}
                    <div
                        className={`${backgroundColor} color1 mb-[8px] w-[200px] h-[128px] mx-auto bg-cover rounded-[4px]`}
                    >
                        {backgroundImg && (
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
                                    setBgColorActiveIndex(-1);
                                    setBackgroundColor(null)
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
                    <div className="grid grid-cols-5 gap-1">
                        {listColor.map((color, index) => (
                            <div
                                key={index}
                                className={`${color} relative cursor-pointer w-full h-[40px] rounded-[5px]`}
                                onClick={() => {
                                    setBackgroundColor(color);
                                    setBgColorActiveIndex(index);
                                    setBgImgActiveIndex(-1);
                                    setBackgroundImg(null)
                                }}
                            >
                                {bgColorActiveIndex === index && (
                                    <div className="absolute cursor-pointer top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[#ffffff]">
                                        <AiOutlineCheck />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* more background */}
                        {/* <div className="flex items-center justify-center bg-background-box rounded-[5px]">
                            <RiMoreFill />
                        </div> */}
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
                                    ? "border-border-input-color"
                                    : "border-[#ff4517]"
                            } text-textColor bg-[#222728] px-[10px] py-[6px] rounded-md`}
                            autoFocus
                            onChange={(e) =>
                                setTitle(e.target.value.trimStart())
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
                        onClick={handleAddBoard}
                    >
                        Create
                    </button>
                </div>
                <div className="absolute top-[10px] right-[10px] p-[5px] bg-background-box hover:bg-background-box-hover rounded-[4px] cursor-pointer"
                    onClick={() => {
                        setIsShowPopup(false)
                        setTitle("")
                    }
                }
                >
                    <AiOutlineClose />
                </div>
            </div>
        )}
            
        >
            <div onClick={() => setIsShowPopup(true)}>
                {children}
            </div>
        </Tippy>
    );
};

export default CreateBoard;
