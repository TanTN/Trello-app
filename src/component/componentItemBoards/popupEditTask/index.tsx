import React, { useRef, useEffect, useState } from "react";
import { AiFillCreditCard, AiOutlineClose } from "react-icons/ai";
import { TiEyeOutline } from "react-icons/Ti";

import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoMdTime } from "react-icons/io";
import Tiny from "./tiny";
import { useDispatch, useSelector } from "react-redux";
import { changeTitleTask, setDateComplete, setIdTaskEdit } from "../../../store/reducer";
import { InitialState, Task } from "../../../type";
import Date from "./date";
import dayjs from 'dayjs';


const PopupEditTask = () => {
    const textareaElementRef = useRef<HTMLTextAreaElement | null>(null);
    const contentElement = useRef<HTMLDivElement>(null)

    const dispatch = useDispatch()
    const idTask = useSelector((state: { workspace: InitialState }) => state.workspace.editTask.id)
    const taskContainer = useSelector((state: { workspace: InitialState }) => state.workspace.taskContainers)
    const taskCurrent = taskContainer.find(task => task.id === idTask) as Task
    const dates = taskCurrent?.dates
    const [toggleShowContent, setToggleShowContent] = useState<boolean>(false)
    const [titleTask, setTitleTask] = useState(taskCurrent?.title)
    const [isShowDate, setIsShowDate] = useState<boolean>(false)

    const dateCurrent = dayjs(`${dayjs().year()}-${dayjs().month()}-${dayjs().date()}`).minute(+dayjs().minute()).hour(+dayjs().hour()).valueOf()
    const dueSoon = dayjs(`${dayjs().year()}-${dayjs().month()}-${dayjs().date() + 1}`).minute(+dayjs().minute()).hour(+dayjs().hour()).valueOf()
    const dueDate = dates && dayjs(`${dates.year}-${dates.month}-${dates.day}`).minute(+dates.minute).hour(+dates.hour).valueOf()
    
    useEffect(() => {
        const textarea = textareaElementRef?.current as HTMLTextAreaElement
        const content = contentElement.current as HTMLDivElement
        textarea.style.height = textarea.scrollHeight + "px";
        if (!toggleShowContent && taskCurrent.content) {
            content.innerHTML = taskCurrent?.content as string
        }
        if (!toggleShowContent && !taskCurrent.content){
            content.innerHTML = "<div class='h-[70px] text-[14px] px-[12px] py-[8px] bg-background-box hover:bg-background-box-hover cursor-pointer rounded-[4px]'>Add a more detailed description...</div>"
        }
    },[taskCurrent.content,toggleShowContent]);

    const handleIsShowDate = () => {
        setIsShowDate(!isShowDate)
    }
    
    const handleCompleteDate = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target
        if (checked) {
            dispatch(setDateComplete({id: taskCurrent.id, dateComplete: true}))
        } else {
            dispatch(setDateComplete({id: taskCurrent.id, dateComplete: false}))
        }
    }
    const resizeTextarea = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const target = e.target as HTMLElement;
        target.style.height = "0";
        target.style.height = target.scrollHeight + "px";
    };
    useEffect(() => {
        return () => {
            dispatch(setIdTaskEdit(undefined))
        }
    },[])

    const closeEdit = () => {
        dispatch(setIdTaskEdit(undefined))
    }

    const handleChangeTitleCard = () => {
        dispatch(changeTitleTask({id:idTask as string,title:titleTask as string}))
    }
    const isShowContent = () => {
        setToggleShowContent(!toggleShowContent)
    }


    return (
        <div className="fixed flex top-0 left-0 right-0 bottom-0 z-[100] overflow-y-auto min-w-[700px] py-[50px]">
            <div className="m-auto h-full w-[768px] bg-[#323940] rounded-[14px] pb-[30px]">
                <div className="mx-[56px] my-[8px]">
                    <div className="relative pt-[12px]">
                        <textarea
                            className="bg-[#323940] relative h-0 text-[17px] leading-[18px] font-medium overflow-y-hidden break-words whitespace-pre-wrap px-[10px] py-[7px] w-full border-[2px] border-transparent focus:border-[2px] focus:border-border-input-color focus:bg-bgColor focus:outline-none resize-none rounded-[6px]"
                            ref={textareaElementRef}
                            onInput={resizeTextarea}
                            onBlur={handleChangeTitleCard}
                            onChange={e => setTitleTask(e.target.value)}
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
                                <p className="text-[12px] pb-[10px]">Notifications</p>
                                <div className="flex gap-1 items-center cursor-pointer px-[10px] py-[6px] bg-background-box hover:bg-background-box-hover">
                                    <div className="text-[20px]"><TiEyeOutline /></div>
                                    <p className="text-[14px]">Watch</p>
                                </div>
                            </div>

                             {dates?.isShow && <div className="">
                                <div className="">
                                    <p className="text-[12px] pb-[10px]">Due date</p>
                                    <div className="flex items-center gap-1 cursor-pointer px-[10px] py-[6px] bg-background-box hover:bg-background-box-hover">
                                        <input type="checkbox" className=" checked:bg-create-button-background checked:text-white" onChange={e => handleCompleteDate(e)}/>
                                        <div className="text-[14px]">
                                        {dates?.day} {dates?.monthWord} {dates?.year}
                                        </div>
                                        {dates.dateComplete ?
                                            <p className="px-[3px] bg-color-date-completed rounded-sm text-[12px] text-black">Completed</p>
                                            :
                                            dueDate < dateCurrent ? <p className="px-[3px] bg-color-date-overdue rounded-sm text-[12px] text-black">Overdue</p>
                                            :
                                            dateCurrent < dueDate && dueDate < dueSoon
                                                    ? <p className="px-[3px] bg-color-date-dueSoon rounded-sm text-[12px] text-black">Due soon</p>
                                                    : <p></p>
                                        }
                                    </div>
                                </div>
                            </div>}
                        </div>
                        
                        <div className="absolute top-[16px] left-[-28px] text-[22px]">
                            <AiFillCreditCard />
                        </div>


                        <div className="flex m-auto absolute rounded-[3px] cursor-pointer top-[16px] right-[-28px] text-[18px] w-[25px] h-[25px] hover:bg-background-box-hover"
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
                                
                                {toggleShowContent ?
                                    <Tiny taskCurrent={taskCurrent} isShowContent={isShowContent} />
                                    :
                                    <div onClick={isShowContent}
                                        ref={contentElement}
                                        className="whitespace-pre-wrap break-words w-[488px]"
                                    ></div>
                                }
                                
                        </div>
                        </div>
                        <div className="absolute top-[10px] left-[26px] text-[26px]">
                            <HiOutlineMenuAlt2 />
                        </div>
                        
                    </div>
                    <div className="w-[192px] pr-[16px]">
                            <p className="text-sm">Add to card</p>
                        <Date handleIsShowDate={handleIsShowDate} idTask={idTask} isShowDate={isShowDate}>
                            <div
                            className="flex gap-1 items-center mt-[8px] px-[12px] text-[14px] font-medium py-[6px] cursor-pointer bg-background-box hover:bg-background-box-hover rounded-[4px]"
                                onClick={handleIsShowDate}
                            >
                                    <div>
                                        <IoMdTime />
                                    </div>
                                    <p>Dates</p>
                            </div>
                        </Date>
                    </div>
                </div>
            </div>
            <div className="fixed top-0 left-0 right-0 bottom-0 z-[-3] w-ful h-full bg-[#030303a9]"></div>
        </div>
    );
};

export default PopupEditTask;
