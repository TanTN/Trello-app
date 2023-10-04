import { Board } from '../../../type';
import {useState} from 'react'
import { BiSolidChevronRight, BiChevronLeft } from "react-icons/bi";
import ContentLeftItemBoard from './contentLeftItemBoard';

interface Prop {
    listBoard: Board[]
    showLeft: (isShowLeft: boolean) => void
}
const LefBarItemBoard = (prop: Prop) => {
    const {listBoard,showLeft} = prop
    const [isShowListBoard, setIsShowListBoard] = useState<boolean>(false);
    const showListBoard = () => {
        setIsShowListBoard(!isShowListBoard);
        showLeft(!isShowListBoard)
    };

  return (
      <>
          <nav
                className={`relative ${
                    isShowListBoard ? "w-[260px]" : "w-[0px]"
                } bg-bgColor transition-all duration-[.2s] ease-in-out`}
            >
                {isShowListBoard && (
                    <>
                        <div className="flex items-center gap-2 h-[57px] w-full px-[8px] py-[12px]">
                            <div className="flex justify-center items-center text-xl rounded-[5px] font-medium text-black w-[32px] h-[32px] backgroundColorName">
                                T
                            </div>
                            <div>
                                <p className="text-[14px] font-medium">
                                    Trello Workspace
                                </p>
                                <p className="text-[12px]">Free</p>
                            </div>
                        </div>
                        <ContentLeftItemBoard listBoard={listBoard} />

                        {/* icon hidden */}
                        <div
                            className="absolute flex justify-center items-center text-[20px] cursor-pointer top-[15px] right-[15px] hover:bg-background-box-hover w-[28px] h-[28px]"
                            onClick={showListBoard}
                        >
                            <BiChevronLeft />
                        </div>
                    </>
                )}
            </nav>
            {/* hidden list workspace */}
            {!isShowListBoard && (
                <div
                    className="group/item relative w-[16px] bg-bgColor"
                    onClick={showListBoard}
                >
                    <div className="group/edit bg-bgColor z-20 cursor-pointer group-hover/item:bg-[#7a7a7abe] hover:bg-[#7a7a7abe] absolute top-[19px] right-[-12px] flex justify-center items-center text-textColor w-[24px] h-[24px] rounded-[50%] border-[1px] border-[#555]">
                        <BiSolidChevronRight />
                    </div>
                </div>
            )}
    </>
  )
}

export default LefBarItemBoard