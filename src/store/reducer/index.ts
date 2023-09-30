import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Column, InitialState, Task } from "../../type";
import { Board } from "../../type";

const initialState: InitialState = {
    boardContainers: [
        // {
        //     id: "1",
        //     title: "tan",
        //     isStar: false,
        //     backgroundImg:
        //         "https://th.bing.com/th/id/OIP.80fmzqoZiy1U-L7ngTEhsgHaEK?w=284&h=180&c=7&r=0&o=5&pid=1.7",
        // },
    ],
    columnContainers: [
        // {
        //     id: "1",
        //     boardId: "1",
        //     title: "todo",
        // },
        // {
        //     id: "2",
        //     boardId: "1",
        //     title: "todo",
        // },
    ],
    taskContainers: [
        // {
        //     id: "17",
        //     columnId: "1",
        //     title: "ngay 1",
        //     content: "hom nay phai lam gi",
        // },
        // {
        //     id: "18",
        //     columnId: "1",
        //     title: "ngay 2",
        //     content: "hom nay phai lam gi",
        // },
        // {
        //     id: "3",
        //     columnId: "1",
        //     title: "ngay 3",
        //     content: "hom nay phai lam gi",
        // },
        // {
        //     id: "4",
        //     columnId: "1",
        //     title: "ngay 4",
        //     content: "hom nay phai lam gi",
        // },
        // {
        //     id: "5",
        //     columnId: "1",
        //     title: "ngay 5",
        //     content: "hom nay phai lam gi",
        // },
        // {
        //     id: "6",
        //     columnId: "2",
        //     title: "ngay 6",
        //     content: "hom nay phai lam gi",
        // },
        // {
        //     id: "7",
        //     columnId: "2",
        //     title: "ngay 7",
        //     content: "hom nay phai lam gi",
        // },
        // {
        //     id: "8",
        //     columnId: "2",
        //     title: "ngay 8",
        //     content: "hom nay phai lam gi",
        // },
        // {
        //     id: "9",
        //     columnId: "2",
        //     title: "ngay 9",
        //     content: "hom nay phai lam gi",
        // },
        // {
        //     id: "10",
        //     columnId: "2",
        //     title: "ngay 10",
        //     content: "hom nay phai lam gi",
        // },
        // {
        //     id: "11",
        //     columnId: "2",
        //     title: "ngay 11",
        //     content: "hom nay phai lam gi",
        // },
        // {
        //     id: "12",
        //     columnId: "2",
        //     title: "ngay 12",
        //     content: "hom nay phai lam gi",
        // },
        // {
        //     id: "13",
        //     columnId: "2",
        //     title: "ngay 13",
        //     content: "hom nay phai lam gi",
        // },
        // {
        //     id: "14",
        //     columnId: "2",
        //     title: "ngay 14",
        //     content: "hom nay phai lam gi",
        // },
        // {
        //     id: "15",
        //     columnId: "2",
        //     title: "ngay 15",
        //     content: "hom nay phai lam gi",
        // },
        
    ],
    historyViewed: [
        // {
        //     id: "1",
        //     title: "tan",
        //     isStar: false,
        //     backgroundImg:
        //         "https://th.bing.com/th/id/OIP.80fmzqoZiy1U-L7ngTEhsgHaEK?w=284&h=180&c=7&r=0&o=5&pid=1.7",
        // },
    ],
};
const workspace = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        addBoard: (state, action: PayloadAction<Board>) => {
            state.boardContainers.push(action.payload);
        },
        addColumn: (state, action: PayloadAction<Column>) => {
            state.columnContainers.push(action.payload);
        },
        addTask: (state, action: PayloadAction<Task>) => {
            state.taskContainers.push(action.payload);
        },
        updateIsStar: (
            state,
            action: PayloadAction<{ id: string; isStar: boolean }>
        ) => {
            const indexBoard = state.boardContainers.findIndex(
                (board) => action.payload.id === board.id
            );
            state.boardContainers[indexBoard].isStar = action.payload.isStar;
        },
        updateIsStarHistory: (
            state,
            action: PayloadAction<{ id: string; isStar: boolean }>
        ) => {
            const indexBoard = state.historyViewed.findIndex(
                (board) => action.payload.id === board.id
            );
            if (indexBoard >= 0) {
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
        },
        sortColumns: (state, action: PayloadAction<Column[]>) => {
            state.columnContainers = action.payload
        },
        sortTasks: (state, action: PayloadAction<Task[]>) => {
            state.taskContainers = action.payload
        },
        changeTitleColumn: (state, action: PayloadAction<{ id: string, title: string }>) => {
            const indexColumnChange = state.columnContainers.findIndex(column => column.id === action.payload.id)
            if (indexColumnChange >= 0) {
                state.columnContainers[indexColumnChange].title = action.payload.title
            }
        },
        changeTitleBoard: (state, action: PayloadAction<{ id: string, title: string }>) => {
            const indexBoardChange = state.boardContainers.findIndex(board => board.id === action.payload.id)
            if (indexBoardChange >= 0) {
                state.boardContainers[indexBoardChange].title = action.payload.title
            }
        }
        
    },
});

export const { addBoard,addColumn,addTask,changeTitleBoard, updateIsStar, updateIsStarHistory,addBoardInHistory,deleteBoard, sortColumns,sortTasks,changeTitleColumn} =
    workspace.actions;
export default workspace.reducer;
