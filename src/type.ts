
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
        day: string;
        month: string;
        monthWord: string
        year: string;
        hour: string;
        minute: string;
        isShow: boolean;
        dateComplete: boolean
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