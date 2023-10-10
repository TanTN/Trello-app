import { LegacyRef } from 'react'

import { FiChevronDown,FiChevronUp } from "react-icons/fi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import { Task } from '../../../../type'
import Tiny from '../tiny'


interface Prop {
    toggleShowContent : boolean
    taskCurrent : Task
    handleToggleShowContent : () => void
    isShowFullContent : boolean
    buttonShowFullContentRef : LegacyRef<HTMLDivElement>
    handelShowAllContent : () => void
    contentElement: LegacyRef<HTMLDivElement>
}
const ContentTask = (prop : Prop) => {
    const {
        toggleShowContent,
        taskCurrent,
        handleToggleShowContent,
        isShowFullContent,
        buttonShowFullContentRef,
        handelShowAllContent,
        contentElement
    } = prop
    
    return (
        <div className="flex-1 relative pl-[16px]">
            <div className="ml-[40px] py-[8px] pl-[12px] text-[18px] font-medium">
                <p>Description</p>
        
                <div className="mt-[10px]">
                    {toggleShowContent ? (
                    
                        // edit content
                        <Tiny
                            taskCurrent={taskCurrent}
                            handleToggleShowContent={handleToggleShowContent}
                        />
                    ) : 
                        
                                
                    <>
                        {!isShowFullContent ?
                            
                            // content normal
                            <>
                                <div
                                onClick={handleToggleShowContent}
                                ref={contentElement}
                                className="whitespace-pre-wrap break-words w-[488px] cursor-pointer max-h-[500px] overflow-y-hidden"
                                ></div>
                                <div
                                    ref={buttonShowFullContentRef}
                                    className="hidden items-center justify-center gap-1 py-[8px] cursor-pointer mt-[10px] rounded-[4px] bg-background-box hover:bg-background-box-hover"
                                    onClick={handelShowAllContent}
                                >
                                    <FiChevronDown />
                                    <p className="text-[14px]">Show more</p>
                                </div>
                            </>
                        :
                            // content full
                            <>
                                <div
                                onClick={handleToggleShowContent}
                                ref={contentElement}
                                className="whitespace-pre-wrap break-words w-[488px] cursor-pointer max-h-[500px] overflow-y-hidden"
                                ></div>
                                <div
                                    ref={buttonShowFullContentRef}
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
                
            {/* icon */}
            <div className="absolute top-[10px] left-[26px] text-[26px]">
                <HiOutlineMenuAlt2 />
            </div>
        </div>
    )
}

export default ContentTask