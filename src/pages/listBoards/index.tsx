import React from "react";
import { useSelector } from "react-redux";
import { InitialState } from "../../type";
import WorkspaceItem from "../../component/workspaceItem";
const ListBoards = () => {
    const listWorkspace = useSelector(
        (state: { workspace: InitialState }) => state.workspace.listWorkspace
    );
    return (
        <div className="grid grid-cols-11 gap-[30px] mt-[40px] w-[1118px] mx-auto">
            <nav className="col-span-3">nav</nav>
            <section className="col-span-8 py-[12px]">
                <h2 className="my-[20px]">YOUR WORKSPACES</h2>
                <div className="grid gap-[10px] grid-cols-4">
                    {listWorkspace.map((workspace, index) => (
                        <WorkspaceItem key={index} workspace={workspace} />
                    ))}
                    <a href="#" className="flex items-center justify-center rounded-md transition-all bg-background-box hover:bg-background-box-hover">
                            Create new board
                    </a>
                </div>
            </section>
        </div>
    );
};

export default ListBoards;
