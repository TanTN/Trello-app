
export interface Workspace {
    id: number | string;
    title: string 
    img: string
}

export interface Column {
    id: number | string;
    workspaceId: number | string;
    title: string
}

export interface Task {
    id: number | string;
    columnId: number | string;
    title: string;
    content: string;
}

export interface InitialState {
    listWorkspace: Workspace[]
    columnContainers: Column[]
    taskContainers: Task[]
}