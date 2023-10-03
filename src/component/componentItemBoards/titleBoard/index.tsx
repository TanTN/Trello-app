
import { changeTitleBoard } from '../../../store/reducer'
import { Board } from '../../../type'
import React, {useEffect, useRef, useState} from 'react'
import { useDispatch } from 'react-redux'


interface Prop {
    itemBoard: Board 
    isShowLeftBar: boolean
}
const TitleBoard = (prop: Prop) => {
    const { itemBoard,isShowLeftBar } = prop
    const dispatch = useDispatch()
    const [isShowInputChangeTitle, setIsShowInputChangeTitle] = useState<boolean>(false)
    const [titleBoard, setTitleBoard] = useState<string>(itemBoard.title)
    const textarea = useRef<HTMLDivElement>(null)

    const handleChangeTitleBoard = () => {

        if (titleBoard) {
            dispatch(changeTitleBoard({ id: itemBoard.id, title: titleBoard }))
            setIsShowInputChangeTitle(false)
        }
    } 
   
  
    const handleResizeTextarea = (e: React.FocusEvent<HTMLTextAreaElement, Element> | React.ChangeEvent<HTMLTextAreaElement>) => {

            e.target.style.width = 0 + "px"
            e.target.style.width = e.target.scrollWidth + 8 + "px"

    }
    useEffect(() => {
        if (itemBoard) {
            setTitleBoard(itemBoard.title)
        }
    },[itemBoard])
    
    return (
        
                    <div  className=" py-[15px] px-[22px] text-lg font-medium bg-[#0000003d] text-white w-full">
                {!isShowInputChangeTitle ?
              
                    
                        <div className='h-[32px]'>
                            <div className='hiddenLineLong1 inline-block h-[32px] hover:bg-[#d6d6d63f] rounded-[4px] px-[8px] border-[1px] border-transparent ml-[8px] cursor-pointer'
                                onClick={() => {
                                    setIsShowInputChangeTitle(true)
                                }}
                                ref={textarea}
                            >
                                {itemBoard?.title}
                            </div>
                        </div>
                     :
                            <div className='h-[32px]'>
                                <textarea
                                    
                                    className={`h-[32px] ${isShowLeftBar ? "max-w-[var(--width-textarea-titleBoard-noShowLeft)] " : "max-w-[var(--width-textarea-titleBoard-showLeft)]"} overflow-hidden whitespace-nowrap break-normal bg-[#353535a9] outline-none rounded-[4px] border-[1px] border-transparent resize-none focus:border-border-input-color px-[8px] ml-[8px]`}
                                    value={titleBoard}
                                    onChange={(e) => {
                                        handleResizeTextarea(e)
                                        setTitleBoard(e.target.value.trimStart())
                                    }}
                                    onFocus={(e) => handleResizeTextarea(e)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleChangeTitleBoard()
                                        }
                                    }}
                                    onBlur={handleChangeTitleBoard}
                                    autoFocus
                              
                                    />
                            </div>
                        }
                        
                </div>
        
      )

  
}

export default TitleBoard