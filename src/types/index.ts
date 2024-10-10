export type Task = {
    id: string
    activity: string
    description: string
    date: Date
}

export type DraftTask = Omit<Task, "id">