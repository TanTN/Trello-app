import { useState } from "react";
import { Column, Task } from "../../../type";
import TaskItem from "../taskItem";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { changeTitleColumn } from "../../../store/reducer";
import CreateCard from "../createCard";

interface Prop {
    column: Column;
    taskContainer: Task[];
    rotate?: boolean;
    idColumnAddCard: string | null
    handleSetIdColumnAddCard: (id : string | null) => void;
}

const ColumnItem = (prop: Prop) => {
    const { column, taskContainer, rotate ,idColumnAddCard, handleSetIdColumnAddCard} = prop;
    const dispatch = useDispatch();
    const taskContainerCurrent = taskContainer.filter(
        (task) => task.columnId === column.id
    );

    const listTaskId = taskContainerCurrent.map((task) => task.id);

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

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleChangeTitleColumn = () => {
        if (titleColumn) { 
            dispatch(changeTitleColumn({id: column.id, title:titleColumn}))
        }
    }
    if (isDragging) {
        return (
            <div
            ref={setNodeRef}
            className={`${
                rotate && "rotate-[6deg]"
            } w-[272px] bg-[#0808085e] rounded-[10px]`}
            style={style}
        >
            <div className="invisible">
                <p
                    className="h-[48px] leading-[48px] px-[20px]"
                    {...listeners}
                    {...attributes}
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
            ref={setNodeRef}
            className={`${
                rotate && "rotate-[6deg]"
            } w-[272px] bg-bgColor rounded-[10px] overflow-hidden`}
            style={style}
        >
            {!isEditTitleColumn ?
            <p
                className="h-[48px] py-[12px] px-[16px] w-full"
                {...listeners}
                {...attributes}
                onClick={() => setIsEditTitleColumn(true)}
            >
                <div className="hiddenLineLong1 h-[24px] overflow-hidden border-[2px] border-[transparent] text-sm">{column.title}</div>
            </p> :
                <div className="h-[48px] px-[10px] py-[8px]">
                    <input
                        type="text"
                        className="w-full px-[6px] py-[4px] rounded-[8px] text-sm bg-background-box-hover outline-none border-[2px] border-border-input-color"
                        value={titleColumn}
                        autoFocus
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
                    />
                </div>
            }

            <div className="colorScrollBar max-h-[740px] overflow-y-auto">
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
