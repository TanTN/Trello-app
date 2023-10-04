import { useDispatch } from 'react-redux'
import { setDateComplete, setIdTaskEdit } from '../../../store/reducer'
import { Task } from '../../../type'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { AiFillCreditCard } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";

import dayjs from 'dayjs';
import { IoMdTime } from "react-icons/io";


interface Prop {
  task: Task
  rotate?: boolean
}

const TaskItem = (prop: Prop) => {
  const { task, rotate } = prop
  const dispatch = useDispatch()
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
} = useSortable({
    id: task.id,
    data: {
        type: "task",
        task
    }
});
  const dateCurrent = dayjs(`${dayjs().year()}-${dayjs().month()}-${dayjs().date()}`).minute(+dayjs().minute()).hour(+dayjs().hour()).valueOf()
  const dueSoon = dayjs(`${dayjs().year()}-${dayjs().month()}-${dayjs().date() + 1}`).minute(+dayjs().minute()).hour(+dayjs().hour()).valueOf()
  const dueDate = task.dates && dayjs(`${task.dates.year}-${task.dates.month}-${task.dates.day}`).minute(+task.dates.minute).hour(+task.dates.hour).valueOf()

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const editContent = (id: string) => {
    dispatch(setIdTaskEdit(id))
  }
  
  const handleDateComplete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    dispatch(setDateComplete({id: task.id, dateComplete: !task.dates.dateComplete}))
  }
  if (isDragging) {
    
    return <div ref={setNodeRef} style={style} className='min-h-[36px] p-[8px] mb-[8px] break-words bg-background-box rounded-[7px] overflow-x-hidden'>
      <p className='invisible text-sm'>{task.title}</p>
    </div>

  }
  return (
    <>
      <div ref={setNodeRef} className={` bg-background-box hover:bg-[#414141] break-words min-h-[36px] p-[8px] overflow-x-hidden ${rotate && "rotate-[6deg] shadow bg-[#414141]"} rounded-[7px] mb-[8px] cursor-pointer text-sm`} {...attributes} {...listeners}
      onClick={() => editContent(task.id)}
      >
        {task.title}
        <div className='flex gap-2 items-center text-[16px] pt-[2px] px-[3px]'>
          
          {task.dates?.isShow &&
            <div
              className={`${task.dates?.dateComplete ? "bg-color-date-completed text-black" :
                dateCurrent > dueDate ? "bg-color-date-overdue text-black" :
                  dateCurrent < dueDate && dueDate < dueSoon ? "bg-color-date-dueSoon text-black" : ""
                    
                } group/item flex items-center rounded-sm`}
                onClick={e => handleDateComplete(e)}
            >
              
              <div className='flex items-center w-[13px] h-[13px] ml-[3px]'>
                <div
                  className={`group/edit hidden group-hover/item:flex items-center justify-center w-full h-full border-[1px] border-bg-background-box
                  ${task.dates?.dateComplete ? "border-black text-black" :
                  dateCurrent > dueDate ? "border-black text-black" :
                  dateCurrent < dueDate && dueDate < dueSoon ? "border-black text-black" : "border-bg-background-box"
                    
                }
                  
                  `}>
                  {task.dates.dateComplete && <BsCheck />}
                </div>
  
                <div className='group/edit block group-hover/item:hidden'>
                  <IoMdTime />
                </div>
              </div>
              
              <p className='px-[4px] text-[12px]'>{task.dates?.day} {task.dates?.monthWord} {task.dates?.year}</p>
            </div>
          }
        {task.content && (
            <AiFillCreditCard />
          )}
          
        </div>
        
      </div>
      
    </>

  )
}

export default TaskItem