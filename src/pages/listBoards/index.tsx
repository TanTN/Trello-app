import React from "react";
import { useSelector } from "react-redux";

import { AiOutlineStar } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";

import { InitialState } from "../../type";
import WorkspaceItem from "../../component/componentListBoards/workspaceItem";
import CreateWorkspace from "../../component/componentListBoards/createWorkspace";
import LeftBar from "../../layout/leftbar";

const ListBoards = () => {

    const boardContainers = useSelector(
        (state: { workspace: InitialState }) => state.workspace.boardContainers
    );
    const historyViewedList = useSelector(
        (state: { workspace: InitialState }) => state.workspace.historyViewed
    );
    let count = 0

    return (
        <div className=" bg-bgColor min-h-screen">
            <div className="grid grid-cols-12 gap-[40px] pt-[84px] w-[1118px] mx-auto">
                {/* leftbar */}
                <nav className="sticky top-[84px] h-[var(--height-leftbar)] overflow-y-hidden col-span-3">
                    <LeftBar />
                </nav>

                <section className="col-span-9 py-[12px] overflow-y-auto">
                    {/* starred boards */}
                    <div>
                        <div className="flex items-center gap-[10px] my-[20px]">
                            <div className="text-[30px] ml-[-2px]">
                                <AiOutlineStar />
                            </div>
                            <div className="text-base font-semibold">
                                Starred boards
                            </div>
                        </div>
                        <div className="grid gap-x-[10px] gap-y-[35px] grid-cols-4">
                            {boardContainers.map((board, index) => {
                                if (board.isStar) {
                                    return (
                                        <WorkspaceItem
                                            key={index}
                                            star
                                            board={board}
                                        />
                                    );
                                }
                            })}
                        </div>
                    </div>

                    {/* history viewed */}
                    <div>
                        <div className="flex items-center gap-[10px] my-[20px]">
                            <div className="text-[23px]">
                                <BsClockHistory />
                            </div>
                            <div className="text-base font-semibold">
                                Recently viewed
                            </div>
                        </div>
                        <div className="grid gap-x-[13px] grid-cols-4">
                            {historyViewedList.map((board, index) => {
                                if (!board.isStar) { 

                                    if (count < 4) {
                                        count++
                                        return (
                                            <WorkspaceItem
                                                key={index}
                                                board={board}
                                            />
                                        );
                                    }
                                }
                            })}
                        </div>
                    </div>

                    {/* your workspace */}
                    <div>
                        <h2 className="my-[20px]">YOUR WORKSPACES</h2>
                        <div className="grid gap-x-[13px] gap-y-[35px] grid-cols-4">
                            {boardContainers.map((board, index) => (
                                <WorkspaceItem
                                    key={index}
                                    board={board}
                                />
                            ))}
                            <CreateWorkspace>
                                <div className="flex items-center h-[127px] w-full cursor-pointer justify-center rounded-md transition-all bg-background-box hover:bg-background-box-hover">
                                    Create new board
                                </div>
                            </CreateWorkspace>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ListBoards;
