import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { InitialState } from "../../type";
import { Workspace } from "../../type";

const initialState: InitialState = {
    listWorkspace: [
        {
            id: "1",
            title: "tan",
            isStar: false,
            backgroundImg:
                "https://th.bing.com/th/id/OIP.80fmzqoZiy1U-L7ngTEhsgHaEK?w=284&h=180&c=7&r=0&o=5&pid=1.7",
        },
    ],
    columnContainers: [
        {
            id: "2",
            workspaceId: "1",
            title: "todo",
        },
    ],
    taskContainers: [
        {
            id: "3",
            columnId: "2",
            title: "ngay 1",
            content: "hom nay phai lam gi",
        },
    ],
    historyViewed: [
        {
            id: "1",
            title: "tan",
            isStar: false,
            backgroundImg:
                "https://th.bing.com/th/id/OIP.80fmzqoZiy1U-L7ngTEhsgHaEK?w=284&h=180&c=7&r=0&o=5&pid=1.7",
        },
    ],
};
const workspace = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        addWorkspace: (state, action: PayloadAction<Workspace>) => {
            state.listWorkspace.push(action.payload);
        },
        updateIsStar: (
            state,
            action: PayloadAction<{ id: number | string; isStar: boolean }>
        ) => {
            const indexWorkspace = state.listWorkspace.findIndex(
                (workspace) => action.payload.id === workspace.id
            );
            state.listWorkspace[indexWorkspace].isStar = action.payload.isStar;
        },
        updateIsStarHistory: (
            state,
            action: PayloadAction<{ id: number | string; isStar: boolean }>
        ) => {
            const indexWorkspace = state.historyViewed.findIndex(
                (workspace) => action.payload.id === workspace.id
            );
            if (indexWorkspace >= 0 ) {
                state.historyViewed[indexWorkspace].isStar =
                    action.payload.isStar;
            }
        },
        addWorkspaceInHistory: (state, action: PayloadAction<Workspace>) => {
            const newHistory = state.historyViewed.filter(workspace => workspace.id !== action.payload.id)
            newHistory.unshift(action.payload)
            state.historyViewed = newHistory
        }
    },
});

export const { addWorkspace, updateIsStar, updateIsStarHistory,addWorkspaceInHistory } =
    workspace.actions;
export default workspace.reducer;
