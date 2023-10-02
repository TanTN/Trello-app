import { useDispatch } from 'react-redux'
import { setIdTaskEdit } from '../../../store/reducer'
import { Task } from '../../../type'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { AiFillCreditCard } from "react-icons/ai";



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
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const editContent = (id: string) => {
    dispatch(setIdTaskEdit(id))
  }
  if (isDragging) {
    
    return <div ref={setNodeRef} style={style} className='min-h-[36px] p-[8px] mb-[8px] break-words bg-background-box rounded-[7px] overflow-x-hidden'>
      <p className='invisible text-sm'>{task.title}</p>
    </div>

  }
  return (
    <>
      <div ref={setNodeRef} className={`bg-background-box hover:bg-[#414141] break-words min-h-[36px] p-[8px] overflow-x-hidden ${rotate && "rotate-[6deg] shadow bg-[#414141]"} rounded-[7px] mb-[8px] cursor-pointer text-sm`} {...attributes} {...listeners}
      onClick={() => editContent(task.id)}
      >
        {task.title}
        {task.content && (
          <div className='text-[16px] pt-[2px] px-[3px]'>
            <AiFillCreditCard />
          </div>
        )}
        
      </div>
      
    </>

  )
}

export default TaskItem