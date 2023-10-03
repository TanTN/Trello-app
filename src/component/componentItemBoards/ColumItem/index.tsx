import { useState } from "react";
import { Column, Task } from "../../../type";
import TaskItem from "../taskItem";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from "uuid";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addTask, changeTitleColumn } from "../../../store/reducer";
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

    const [titleTask, setTitleTask] = useState<string | null>("");
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
    const handleAddTask = () => {
        if (titleTask) {
            const newTask = {
                id: uuidv4(),
                columnId: column.id,
                title: titleTask,
            };
            dispatch(addTask(newTask));
            setTitleTask("");
        }
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
                {idColumnAddCard === column.id ? (
                    <div className="mx-[10px] mb-[8px] text-sm">
                        <textarea
                            placeholder="Enter a title for this card..."
                            className="
                        focus:outline-none
                        resize-none
                        bg-background-box 
                        rounded-[6px] 
                        min-h-[70px]
                        w-full
                        p-[8px]
                        "
                            value={titleTask ?? ''}
                            onChange={(e) =>
                                setTitleTask(e.target.value.trimStart())
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleAddTask();
                                }
                            }}
                        />
                        <div className="flex gap-2 items-center mt-[8px]">
                            <button
                                className="w-[73px] h-[32px] bg-create-button-background hover:bg-create-button-background-hovered text-black text-sm rounded-[4px]"
                                onClick={handleAddTask}
                            >
                                Add cart
                            </button>
                            <div
                                className="text-[18px] cursor-pointer"
                                onClick={() => {
                                    handleSetIdColumnAddCard(column.id);
                                    setTitleTask("");
                                }}
                            >
                                <AiOutlineClose />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        className="flex items-center gap-2 rounded-[7px] mx-[10px] p-[8px] mb-[8px] cursor-pointer hover:bg-background-box-hover"
                        onClick={() => handleSetIdColumnAddCard(column.id)}
                    >
                        <div className="text-[18px]">
                            <AiOutlinePlus />
                        </div>
                        <div className=" text-[14px]">Add a card</div>
                    </div>
                )}
            </div>
        </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            className={`${
                rotate && "rotate-[6deg]"
            } w-[272px] max-h-[770px] bg-bgColor rounded-[10px] overflow-y-auto`}
            style={style}
        >
            {!isEditTitleColumn ? <p
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
    );
};

export default ColumnItem;
