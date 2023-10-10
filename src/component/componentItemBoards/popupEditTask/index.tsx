import React, { useRef, useEffect, useState,useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import { TiEyeOutline } from "react-icons/ti";
import { IoMdTime } from "react-icons/io";
import {BsTrash} from "react-icons/bs"
import { AiFillCreditCard, AiOutlineClose } from "react-icons/ai";

import {
    changeTitleTask,
    deleteTask,
    setDateComplete,
    setIdTaskEdit,
} from "../../../store/reducer";
import { InitialState, Task } from "../../../type";
import Date from "./date";
import DateInViewPopupEditTask from "./dateInViewPopupEditTask";
import ContentTask from "./contentTask";

interface ShowDatePopup {
    popupDateInView: boolean;
    popupDateInRightBar: boolean;
}

const PopupEditTask = () => {
    const textareaElementRefTitle = useRef<HTMLTextAreaElement>(null);
    const contentElement = useRef<HTMLDivElement>(null);
    const dateViewElementRef = useRef<HTMLDivElement>(null);
    const dateLeftBarElementRef = useRef<HTMLDivElement>(null);
    const dateViewRef = useRef<HTMLDivElement>(null);
    const dateLeftBarRef = useRef<HTMLDivElement>(null);
    const buttonShowFullContentRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();
    const idTask = useSelector(
        (state: { workspace: InitialState }) => state.workspace.editTask.id
    );
    const taskContainer = useSelector(
        (state: { workspace: InitialState }) => state.workspace.taskContainers
    );
        
    const taskCurrent = useMemo(() => taskContainer.find((task) => task.id === idTask) as Task,[taskContainer]);
    const dates = taskCurrent?.dates;

    const [toggleShowContent, setToggleShowContent] = useState<boolean>(false);
    const [titleTask, setTitleTask] = useState(taskCurrent?.title);
    const [isShowDatePopup, setIsShowDatePopup] = useState<ShowDatePopup>({
        popupDateInView: false,
        popupDateInRightBar: false,
    });
    const [isShowFullContent, setShowAllContent] = useState<boolean>(false)

    useEffect(() => {
        const handleCloseDate = (e: globalThis.MouseEvent) => {
            const target = e.target as HTMLElement;
            const dateElement = document.querySelector(".ant-picker-dropdown")
            
            const isClickDateView = dateViewElementRef.current?.contains(target)
            const isClickDateLeftBar = dateLeftBarElementRef.current?.contains(target)
            const clickDateViewRef = dateViewRef.current?.contains(target)
            const clickDateLeftBarRef = dateLeftBarRef.current?.contains(target)
            const selectDate = dateElement?.contains(target)

            // handle when click out popup of date
            if (!isClickDateView && !isClickDateLeftBar && !clickDateViewRef && !clickDateLeftBarRef && !selectDate) {
                setIsShowDatePopup({popupDateInView: false,popupDateInRightBar: false})
            }
        }
        document.addEventListener("mousedown", handleCloseDate)
        return () => document.removeEventListener("mousedown", handleCloseDate)
    },[])

    
    useEffect(() => {
        const textarea = textareaElementRefTitle?.current as HTMLTextAreaElement;
        const content = contentElement.current as HTMLDivElement;
        const buttonShowContent = buttonShowFullContentRef.current as HTMLDivElement
        textarea.style.height = textarea.scrollHeight + "px";

        // show when have the content task  
        if (!toggleShowContent && taskCurrent.content) {
            content.innerHTML = taskCurrent?.content as string;
        }

        // show when have not the content task  
        if (!toggleShowContent && !taskCurrent.content) {
            content.innerHTML =
                "<div class='h-[70px] text-[14px] px-[12px] py-[8px] bg-background-box hover:bg-background-box-hover cursor-pointer rounded-[4px]'>Add a more detailed description...</div>";
        }

        // visible when have the size content task greater than 500px
        if (content?.clientHeight >= 500) {
            buttonShowContent.style.display = "flex"
        }
    }, [taskCurrent.content, toggleShowContent]);

    // reset id task id when closed
    useEffect(() => {
        return () => {
            dispatch(setIdTaskEdit(undefined));
        };
    }, []);

    // time current
    const dateCurrent = dayjs(
        `${dayjs().year()}-${dayjs().month()}-${dayjs().date()}`
    )
        .minute(+dayjs().minute())
        .hour(+dayjs().hour())
        .valueOf();

    // due soon away 1 day
    const dueSoon = dayjs(
        `${dayjs().year()}-${dayjs().month()}-${dayjs().date() + 1}`
    )
        .minute(+dayjs().minute())
        .hour(+dayjs().hour())
        .valueOf();

    // due date
    const dueDate =
        dates &&
        dayjs(`${dates.year}-${dates.month}-${dates.day}`)
            .minute(+dates.minute)
            .hour(+dates.hour)
            .valueOf();

    // handel delete task
    const handleDeleteTask = () => {
        dispatch(deleteTask(idTask as string));
    }

    // handle show popup date
    const handleIsShowDate = (inView?: boolean) => {

        if (inView) {

            // handle show popup date in view
            if (isShowDatePopup.popupDateInView) {
                return handleCloseDatePopup()
            }
            setIsShowDatePopup({popupDateInView: true,popupDateInRightBar: false});
        } else {

            // handle show popup date in right bar 
            if (isShowDatePopup.popupDateInRightBar) {
                return handleCloseDatePopup()
            }
            setIsShowDatePopup({popupDateInView: false,popupDateInRightBar: true});
            
        }
    };

    // handle visible button show more and show less content task
    const handelShowAllContent = () => {
        const content = contentElement.current as HTMLDivElement;
        
        if (content.clientHeight > 500) {

            // visible show more
            content.style.maxHeight = "500px"
            setShowAllContent(false)
        } else {

            // visible show less
            content.style.maxHeight = "none"
            setShowAllContent(true)
        }

    }

    // handle close date popup
    const handleCloseDatePopup = () => {
        setIsShowDatePopup({popupDateInView: false,popupDateInRightBar: false})
    }

    // handle date complete
    const handleCompleteDate = () => {
        dispatch(
            setDateComplete({
                id: taskCurrent.id,
                dateComplete: !dates.dateComplete,
            })
        );
    };

    // resize input content task
    const resizeTextarea = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const target = e.target as HTMLElement;
        target.style.height = "0";
        target.style.height = target.scrollHeight + "px";
    };

    // close edit task
    const closeEdit = () => {
        dispatch(setIdTaskEdit(undefined));
    };

    // edit title task
    const handleChangeTitleCard = () => {
        dispatch(
            changeTitleTask({
                id: idTask as string,
                title: titleTask as string,
            })
        );

    };

    // handle show content
    const handleToggleShowContent = () => {
        setToggleShowContent(!toggleShowContent);
    };

    return (
        <div className="fixed flex top-0 left-0 right-0 bottom-0 z-[100] overflow-y-auto py-[50px]">
            <div className="m-auto min-h-full w-[768px] bg-[#323940] rounded-[14px] pb-[30px]">
                <div className="mx-[56px] my-[8px]">
                    <div className="relative pt-[12px]">

                        {/* edit title task */}
                        <textarea
                            className="bg-[#323940] relative h-0 text-[17px] leading-[18px] font-medium overflow-y-hidden break-words whitespace-pre-wrap px-[10px] py-[7px] w-full border-[2px] border-transparent focus:border-[2px] focus:border-border-input-color focus:bg-bgColor focus:outline-none resize-none rounded-[6px]"
                            ref={textareaElementRefTitle}
                            onInput={resizeTextarea}
                            onBlur={handleChangeTitleCard}
                            onChange={(e) => setTitleTask(e.target.value)}
                            value={titleTask}
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

                            {/* view date */}
                            <DateInViewPopupEditTask 
                                dates={dates} 
                                dateCurrent={dateCurrent} 
                                dueDate={dueDate} 
                                dueSoon={dueSoon} 
                                isShowPopupDateInView={isShowDatePopup.popupDateInView}
                                idTask={idTask}
                                handleCloseDatePopup={handleCloseDatePopup}
                                handleCompleteDate={handleCompleteDate}
                                handleIsShowDate={handleIsShowDate}
                                dateViewElementRef={dateViewElementRef}
                                dateViewRef={dateViewRef}
                            />
                            
                        </div>

                        <div className="absolute top-[16px] left-[-28px] text-[22px]">
                            <AiFillCreditCard />
                        </div>

                        {/*button close edit task */}
                        <div
                            className="flex m-auto absolute rounded-[3px] cursor-pointer top-[16px] right-[-28px] text-[18px] w-[25px] h-[25px] hover:bg-background-box-hover"
                            onClick={closeEdit}
                        >
                            <AiOutlineClose className="m-auto" />
                        </div>
                    </div>
                </div>

                
                <div className="flex gap-[20px] justify-between">
                    
                    {/* content task */}
                    <ContentTask 
                        toggleShowContent={toggleShowContent}
                        taskCurrent={taskCurrent}
                        handleToggleShowContent={handleToggleShowContent}
                        isShowFullContent={isShowFullContent}
                        buttonShowFullContentRef={buttonShowFullContentRef}
                        handelShowAllContent={handelShowAllContent}
                        contentElement={contentElement}
                    />

                    {/* right bar edit task */}
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

                            {/* show popup date */}
                            {isShowDatePopup.popupDateInRightBar &&
                                <div className="absolute top-[125%] left-0 bg-background-box"
                                    ref={dateLeftBarRef}
                                >
                                <Date
                                idTask={idTask}
                                dates={dates}
                                handleCloseDatePopup={handleCloseDatePopup}/>
                            </div>}
                        </div>

                        {/* delete task */}
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

            {/* background out side popup task */}
            <div className="fixed top-0 left-0 right-0 bottom-0 z-[-3] w-ful h-full bg-[#030303a9]"
            onClick={closeEdit}
            ></div>
        </div>
    );
};

export default PopupEditTask;
