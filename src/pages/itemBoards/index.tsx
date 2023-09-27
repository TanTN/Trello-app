import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { InitialState } from "../../type";
import ColumnContainer from "../../component/columnContainer";

const ItemBoards = () => {
    const { workspaceId } = useParams();
    const listColumns = useSelector(
        (state: { workspace: InitialState }) => state.workspace.columnContainers
    );
    const workspace = useSelector((state: { workspace: InitialState }) =>
        state.workspace.listWorkspace.find(
            (workspace) => workspace.id == workspaceId
        )
    );
    const listColumnCurrent = listColumns.filter(
        (column) => column.workspaceId == workspaceId
  );

  const backgroundImg = workspace?.backgroundImg
    return (
        <div
            className={`bg-[url(${backgroundImg})] bg-fix w-full min-h-screen`}
        >
            <div className="pt-[108px]">
              {listColumnCurrent.map((column) => (
                  <ColumnContainer key={column.id} column={column} />
              ))}
        </div>
        <img src={workspace?.backgroundImg ?? ""} alt="" className="fixed top-0 right-0 left-0 bottom-0 z-[-1]" />
        </div>
    );
};

export default ItemBoards;
