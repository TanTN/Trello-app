
export interface Workspace {
    id:string;
    title: string 
    isStar: boolean
    backgroundImg?: string | null
    backgroundColor?: string | null
}

export interface Column {
    id:string;
    workspaceId:string;
    title: string
}

export interface Task {
    id:string;
    columnId:string;
    title: string;
    content: string;
}


export interface InitialState {
    listWorkspace: Workspace[]
    columnContainers: Column[]
    taskContainers: Task[]
    historyViewed: Workspace[]
}