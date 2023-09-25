import React from 'react'
import { Workspace } from '../../type'
interface Prop {
    workspace: Workspace
}
const WorkspaceItem = (prop: Prop) => {
    const { workspace } = prop
  return (
    <a href='#' className='relative overflow-hidden rounded-md'>
          <img src={workspace.img} alt="imageWorkspace" />
          <p className='absolute top-[10px] left-[10px] text-[18px] font-medium text-white'>{workspace.title}</p>
    </a>
  )
}

export default WorkspaceItem