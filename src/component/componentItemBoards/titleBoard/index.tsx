import { changeTitleBoard } from '../../../store/reducer'
import { Board } from '../../../type'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

interface Prop {
    itemBoard: Board 
}
const TitleBoard = (prop: Prop) => {
    const { itemBoard } = prop
    const dispatch = useDispatch()
    const [isShowInputChangeTitle, setIsShowInputChangeTitle] = useState<boolean>(false)
    const [titleBoard, setTitleBoard] = useState<string>(itemBoard.title )
    const titleElement = useRef<HTMLDivElement>(null)
    const handleChangeTitleBoard = () => {
        if (titleBoard) {
            dispatch(changeTitleBoard({ id: itemBoard.id, title: titleBoard }))
            setIsShowInputChangeTitle(false)
        }
    } 
  return !isShowInputChangeTitle ?
      <div className="py-[15px] px-[22px] text-lg font-medium bg-[#0000003d] text-white w-full "
      
      >
          <div className='inline-block hover:bg-[#d6d6d63f] rounded-[4px] px-[8px] border-[1px] border-transparent ml-[8px] cursor-pointer'
              onClick={() => {
                    console.log(titleElement.current)
                  setIsShowInputChangeTitle(true)
              }}
              ref={titleElement}
          >
              {itemBoard?.title}
          </div>
    </div > :
      <div className="py-[15px] px-[22px] text-lg font-medium bg-[#0000003d] text-textColor w-full">
          <input
              type="text"
              className='inline-block bg-[#353535a9] outline-none rounded-[4px] border-[1px] border-border-input-color px-[8px] ml-[8px] min-w-[100px]'
              value={titleBoard}
              onChange={(e) => setTitleBoard(e.target.value.trimStart())}
              onKeyDown={(e) => {
                  if (e.key === "Enter") {
                      handleChangeTitleBoard()
                  }
              }}
              onBlur={handleChangeTitleBoard}
              autoFocus
              contentEditable={true}
          />
      </div>

  
}

export default TitleBoard