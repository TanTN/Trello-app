import React from "react";
import { useSelector } from "react-redux";

import { BsTrello } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";

import { InitialState } from "../../type";
import WorkspaceItem from "../../component/workspaceItem";
import CreateWorkspace from "../../component/createWorkspace";

const ListBoards = () => {
    const listWorkspace = useSelector(
        (state: { workspace: InitialState }) => state.workspace.listWorkspace
    );

    return (
        <div className="grid grid-cols-12 gap-[40px] mt-[40px] w-[1118px] mx-auto">
            <nav className="col-span-3">
                <div className="flex items-center cursor-pointer gap-3 px-[10px] py-[8px] rounded-[5px] text-sm text-[#579dff] bg-[#092957]">
                    <BsTrello />
                    <p>Board</p>
                </div>
            </nav>
            <section className="col-span-9 py-[12px]">
                {/* starred boards */}
                <div>
                    <div className="flex items-center gap-[10px] my-[20px]">
                        <div className="text-[25px]">
                            <AiOutlineStar />
                        </div>
                        <div className="text-base font-semibold">
                            Starred boards
                        </div>
                    </div>
                    <div className="grid gap-[10px] grid-cols-4">
                        {listWorkspace.map((workspace, index) => {
                            if (workspace.isStar) {
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
                    <div className="grid gap-[10px] grid-cols-4">
                        {listWorkspace.map((workspace, index) => (
                            <WorkspaceItem key={index} workspace={workspace} />
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
    );
};

export default ListBoards;
