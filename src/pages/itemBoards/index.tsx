import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { InitialState } from "../../type";
import ColumnContainer from "../../component/componentItemBoards/columnContainer";

import { BiChevronLeft } from "react-icons/bi";
import { BiSolidChevronRight } from "react-icons/bi";
import ListBoardLeft from "../../component/componentItemBoards/listBoardLeft";

const ItemBoards = () => {
    const { boardId } = useParams();
    const listBoard = useSelector((state: { workspace: InitialState }) =>
    state.workspace.boardContainers
    );

    const itemBoard = listBoard.find(
        (board) => board.id == boardId
    );
    const listColumns = useSelector(
        (state: { workspace: InitialState }) => state.workspace.columnContainers
    );
    const [isShowListBoard, setIsShowListBoard] =
        useState<boolean>(false);

    const listColumnCurrent = listColumns.filter(
        (column) => column.boardId == boardId
    );

    const showListWorkspace = () => {
        setIsShowListBoard(!isShowListBoard);
    };
    return (
        <div
            className={`${itemBoard?.backgroundColor} flex relative bg-fix w-full min-h-screen pt-[48px]`}
        >
            {/* show workspace left */}
            <nav
                className={`relative ${
                    isShowListBoard ? "w-[260px]" : "w-[0px]"
                } bg-bgColor transition-all duration-[.2s] ease-in-out`}
            >
                {isShowListBoard &&  
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
                        <ListBoardLeft listBoard={listBoard} />
    
                    {/* icon hidden */}
                    <div
                        className="absolute flex justify-center items-center text-[20px] cursor-pointer top-[15px] right-[15px] hover:bg-background-box-hover w-[28px] h-[28px]"
                        onClick={showListWorkspace}
                    >
                        <BiChevronLeft />
                    </div>
                </>
                }
            </nav>
            {/* hidden list workspace */}
            {!isShowListBoard && (
                <nav
                    className="group/item relative w-[16px] bg-bgColor"
                    onClick={showListWorkspace}
                >
                    <div className="group/edit bg-bgColor cursor-pointer group-hover/item:bg-[#7a7a7abe] absolute top-[15px] right-[-12px] flex justify-center items-center text-textColor w-[24px] h-[24px] rounded-[50%] border-[1px] border-[#555]">
                        <BiSolidChevronRight />
                    </div>
                </nav>
            )}

            {/* list column right */}
            <div className="flex-1">
                <div className="py-[15px] px-[22px] text-lg font-medium bg-[#0000003d] text-white w-full">
                    {itemBoard?.title}
                </div>
                <div className="pt-[108px]">
                    {listColumnCurrent.map((column) => (
                        <ColumnContainer key={column.id} column={column} />
                    ))}
                </div>

                {/* background */}
                {itemBoard?.backgroundImg && (
                    <img
                        src={itemBoard?.backgroundImg ?? ""}
                        alt=""
                        className="fixed right-0 left-0 bottom-0 top-0 z-[-1] w-full h-full object-cover"
                    />
                )}
            </div>
        </div>
    );
};

export default ItemBoards;
