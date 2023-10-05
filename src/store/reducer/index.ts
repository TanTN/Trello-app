import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Column, Dates, InitialState, Task } from "../../type";
import { Board } from "../../type";

const initialState: InitialState = {
    boardContainers: [],
    columnContainers: [],
    taskContainers: [],
    historyViewed: [],
    editTask: {
        id: "",
    },
    
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
                state.historyViewed[indexBoard].isStar = action.payload.isStar;
            }
        },
        addBoardInHistory: (state, action: PayloadAction<Board>) => {
            const newHistory = state.historyViewed.filter(
                (board) => board.id !== action.payload.id
            );
            newHistory.unshift(action.payload);
            state.historyViewed = newHistory;
        },
        deleteBoard: (state, action: PayloadAction<string>) => {
            const newHistoryViewed = state.historyViewed.filter(
                (board) => board.id !== action.payload
            );
            const newBoardContainer = state.boardContainers.filter(
                (board) => board.id !== action.payload
            );
            state.boardContainers = newBoardContainer;
            state.historyViewed = newHistoryViewed;
        },
        sortColumns: (state, action: PayloadAction<Column[]>) => {
            state.columnContainers = action.payload;
        },
        sortTasks: (state, action: PayloadAction<Task[]>) => {
            state.taskContainers = action.payload;
        },
        changeTitleColumn: (
            state,
            action: PayloadAction<{ id: string; title: string }>
        ) => {
            const indexColumnChange = state.columnContainers.findIndex(
                (column) => column.id === action.payload.id
            );
            if (indexColumnChange >= 0) {
                state.columnContainers[indexColumnChange].title =
                    action.payload.title;
            }
        },
        changeTitleBoard: (
            state,
            action: PayloadAction<{ id: string; title: string }>
        ) => {
            const indexBoardChange = state.boardContainers.findIndex(
                (board) => board.id === action.payload.id
            );
            if (indexBoardChange >= 0) {
                state.boardContainers[indexBoardChange].title =
                    action.payload.title;
            }
        },
        changeTitleTask: (
            state,
            action: PayloadAction<{ id: string; title: string }>
        ) => {
            const indexTaskChange = state.taskContainers.findIndex(
                (board: { id: string; }) => board.id === action.payload.id
            );
            if (indexTaskChange >= 0) {
                state.taskContainers[indexTaskChange].title =
                    action.payload.title;
            }
        },
        editContentTask: (state, action: PayloadAction<{ id: string, content: string | undefined}>) => {
            const indexTask = state.taskContainers.findIndex((task: { id: string; }) => task.id === action.payload.id)
            if (indexTask >= 0) { 
                state.taskContainers[indexTask].content = action.payload.content;
            }
        },
        setIdTaskEdit: (state, action: PayloadAction<string | undefined >) => {
            state.editTask.id = action.payload
        },
        setDateTask: (state, action: PayloadAction<{ id: string, dates: Dates }>) => {
            const indexTask = state.taskContainers.findIndex((task: { id: string; }) => task.id === action.payload.id)
            if (indexTask >= 0) { 
                state.taskContainers[indexTask].dates = action.payload.dates
            }
        },
        isRemoveDateTask: (state, action: PayloadAction<{ id: string, isShow: boolean }>) => {
            const indexTask = state.taskContainers.findIndex((task: { id: string; }) => task.id === action.payload.id)
            if (indexTask >= 0) { 
                state.taskContainers[indexTask].dates.isShow =  action.payload.isShow
            }
        },
        setDateComplete: (state, action: PayloadAction<{ id: string, dateComplete: boolean }>) => {
            const indexTask = state.taskContainers.findIndex((task: { id: string; }) => task.id === action.payload.id)
            if (indexTask >= 0) { 
                state.taskContainers[indexTask].dates.dateComplete =  action.payload.dateComplete
            }
        }

    },
});

export const {
    setDateComplete,
    isRemoveDateTask,
    setDateTask,
    addBoard,
    addColumn,
    addTask,
    changeTitleBoard,
    updateIsStar,
    updateIsStarHistory,
    addBoardInHistory,
    deleteBoard,
    sortColumns,
    sortTasks,
    changeTitleColumn,
    editContentTask,
    setIdTaskEdit,
    changeTitleTask
} = workspace.actions;
export default workspace.reducer;
