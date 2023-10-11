import {  useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
    DndContext,
    // DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import { Board, Column, InitialState, Task } from "../../type";
import ColumnItem from "../../component/componentItemBoards/ColumItem";
import { sortColumns, sortTasks } from "../../store/reducer";
import TaskItem from "../../component/componentItemBoards/taskItem";
import CreateColumn from "../../component/componentItemBoards/createColumn";
import LefBarItemBoard from "../../component/componentItemBoards/leftBarItemBoard";
import TitleBoard from "../../component/componentItemBoards/titleBoard";
import PopupEditTask from "../../component/componentItemBoards/popupEditTask";

const ItemBoards = () => {
    const { boardId } = useParams();
    const dispatch = useDispatch();
    const listBoard = useSelector(
        (state: { workspace: InitialState }) => state.workspace.boardContainers
    );
    const taskContainer = useSelector(
        (state: { workspace: InitialState }) => state.workspace.taskContainers
    );
    const idTaskEdit = useSelector(
        (state: { workspace: InitialState }) => state.workspace.editTask.id
    )
    const listColumns = useSelector(
        (state: { workspace: InitialState }) => state.workspace.columnContainers
    );


    const [activeColumn, setActiveColumn] = useState<Column | null>(null);
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [idColumnAddCard, setColumnIdAddCard] = useState<string | null>("");
    const [isShowLeftBar,setIsShowLeftBar] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsMobile(true)
        }
        const resizeWebView = () => {
            if (window.innerWidth < 768) {
                setIsMobile(true)
            }
        }
        window.addEventListener("resize", resizeWebView)
        return () => window.removeEventListener("resize",resizeWebView)
    },[])

    const itemBoard = useMemo(() => listBoard.find((board) => board.id == boardId) as Board ,[listBoard, boardId]);

    const listColumnCurrent = useMemo(() => listColumns.filter(
        (column) => column.boardId == boardId
    ),[listColumns]);

    const listColumId = useMemo(() => listColumnCurrent.map((column) => column.id), [listColumnCurrent]);
    
    // handle show left bar board item
    const showLeft = (isShowLeft: boolean) => {
        setIsShowLeftBar(isShowLeft);
    }
    // id colum show textarea create task
    const handleSetIdColumnAddCard = (id: string | null) => {
        if (idColumnAddCard === id) {
            setColumnIdAddCard(null);
        } else {
            setColumnIdAddCard(id);
        }
    };

    // handle drag and drop
    const sensor = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 3 },
        })
    );

    const onDragStart = (event: DragStartEvent) => {
        setActiveColumn(null);
        setActiveTask(null);
        const { active } = event;

        if (active.data.current?.type === "column") {
            return setActiveColumn(event.active.data.current?.column);
        }
        if (active.data.current?.type === "task")
            return setActiveTask(event.active.data.current?.task);
    };

    const onDragOver = (event: DragOverEvent) => {
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
        const activeColumnIndex = listColumns.findIndex(
            (column) => column.id === activeId
        );
        const overColumnIndex = listColumns.findIndex(
            (column) => column.id === overId
        );

        if (
            active.data.current?.type === "column" &&
            over.data.current?.type === "column"
        ) {

            dispatch(
                sortColumns(
                    arrayMove(
                        [...listColumns],
                        activeColumnIndex,
                        overColumnIndex
                    )
                )
            );
            return
        }
 
        if (
            active.data.current?.type === "task" &&
            over.data.current?.type === "task"
        ) {
            const taskContainerCopy = [...taskContainer];
            taskContainerCopy[activeTaskIndex] = {...taskContainerCopy[activeTaskIndex],columnId:taskContainerCopy[overTaskIndex].columnId}
            dispatch(
                sortTasks(
                    arrayMove(
                        [...taskContainerCopy],
                        activeTaskIndex,
                        overTaskIndex
                    )
                )
            );
            return
        }
        if (
            active.data.current?.type === "task" &&
            over.data.current?.type === "column"
        ) {
            const taskContainerCopy = [...taskContainer];
            taskContainerCopy[activeTaskIndex] = { ...taskContainerCopy[activeTaskIndex], columnId: overId as string }

            dispatch(
                sortTasks(
                    arrayMove(
                        [...taskContainerCopy],
                        activeTaskIndex,
                        activeTaskIndex
                    )
                )
            );
            return
        }
    };

    // const onDragEnd = (event: any) => {
    //     const { active, over } = event;
    //     if (!over) return;
    //     const activeId = active.id;
    //     const overId = over.id;

    //     const activeColumnIndex = listColumns.findIndex(
    //         (column) => column.id === activeId
    //     );
    //     const overColumnIndex = listColumns.findIndex(
    //         (column) => column.id === overId
    //     );

    //     if (
    //         active.data.current.type === "column" &&
    //         over.data.current.type === "column"
    //     ) {

    //         dispatch(
    //             sortColumns(
    //                 arrayMove(
    //                     [...listColumns],
    //                     activeColumnIndex,
    //                     overColumnIndex
    //                 )
    //             )
    //         );
    //     }

    // };

    // const drag = isMobile ? div  : DndContext
    return (
        <div
            className={`${itemBoard?.backgroundColor} flex relative bg-fix h-screen w-screen pt-[48px] overflow-hidden`}
        >

            {/* left Bar */}
            <LefBarItemBoard listBoard={listBoard} showLeft={showLeft} />
            

            {/* list column right */}
            <div
                className="flex-1 relative"
            >

                {/* title board */}
                <TitleBoard itemBoard={itemBoard} isShowLeftBar={isShowLeftBar}/>
                
                {/* container column */}
                <DndContext
                    onDragStart={onDragStart}
                    // onDragEnd={onDragEnd}
                    onDragOver={onDragOver}
                    sensors={sensor}
                >
                    <div className="absolute h-[var(--height-container-column)] flex gap-[10px] left-0 top-[58px] right-0 z-[3] w-full overflow-x-scroll">
                        <div className="flex items-start flex-nowrap gap-[10px] pt-[15px] pl-[10px]">
                            {/* render columns */}
                            <SortableContext items={listColumId}>
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
                            </SortableContext>
                                    
                            {/* column or task drag */}
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
                                
                        </div>
                                    
                        {/* button create column */}
                        <CreateColumn
                            boardId={boardId}
                        />
                    </div>
                </DndContext>

                {/* background */}
                {itemBoard?.backgroundImg && (
                    <img
                        src={itemBoard?.backgroundImg ?? ""}
                        alt=""
                        className="fixed right-0 left-0 bottom-0 top-0 z-[-100] w-full h-full object-cover"
                    />
                )}

                {/* visible popup edit task */}
                {idTaskEdit && <PopupEditTask />}
                
            </div>
        </div>
    );
};

export default ItemBoards;
