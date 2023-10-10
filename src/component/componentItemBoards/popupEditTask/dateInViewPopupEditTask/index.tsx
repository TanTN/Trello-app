import { LegacyRef } from "react";

import { FiChevronDown } from "react-icons/fi";
import {BsCheck} from "react-icons/bs"

import { Dates } from '../../../../type'
import Date from '../date'

interface Prop {
    dates : Dates
    dateCurrent :  number
    dueDate : number
    dueSoon : number
    idTask :string | undefined
    isShowPopupDateInView : boolean
    handleCloseDatePopup : () => void
    handleCompleteDate: () => void
    handleIsShowDate: (isShowDate:boolean) => void
    dateViewElementRef: LegacyRef<HTMLDivElement>
    dateViewRef: LegacyRef<HTMLDivElement>
}

const DateInViewPopupEditTask = (prop :Prop) => {
    const {
        dates,
        dateCurrent,
        dueDate,
        dueSoon,
        idTask,
        isShowPopupDateInView,
        handleCloseDatePopup,
        handleCompleteDate,
        handleIsShowDate,
        dateViewElementRef,
        dateViewRef
    } = prop

    return dates?.isShow && (
        <div className="">
            <div>
                <p className="text-[12px] pb-[10px]">
                    Due date
                </p>
                <div className="flex gap-2 items-center">

                    {/* check date complete */}
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
                        
                    {/* date view */}
                    <div className="relative">
                        <div
                            ref={dateViewElementRef}
                            className="flex items-center rounded-[3px] gap-1 cursor-pointer px-[10px] py-[6px] bg-background-box hover:bg-background-box-hover"
                            onClick={() => handleIsShowDate(true)}
                        >
                            {/* date */}
                            <div className="text-[14px]">
                                {dates?.day}{" "}
                                {dates?.monthWord}{" "}
                                {dates?.year}
                            </div>

                            {/* status date */}
                            {dates.dateComplete ? (
                                <p className="px-[3px] bg-color-date-completed rounded-sm text-[12px] text-black">
                                    Completed
                                </p>
                            ) : 
                            dueDate < dateCurrent ? (
                                <p className="px-[3px] bg-color-date-overdue rounded-sm text-[12px] text-black">
                                    Overdue
                                </p>
                            ) : 
                            dateCurrent <= dueDate && dueDate <= dueSoon ? (
                                <p className="px-[3px] bg-color-date-dueSoon rounded-sm text-[12px] text-black">
                                    Due soon
                                </p>
                            ) : (
                                <></>
                            )}

                            {/* icon down */}
                            <FiChevronDown />
                        </div>

                        {/* show select date */}
                        {isShowPopupDateInView &&
                            <div className="absolute z-10 top-[125%] left-0 bg-background-box"
                            ref={dateViewRef}
                            >
                            <Date
                            dates={dates}
                            idTask={idTask}
                            handleCloseDatePopup={handleCloseDatePopup}/>
                            </div>}
                    </div>
                        
                </div>
            </div>
        </div>
    )
}

export default DateInViewPopupEditTask