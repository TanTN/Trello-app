import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Column, InitialState, Task } from "../../type";
import ColumnItem from "../../component/componentItemBoards/ColumItem";
import { DndContext,DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { v4 as uuidv4 } from "uuid";

import { BiSolidChevronRight, BiChevronLeft } from "react-icons/bi";

import { AiOutlinePlus,AiOutlineClose } from "react-icons/ai"

import ListBoardLeft from "../../component/componentItemBoards/listBoardLeft";
import { addColumn, sortColumns, sortTasks } from "../../store/reducer";
import TaskItem from "../../component/componentItemBoards/taskItem";

const ItemBoards = () => {
    const { boardId } = useParams();
    const dispatch = useDispatch()
    const listBoard = useSelector((state: { workspace: InitialState }) =>
    state.workspace.boardContainers
    );
    const taskContainer = useSelector((state: { workspace: InitialState }) => 
        state.workspace.taskContainers
    )
    
    const [activeColumn, setActiveColumn] = useState<Column | null>(null)
    const [activeTask, setActiveTask] = useState<Task | null>(null)
    const [isShowCreateColumn, setIsShowCreateColumn] = useState(false)
    const [titleBoard, setTitlesBoard] = useState<string>('')

    
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

    if (listColumnCurrent.length < 1) {
        setIsShowCreateColumn(true)
    }

    const listColumId = listColumnCurrent.map(column => column.id)

    const showListWorkspace = () => {
        setIsShowListBoard(!isShowListBoard);
    };

    const handleAddBoard = () => {
        if (titleBoard) {
            const newBoard = {
                id: uuidv4(),
                boardId : boardId as string,
                title: titleBoard
            }
            dispatch(addColumn(newBoard));
            setTitlesBoard("")
        }
    }

    const sensor = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 3 },
        })
    );

    const onDragStart = (event : any) => {
        
        setActiveColumn(null)
        setActiveTask(null)
        const { active } = event;
        
        if (active.data.current.type === "column") {
            return setActiveColumn(event.active.data.current.column);
            
        }
        if (active.data.current.type === "task")
            return setActiveTask(event.active.data.current.task)
    }

    const onDragOver = (event: any) => {
        const { active, over } = event;
        if (!over) return
        const activeId = active.id
        const overId = over.id
        const activeTaskIndex = taskContainer.findIndex(task => task.id === activeId);
        const overTaskIndex = taskContainer.findIndex(task => task.id === overId)
        if (active.data.current.type === "task" && over.data.current.type === "task") {
            const taskContainerCopy = [...taskContainer]
            taskContainerCopy[activeTaskIndex].columnId = taskContainerCopy[overTaskIndex].columnId
            dispatch(sortTasks(arrayMove([...taskContainer],activeTaskIndex,overTaskIndex)))
        }
    }

    const onDragEnd = (event: any) => { 
        const { active, over } = event;
        if (!over) return
        const activeId = active.id
        const overId = over.id

        const activeColumnIndex = listColumns.findIndex(column => column.id === activeId);
        const overColumnIndex = listColumns.findIndex(column => column.id === overId)
        if (active.data.current.type === "column" && over.data.current.type === "column")
        dispatch(sortColumns(arrayMove([...listColumns], activeColumnIndex, overColumnIndex)))
    }
    return (
        <div
            className={`${itemBoard?.backgroundColor} flex relative bg-fix max-h-full w-full min-h-screen pt-[48px] overflow-y-hidden`}
        >
            show workspace left
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
                <div
                    className="group/item relative w-[16px] bg-bgColor"
                    onClick={showListWorkspace}
                >
                    <div className="group/edit bg-bgColor z-20 cursor-pointer group-hover/item:bg-[#7a7a7abe] hover:bg-[#7a7a7abe] absolute top-[15px] right-[-12px] flex justify-center items-center text-textColor w-[24px] h-[24px] rounded-[50%] border-[1px] border-[#555]"
                    >
                        <BiSolidChevronRight />
                    </div>
                </div>
            )}

            {/* list column right */}
            <div className="flex-1 relative">
                <div className="py-[15px] px-[22px] text-lg font-medium bg-[#0000003d] text-white w-full">
                    {itemBoard?.title}
                </div>

                <div className="absolute flex gap-[10px] top-[58px] z-[200] max-h-full">
                    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} sensors={sensor}>
                        <SortableContext items={listColumId}>
                            <div className="flex gap-[10px] mt-[10px] ml-[10px]">
                                {listColumnCurrent.map((column) => (
                                    <ColumnItem key={column.id} column={column} taskContainer={taskContainer} />
                                ))}
                            </div>
                        </SortableContext>
                        <DragOverlay>
                            
                            {activeColumn && (
                                <ColumnItem column={activeColumn} taskContainer={taskContainer} rotate/>
                            )}
                            {activeTask && (
                                <TaskItem task={activeTask} rotate/>
                            )}
                        </DragOverlay>
                    </DndContext>

                    {/* create column */}
                    <div className="transition-all relative mt-[10px] w-[272px] h-[48px] mr-[10px]"
                        
                        >
                        <div className={`${isShowCreateColumn ? "opacity-0" : "opacity-100"} flex items-center w-full h-full bg-[#ffffff42] rounded-[8px] gap-1 pl-[20px] cursor-pointer text-white text-sm hover:bg-[#70707070]`} onClick={() => setIsShowCreateColumn(true)}>
                            <AiOutlinePlus />
                            <p>Add a list</p>
                        </div>
                        <div className={`w-[272px] ${isShowCreateColumn ? "h-[88px] p-[10px] opacity-100" : "h-0 opacity-0"} absolute top-0 left-0 transition-all bg-bgColor rounded-[10px]`}>
                        
                        {/*show form create column */}
                        {isShowCreateColumn && 
                        <>
                                <input type="text" className="outline-none border-[2px] border-[#0189f8] rounded-[3px] bg-background-box px-[6px] py-[4px] text-sm w-full" autoFocus
                                    value={titleBoard}
                                    onChange={(e) => setTitlesBoard(e.target.value.trimStart())}
                                
                                />
                            <div className="flex items-center gap-2 mt-[8px]">
                                    <button className="w-[73px] h-[32px] bg-create-button-background hover:bg-create-button-background-hovered text-black text-sm rounded-[4px]"
                                    onClick={handleAddBoard}
                                    >
                                    Add list
                                </button>
                                    <div className="text-[20px] cursor-pointer" onClick={(e) => {
                                        e.stopPropagation()
                                        setIsShowCreateColumn(false)
                                        setTitlesBoard('')
                                    }}>
                                        <AiOutlineClose />
                                </div>
                            </div>
                        </>
                        }
                    </div> 
                    </div>
                    
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
