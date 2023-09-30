import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Board, Column, InitialState, Task } from "../../type";
import ColumnItem from "../../component/componentItemBoards/ColumItem";
import {
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";



import { sortColumns, sortTasks } from "../../store/reducer";
import TaskItem from "../../component/componentItemBoards/taskItem";
import CreateColumn from "../../component/componentItemBoards/createColumn";
import LefBarItemBoard from "../../component/componentItemBoards/leftBarItemBoard";
import TitleBoard from "../../component/componentItemBoards/titleBoard";

const ItemBoards = () => {
    const { boardId } = useParams();
    const dispatch = useDispatch();
    const listBoard = useSelector(
        (state: { workspace: InitialState }) => state.workspace.boardContainers
    );
    const taskContainer = useSelector(
        (state: { workspace: InitialState }) => state.workspace.taskContainers
    );

    const [activeColumn, setActiveColumn] = useState<Column | null>(null);
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [idColumnAddCard, setColumnIdAddCard] = useState<string | null>("");

    const itemBoard = listBoard.find((board) => board.id == boardId) as Board;
    const listColumns = useSelector(
        (state: { workspace: InitialState }) => state.workspace.columnContainers
    );


    const listColumnCurrent = listColumns.filter(
        (column) => column.boardId == boardId
    );

    const listColumId = listColumnCurrent.map((column) => column.id);

    const handleSetIdColumnAddCard = (id: string | null) => {
        if (idColumnAddCard === id) {
            setColumnIdAddCard(null);
        } else {
            setColumnIdAddCard(id);
        }
    };


    const sensor = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 3 },
        })
    );

    const onDragStart = (event: any) => {
        setActiveColumn(null);
        setActiveTask(null);
        const { active } = event;

        if (active.data.current.type === "column") {
            return setActiveColumn(event.active.data.current.column);
        }
        if (active.data.current.type === "task")
            return setActiveTask(event.active.data.current.task);
    };

    const onDragOver = (event: any) => {
        const { active, over } = event;
        if (!over) return;
        const activeId = active.id;
        const overId = over.id;
        const activeTaskIndex = taskContainer.findIndex(
            (task) => task.id === activeId
        );
        const overTaskIndex = taskContainer.findIndex(
            (task) => task.id === overId
        );
        if (
            active.data.current.type === "task" &&
            over.data.current.type === "task"
        ) {
            const taskContainerCopy = [...taskContainer];
            taskContainerCopy[activeTaskIndex].columnId =
                taskContainerCopy[overTaskIndex].columnId;
            dispatch(
                sortTasks(
                    arrayMove(
                        [...taskContainer],
                        activeTaskIndex,
                        overTaskIndex
                    )
                )
            );
        }
    };

    const onDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over) return;
        const activeId = active.id;
        const overId = over.id;

        const activeColumnIndex = listColumns.findIndex(
            (column) => column.id === activeId
        );
        const overColumnIndex = listColumns.findIndex(
            (column) => column.id === overId
        );
        if (
            active.data.current.type === "column" &&
            over.data.current.type === "column"
        )
            dispatch(
                sortColumns(
                    arrayMove(
                        [...listColumns],
                        activeColumnIndex,
                        overColumnIndex
                    )
                )
            );
    };
    return (
        <div
            className={`${itemBoard?.backgroundColor} flex relative bg-fix max-h-full w-full min-h-screen pt-[48px] overflow-y-hidden`}
        >

            {/* left Bar */}
            <LefBarItemBoard listBoard={listBoard}/>
            

            {/* list column right */}
            <div className="flex-1 relative">

                {/* title board */}
                <TitleBoard itemBoard={itemBoard} />
                

                <div className="absolute flex items-start gap-[10px] top-[58px] z-[3] max-h-full">
                    <DndContext
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                        sensors={sensor}
                    >
                        <SortableContext items={listColumId}>
                            <div className="flex gap-[10px] mt-[10px] ml-[10px]">
                                {listColumnCurrent.map((column) => (
                                    <ColumnItem
                                        key={column.id}
                                        column={column}
                                        taskContainer={taskContainer}
                                        idColumnAddCard={idColumnAddCard}
                                        handleSetIdColumnAddCard={
                                            handleSetIdColumnAddCard
                                        }
                                    />
                                ))}
                            </div>
                        </SortableContext>
                        <DragOverlay>
                            {activeColumn && (
                                <ColumnItem
                                    column={activeColumn}
                                    taskContainer={taskContainer}
                                    idColumnAddCard={idColumnAddCard}
                                    handleSetIdColumnAddCard={
                                        handleSetIdColumnAddCard
                                    }
                                    rotate
                                />
                            )}
                            {activeTask && (
                                <TaskItem task={activeTask} rotate />
                            )}
                        </DragOverlay>
                    </DndContext>

                    {/* create column */}
                    <CreateColumn
                        boardId={boardId}
                    />
                    
                </div>

                {/* background */}
                {itemBoard?.backgroundImg && (
                    <img
                        src={itemBoard?.backgroundImg ?? ""}
                        alt=""
                        className="fixed right-0 left-0 bottom-0 top-0 z-[-100] w-full h-full object-cover"
                    />
                )}
            </div>
        </div>
    );
};

export default ItemBoards;
