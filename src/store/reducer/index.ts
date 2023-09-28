import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { InitialState } from "../../type";
import { Board } from "../../type";

const initialState: InitialState = {
    boardContainers: [
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
            boardId: "1",
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
        addBoard: (state, action: PayloadAction<Board>) => {
            state.boardContainers.push(action.payload);
        },
        updateIsStar: (
            state,
            action: PayloadAction<{ id:string; isStar: boolean }>
        ) => {
            const indexBoard= state.boardContainers.findIndex(
                (board) => action.payload.id === board.id
            );
            state.boardContainers[indexBoard].isStar = action.payload.isStar;
        },
        updateIsStarHistory: (
            state,
            action: PayloadAction<{ id:string; isStar: boolean }>
        ) => {
            const indexBoard = state.historyViewed.findIndex(
                (board) => action.payload.id === board.id
            );
            if (indexBoard >= 0 ) {
                state.historyViewed[indexBoard].isStar =
                    action.payload.isStar;
            }
        },
        addBoardInHistory: (state, action: PayloadAction<Board>) => {

            const newHistory = state.historyViewed.filter(board => board.id !== action.payload.id)
            newHistory.unshift(action.payload)
            state.historyViewed = newHistory
        },
        deleteBoard: (state, action: PayloadAction<string>) => { 
            const newHistoryViewed = state.historyViewed.filter(board => board.id !== action.payload)
            const newBoardContainer = state.boardContainers.filter(board => board.id !== action.payload)
            state.boardContainers = newBoardContainer
            state.historyViewed = newHistoryViewed
        }
    },
});

export const { addBoard, updateIsStar, updateIsStarHistory,addBoardInHistory,deleteBoard } =
    workspace.actions;
export default workspace.reducer;
