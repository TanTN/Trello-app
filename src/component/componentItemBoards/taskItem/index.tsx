import { Task } from '../../../type'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'


interface Prop {
  task: Task
  rotate?: boolean
}

const TaskItem = (prop: Prop) => {
  const { task,rotate } = prop
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
  if (isDragging) {
    
    return <div ref={setNodeRef} style={style} className='h-[36px] mb-[8px] bg-background-box rounded-[7px]'></div>

  }
  return (
    <div ref={setNodeRef} className={`${rotate && "rotate-[6deg] shadow bg-[#414141]"} rounded-[7px] h-[36px] mb-[8px] cursor-pointer text-sm`} {...attributes} {...listeners}>
          <div className='h-[36px] leading-[36px] px-[10px] rounded-[7px] bg-background-box hover:bg-[#414141] '>
              {task.title}
          </div>
    </div>
  )
}

export default TaskItem