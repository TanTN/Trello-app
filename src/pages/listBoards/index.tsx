import React from "react";
import { useSelector } from "react-redux";

import { AiOutlineStar } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";

import { InitialState } from "../../type";
import WorkspaceItem from "../../component/workspaceItem";
import CreateWorkspace from "../../component/createWorkspace";
import LeftBar from "../../layout/leftbar";

const ListBoards = () => {
    const listWorkspace = useSelector(
        (state: { workspace: InitialState }) => state.workspace.listWorkspace
    );
    const historyViewedList = useSelector(
        (state: { workspace: InitialState }) => state.workspace.historyViewed
    );

    return (
        <div className=" bg-bgColor min-h-screen">
            <div className="grid grid-cols-12 gap-[40px] pt-[84px] w-[1118px] mx-auto">
                {/* leftbar */}
                <nav className="sticky top-[80px] h-[var(--height-leftbar)] overflow-y-hidden col-span-3">
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
                            {listWorkspace.map((workspace, index) => {
                                if (workspace.isStar) {
                                    return (
                                        <WorkspaceItem
                                            key={index}
                                            star
                                            workspace={workspace}
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
                            {historyViewedList.map((workspace, index) => {
                                if (index < 4 && !workspace.isStar) {
                                    return (
                                        <WorkspaceItem
                                            key={index}
                                            workspace={workspace}
                                        />
                                    );
                                }
                            })}
                        </div>
                    </div>

                    {/* your workspace */}
                    <div>
                        <h2 className="my-[20px]">YOUR WORKSPACES</h2>
                        <div className="grid gap-x-[13px] gap-y-[35px] grid-cols-4">
                            {listWorkspace.map((workspace, index) => (
                                <WorkspaceItem
                                    key={index}
                                    workspace={workspace}
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
