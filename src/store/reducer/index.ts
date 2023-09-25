import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { InitialState } from '../../type'
import { Workspace } from '../../type'

const initialState : InitialState = {
    listWorkspace: [
        {
            id: '1',
            title: "tan",
            img: 'https://th.bing.com/th/id/OIP.80fmzqoZiy1U-L7ngTEhsgHaEK?w=284&h=180&c=7&r=0&o=5&pid=1.7'
        }
    ],
    columnContainers: [
        {
            id: '2',
            workspaceId: '1',
            title: "todo"
        }
    ],
    taskContainers: [
        {
            id: "3",
            columnId: "2",
            title: "ngay 1",
            content: "hom nay phai lam gi"
        }
    ]
}
const workspace = createSlice({
    name: 'workspace',
    initialState,
    reducers: {
        addWorkspace: (state , action: PayloadAction<Workspace>) => {
            state.listWorkspace.push(action.payload)
        }
    }
})

export const { addWorkspace } = workspace.actions
export default workspace.reducer