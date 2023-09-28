import {useState} from "react"
import { Column, Task } from "../../../type";
import TaskItem from "../taskItem";
import {SortableContext, useSortable} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuidv4 } from "uuid";
import {AiOutlinePlus,AiOutlineClose} from "react-icons/ai"
import { useDispatch } from "react-redux";
import { addTask } from "../../../store/reducer";

interface Prop {
    column: Column;
    taskContainer: Task[];
    rotate?: boolean;
}

const ColumnItem = (prop: Prop) => {
    const { column, taskContainer, rotate } = prop;
    const dispatch = useDispatch()
    const taskContainerCurrent = taskContainer.filter(task => task.columnId === column.id)
    const listTaskId = taskContainerCurrent.map(task => task.id)

    const [isShowAddTask, setIsShowAddTask] = useState(false)
    const [titleTask, setTitleTask] = useState("")
    
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: column.id,
        data: {
            type: "column",
            column
        }
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
                title: titleTask
            }
            dispatch(addTask(newTask))
            setTitleTask("")
        }
    }
    if (isDragging) {
        
        return (
            <div ref={setNodeRef} className="w-[272px] bg-[#29292977] rounded-[10px]" style={style}>

            </div>
        )
    }
    

    return (
        <div ref={setNodeRef} className={`${rotate && "rotate-[6deg]"} w-[272px] bg-bgColor rounded-[10px]`} style={style}>
            <p className="h-[48px] leading-[48px] px-[20px]" {...listeners} {...attributes}>{column.title}</p>
            <div className="px-[10px] max-h-[721px] overflow-y-auto">
                <SortableContext items={listTaskId}>
                    {taskContainerCurrent.map((task) => <TaskItem key={task.id} task={task} />)}
                </SortableContext>

            </div>
            {isShowAddTask ? <div className="mx-[10px] mb-[8px] text-sm">
                <textarea placeholder="Enter a title for this card..."
                    className="
                    focus:outline-none
                    resize-none
                    bg-background-box 
                    rounded-[6px] 
                    min-h-[70px]
                    w-full
                    p-[8px]
                    "
                    value={titleTask}
                    onChange={(e) => setTitleTask(e.target.value.trimStart())}
                />
                <div className="flex gap-2 items-center mt-[8px]">
                    <button className="w-[73px] h-[32px] bg-create-button-background hover:bg-create-button-background-hovered text-black text-sm rounded-[4px]"
                    onClick={handleAddTask}
                    >Add cart</button>
                    <div className="text-[18px] cursor-pointer"
                        onClick={() => {
                            setIsShowAddTask(false)
                            setTitleTask('')
                        }}
                    >
                        <AiOutlineClose />
                    </div>
                </div>  

            </div> :
                
                <div className="flex items-center gap-2 rounded-[7px] mx-[10px] p-[8px] mb-[8px] cursor-pointer hover:bg-background-box-hover"
                    onClick={() => setIsShowAddTask(true)}
                >
                <div className="text-[18px]"><AiOutlinePlus /></div>
                <div className=" text-[14px]">Add a card</div>
            </div>}
        </div>
    );
};

export default ColumnItem;
