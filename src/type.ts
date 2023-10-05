
export interface Board {
    id:string;
    title: string 
    isStar: boolean
    backgroundImg?: string | null
    backgroundColor?: string | null
}

export interface Column {
    id:string;
    boardId:string;
    title: string
}

export interface Dates {
        day: number;
        month: number;
        year: number;
        hour: number;
        minute: number;
        isShow: boolean;
        dateComplete: boolean
        monthWord?: string
}
export interface Task {
    id:string;
    columnId:string;
    title: string;
    dates: Dates 
    content?: string;
}

export interface EditTask {
    id: string | undefined;
}

export interface InitialState {
    boardContainers: Board[]
    columnContainers: Column[]
    taskContainers: Task[]
    historyViewed: Board[]
    editTask:EditTask
}