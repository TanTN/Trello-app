import React, { useRef, useEffect, useState } from "react";
import { AiFillCreditCard, AiOutlineClose } from "react-icons/ai";
import { TiEyeOutline } from "react-icons/ti";
import { BsCheck } from "react-icons/bs";

import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoMdTime } from "react-icons/io";
import { FiChevronDown,FiChevronUp } from "react-icons/fi";
import {BsTrash} from "react-icons/bs"
import Tiny from "./tiny";
import { useDispatch, useSelector } from "react-redux";
import {
    changeTitleTask,
    deleteTask,
    setDateComplete,
    setIdTaskEdit,
} from "../../../store/reducer";
import { InitialState, Task } from "../../../type";

import dayjs from "dayjs";
import Date from "./date";

interface ShowDatePopup {
    popupView: boolean;
    popupRightBar: boolean;
}

const PopupEditTask = () => {
    const textareaElementRefTitle = useRef<HTMLTextAreaElement>(null);
    const contentElement = useRef<HTMLDivElement>(null);
    const dateViewElementRef = useRef<HTMLDivElement>(null);
    const dateLeftBarElementRef = useRef<HTMLDivElement>(null);
    const dateViewRef = useRef<HTMLDivElement>(null);
    const dateLeftBarRef = useRef<HTMLDivElement>(null);
    const buttonShowAllContentRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const idTask = useSelector(
        (state: { workspace: InitialState }) => state.workspace.editTask.id
    );
    const taskContainer = useSelector(
        (state: { workspace: InitialState }) => state.workspace.taskContainers
    );
    
    const taskCurrent = taskContainer.find(
        (task) => task.id === idTask
    ) as Task;
    const dates = taskCurrent?.dates;
    const [toggleShowContent, setToggleShowContent] = useState<boolean>(false);
    const [titleTask, setTitleTask] = useState(taskCurrent?.title);
    const [isShowDatePopup, setIsShowDatePopup] = useState<ShowDatePopup>({
        popupView: false,
        popupRightBar: false,
    });
    const [isShowAllContent, setShowAllContent] = useState<boolean>(false)

    useEffect(() => {
        const handleCloseDate = (e: globalThis.MouseEvent) => {
            const target = e.target as HTMLElement;
            const dateElement = document.querySelector(".ant-picker-dropdown")
            
            const isClickDateView = dateViewElementRef.current?.contains(target)
            const isClickDateLeftBar = dateLeftBarElementRef.current?.contains(target)
            const clickDateViewRef = dateViewRef.current?.contains(target)
            const clickDateLeftBarRef = dateLeftBarRef.current?.contains(target)
            const selectDate = dateElement?.contains(target)
 
            
            if (!isClickDateView && !isClickDateLeftBar && !clickDateViewRef && !clickDateLeftBarRef && !selectDate) {
                setIsShowDatePopup({popupView: false,popupRightBar: false})
            }
        }

        document.addEventListener("mousedown", handleCloseDate)
        return () => document.removeEventListener("mousedown", handleCloseDate)
    },[])

    const dateCurrent = dayjs(
        `${dayjs().year()}-${dayjs().month()}-${dayjs().date()}`
    )
        .minute(+dayjs().minute())
        .hour(+dayjs().hour())
        .valueOf();
    const dueSoon = dayjs(
        `${dayjs().year()}-${dayjs().month()}-${dayjs().date() + 1}`
    )
        .minute(+dayjs().minute())
        .hour(+dayjs().hour())
        .valueOf();
    const dueDate =
        dates &&
        dayjs(`${dates.year}-${dates.month}-${dates.day}`)
            .minute(+dates.minute)
            .hour(+dates.hour)
            .valueOf();

    useEffect(() => {
        const textarea = textareaElementRefTitle?.current as HTMLTextAreaElement;
        const content = contentElement.current as HTMLDivElement;
        const buttonShowContent = buttonShowAllContentRef.current as HTMLDivElement
        textarea.style.height = textarea.scrollHeight + "px";

        if (!toggleShowContent && taskCurrent.content) {
            content.innerHTML = taskCurrent?.content as string;
        }
        if (!toggleShowContent && !taskCurrent.content) {
            content.innerHTML =
                "<div class='h-[70px] text-[14px] px-[12px] py-[8px] bg-background-box hover:bg-background-box-hover cursor-pointer rounded-[4px]'>Add a more detailed description...</div>";
        }
        if (content?.clientHeight >= 500) {
            buttonShowContent.style.display = "flex"
        }
    }, [taskCurrent.content, toggleShowContent]);
    const handleDeleteTask = () => {
        dispatch(deleteTask(idTask as string));
    }
    const handleIsShowDate = (inView?: boolean) => {
        if (inView) {
            if (isShowDatePopup.popupView) {
                return handleCloseDatePopup()
            }
            setIsShowDatePopup({popupView: true,popupRightBar: false});
        } else {
            if (isShowDatePopup.popupRightBar) {
                return handleCloseDatePopup()
            }
            setIsShowDatePopup({popupView: false,popupRightBar: true});
            
        }
    };

    const handelShowAllContent = () => {
        const content = contentElement.current as HTMLDivElement;
        
        if (content.clientHeight > 500) {
            content.style.maxHeight = "500px"
            setShowAllContent(false)
        } else {
            content.style.maxHeight = "none"
            setShowAllContent(true)
        }

    }
    const handleCloseDatePopup = () => {
        setIsShowDatePopup({popupView: false,popupRightBar: false})
    }

    const handleCompleteDate = () => {
        dispatch(
            setDateComplete({
                id: taskCurrent.id,
                dateComplete: !dates.dateComplete,
            })
        );
    };
    const resizeTextarea = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const target = e.target as HTMLElement;
        target.style.height = "0";
        target.style.height = target.scrollHeight + "px";
    };
    useEffect(() => {
        return () => {
            dispatch(setIdTaskEdit(undefined));
        };
    }, []);

    const closeEdit = () => {
        dispatch(setIdTaskEdit(undefined));
    };

    const handleChangeTitleCard = () => {
        dispatch(
            changeTitleTask({
                id: idTask as string,
                title: titleTask as string,
            })
        );
    };
    const isShowContent = () => {
        setToggleShowContent(!toggleShowContent);
    };

    return (
        <div className="fixed flex top-0 left-0 right-0 bottom-0 z-[100] overflow-y-auto py-[50px]">
            <div className="m-auto min-h-full w-[768px] bg-[#323940] rounded-[14px] pb-[30px]">
                <div className="mx-[56px] my-[8px]">
                    <div className="relative pt-[12px]">
                        <textarea
                            className="bg-[#323940] relative h-0 text-[17px] leading-[18px] font-medium overflow-y-hidden break-words whitespace-pre-wrap px-[10px] py-[7px] w-full border-[2px] border-transparent focus:border-[2px] focus:border-border-input-color focus:bg-bgColor focus:outline-none resize-none rounded-[6px]"
                            ref={textareaElementRefTitle}
                            onInput={resizeTextarea}
                            onBlur={handleChangeTitleCard}
                            onChange={(e) => setTitleTask(e.target.value)}
                            value={titleTask}
                            onKeyDown={() => {
                                // if (e.key === "Enter") {
                                //     handleChangeTitleCard()
                                // }
                            }}
                        >
                            {titleTask}
                        </textarea>

                        <div className="flex items-start gap-4 m-[15px]">
                            <div className="inline-block">
                                <p className="text-[12px] pb-[10px]">
                                    Notifications
                                </p>
                                <div className="flex gap-1 items-center rounded-[3px] cursor-pointer px-[10px] py-[6px] bg-background-box hover:bg-background-box-hover">
                                    <div className="text-[20px]">
                                        <TiEyeOutline />
                                    </div>
                                    <p className="text-[14px]">Watch</p>
                                </div>
                            </div>

                            {dates?.isShow && (
                                <div className="">
                                    <div>
                                        <p className="text-[12px] pb-[10px]">
                                            Due date
                                        </p>
                                        <div className="flex gap-2 items-center">
                                            <div
                                                className={`${
                                                    dates?.dateComplete
                                                        ? "bg-create-button-background"
                                                        : " bg-bgColor"
                                                } transition-all duration-[.7s] flex justify-center items-center w-[16px] h-[16px] cursor-pointer`}
                                                onClick={handleCompleteDate}
                                            >
                                                {dates?.dateComplete && (
                                                    <div className="text-white">
                                                        <BsCheck />
                                                    </div>
                                                )}
                                            </div>
                                            

                                            
                                            <div className="relative">
                                                <div
                                                    ref={dateViewElementRef}
                                                    className="flex items-center rounded-[3px] gap-1 cursor-pointer px-[10px] py-[6px] bg-background-box hover:bg-background-box-hover"
                                                    onClick={() => handleIsShowDate(true)}
                                                >
                                                    <div className="text-[14px]">
                                                        {dates?.day}{" "}
                                                        {dates?.monthWord}{" "}
                                                        {dates?.year}
                                                    </div>
                                                    {dates.dateComplete ? (
                                                        <p className="px-[3px] bg-color-date-completed rounded-sm text-[12px] text-black">
                                                            Completed
                                                        </p>
                                                    ) : dueDate <
                                                      dateCurrent ? (
                                                        <p className="px-[3px] bg-color-date-overdue rounded-sm text-[12px] text-black">
                                                            Overdue
                                                        </p>
                                                    ) : dateCurrent < dueDate &&
                                                      dueDate < dueSoon ? (
                                                        <p className="px-[3px] bg-color-date-dueSoon rounded-sm text-[12px] text-black">
                                                            Due soon
                                                        </p>
                                                    ) : (
                                                        <p></p>
                                                    )}
                                                    <FiChevronDown />
                                                </div>
                                                {isShowDatePopup.popupView &&
                                                    <div className="absolute z-10 top-[125%] left-0 bg-background-box"
                                                    ref={dateViewRef}
                                                    >
                                                    <Date
                                                    idTask={idTask}
                                                    dates={dates}
                                                    handleCloseDatePopup={handleCloseDatePopup}/>
                                                    </div>}
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="absolute top-[16px] left-[-28px] text-[22px]">
                            <AiFillCreditCard />
                        </div>

                        <div
                            className="flex m-auto absolute rounded-[3px] cursor-pointer top-[16px] right-[-28px] text-[18px] w-[25px] h-[25px] hover:bg-background-box-hover"
                            onClick={closeEdit}
                        >
                            <AiOutlineClose className="m-auto" />
                        </div>
                    </div>
                </div>
                <div className="flex gap-[20px] justify-between">
                    <div className="flex-1 relative pl-[16px]">
                        <div className="ml-[40px] py-[8px] pl-[12px] text-[18px] font-medium">
                            <p>Description</p>

                            <div className="mt-[10px]">
                                {toggleShowContent ? (
                                    <Tiny
                                        taskCurrent={taskCurrent}
                                        isShowContent={isShowContent}
                                    />
                                ) : 
                                    
                                            
                                            <>
                                                {!isShowAllContent ?
                                                        <>
                                                            <div
                                                            onClick={isShowContent}
                                                            ref={contentElement}
                                                            className="whitespace-pre-wrap break-words w-[488px] cursor-pointer max-h-[500px] overflow-y-hidden"
                                                            ></div>
                                                            <div
                                                                ref={buttonShowAllContentRef}
                                                                className="hidden items-center justify-center gap-1 py-[8px] cursor-pointer mt-[10px] rounded-[4px] bg-background-box hover:bg-background-box-hover"
                                                                onClick={handelShowAllContent}
                                                            >
                                                                <FiChevronDown />
                                                                <p className="text-[14px]">Show more</p>
                                                            </div>
                                                        </>
                                                    :

                                                        <>
                                                            <div
                                                            onClick={isShowContent}
                                                            ref={contentElement}
                                                            className="whitespace-pre-wrap break-words w-[488px] cursor-pointer max-h-[500px] overflow-y-hidden"
                                                            ></div>
                                                            <div
                                                                ref={buttonShowAllContentRef}
                                                                className="hidden items-center justify-center gap-1 py-[8px] cursor-pointer mt-[10px] rounded-[4px] bg-background-box hover:bg-background-box-hover"
                                                                onClick={handelShowAllContent}
                                                            >
                                                                <FiChevronUp />
                                                                <p className="text-[14px]">Show less</p>
                                                            </div>
                                                        </>
                                                }
                                            </>
                                            }
                                    
                                
                            </div>
                        </div>
                        <div className="absolute top-[10px] left-[26px] text-[26px]">
                            <HiOutlineMenuAlt2 />
                        </div>
                    </div>

                    <div className=" w-[192px] pr-[16px]">
                        <p className="text-sm">Add to card</p>
                        
                        <div className="relative">
                            <div
                                ref={dateLeftBarElementRef}
                                className="flex relative gap-1 items-center mt-[8px] px-[12px] text-[14px] font-medium py-[6px] cursor-pointer bg-background-box hover:bg-background-box-hover rounded-[4px]"
                                onClick={() => handleIsShowDate()}
                            >
                                <div>
                                    <IoMdTime />
                                </div>
                                <p>Dates</p>
                            </div>
                            {isShowDatePopup.popupRightBar &&
                                <div className="absolute top-[125%] left-0 bg-background-box"
                                    ref={dateLeftBarRef}
                                >
                                <Date
                                idTask={idTask}
                                dates={dates}
                                handleCloseDatePopup={handleCloseDatePopup}/>
                            </div>}
                        </div>
                        <div
                        className="flex gap-1 items-center mt-[8px] px-[12px] text-[14px] font-medium py-[6px] cursor-pointer bg-background-box hover:bg-background-box-hover rounded-[4px]"
                        onClick={handleDeleteTask}
                        >
                            <div><BsTrash /></div>
                            <p>Delete</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed top-0 left-0 right-0 bottom-0 z-[-3] w-ful h-full bg-[#030303a9]"
            onClick={closeEdit}
            ></div>
        </div>
    );
};

export default PopupEditTask;
