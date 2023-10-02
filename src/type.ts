
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

export interface Task {
    id:string;
    columnId:string;
    title: string;
    content?: string;
}

export interface EditTask {
    id: string | undefined;
    content: string | undefined

}

export interface InitialState {
    boardContainers: Board[]
    columnContainers: Column[]
    taskContainers: Task[]
    historyViewed: Board[]
    editTask:EditTask
}