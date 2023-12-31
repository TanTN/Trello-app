import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { BsTrash } from "react-icons/bs"

import TaskItem from "../taskItem";
import CreateCard from "../createCard";
import { changeTitleColumn,deleteColumn } from "../../../store/reducer";
import { Column, Task } from "../../../type";
interface Prop {
    column: Column;
    taskContainer: Task[];
    rotate?: boolean;
    idColumnAddCard: string | null
    handleSetIdColumnAddCard: (id : string | null) => void;
}

const ColumnItem = (prop: Prop) => {
    const { column, taskContainer, rotate, idColumnAddCard, handleSetIdColumnAddCard } = prop;
    const dispatch = useDispatch();
    const taskContainerCurrent = useMemo(() => taskContainer.filter((task) => task.columnId === column.id),[taskContainer]);
    const listTaskId = useMemo(() => taskContainerCurrent.map((task) => task.id),[taskContainerCurrent]);

    const [titleColumn, setTitleColumn] = useState<string>(column.title);
    const [isEditTitleColumn, setIsEditTitleColumn] = useState<boolean>(false)

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
  
    } = useSortable({
        id: column.id,
        data: {
            type: "column",
            column,
        },
    });

    // delete column
    const handleDeleteColumn = () => {
        dispatch(deleteColumn(column.id));
    }

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    // edit title column
    const handleChangeTitleColumn = () => {
        if (titleColumn) { 
            dispatch(changeTitleColumn({id: column.id, title:titleColumn}))
        }
    }
    
    // shadow of column when drag
    if (isDragging) {
        return (
            <div
            ref={setNodeRef}
            className={`w-[272px] bg-[#0808085e] rounded-[10px]`}
            style={style}
            {...listeners}
            {...attributes}
        >
            <div className="invisible">
                <p
                    className="h-[48px] leading-[48px] px-[20px]"
                    
                >
                    {column.title}
                </p>
                <div className="px-[10px] max-h-[721px] overflow-y-auto">
                    <SortableContext items={listTaskId}>
                        {taskContainerCurrent.map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))}
                    </SortableContext>
                    </div>
                    
                {/* create card */}
                <CreateCard
                    idColumnAddCard={idColumnAddCard}
                    columnId={column.id}
                    handleSetIdColumnAddCard={handleSetIdColumnAddCard}
    
                />
            </div>
        </div>
        );
    }

    return (
        <div
            className={`${
                rotate && "rotate-[3deg]"
            } w-[272px] bg-bgColor rounded-[10px] overflow-hidden`}
            style={style}
            ref={setNodeRef}
            
        >
            <div
                className="flex items-center justify-between h-[48px] py-[10px] px-[8px] w-full"
                {...listeners}
                {...attributes}
            >

            {!isEditTitleColumn ?

                // title
                <div
                className="flex-1 px-[6px] py-[4px]"
                onClick={() => setIsEditTitleColumn(true)}
                >
                    <div className="hiddenLineLong1 h-[24px] overflow-hidden border-[2px] border-[transparent] text-sm">
                        {column.title}
                    </div>

                </div>
                :
                // edit title column
                <div className="flex-1">
                    <input
                        type="text"
                        className="w-full px-[6px] py-[4px] rounded-[8px] text-sm bg-background-box-hover outline-none border-[2px] border-border-input-color"
                        value={titleColumn}
                        onChange={(e) => setTitleColumn(e.target.value.trimStart())}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                handleChangeTitleColumn()
                                setIsEditTitleColumn(false)
                            }
                        }}
                        onBlur={() => {
                            handleChangeTitleColumn()
                            setIsEditTitleColumn(false)
                        }}
                        autoFocus
                    />
                </div>
            }
                {/* delete column */}
                <div 
                className="px-[5px] py-[5px] cursor-pointer rounded-[3px] hover:bg-background-box-hover"
                onClick={handleDeleteColumn}
                >
                    <BsTrash />
                </div>
            </div>

            <div className="colorScrollBar max-h-[var(--height-list-task-pc)] overflow-y-auto max-md:max-h-[var(--height-list-task-mobile)]">

                {/* render tasks */}
                <div className="px-[10px]">
                    <SortableContext items={listTaskId}>
                        {taskContainerCurrent.map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))}
                    </SortableContext>
                </div>
    
                {/* create card */}
                <CreateCard
                    idColumnAddCard={idColumnAddCard}
                    columnId={column.id}
                    handleSetIdColumnAddCard={handleSetIdColumnAddCard}
    
                />
            </div>
        </div>
    );
};

export default ColumnItem;
