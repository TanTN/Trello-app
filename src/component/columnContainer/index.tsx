import React from 'react'
import { Column } from '../../type'

interface Prop {
    column : Column
}

const ColumnContainer = (prop: Prop) => {
  const { column } = prop

  return (
    <div className='text-black'>
      
    </div>
  )
}

export default ColumnContainer