export type priority = "High" | "Medium" | "Low";

export interface task {
    task_id:number,
    name: string,
    description:string,
    status:string,
    priority: priority,
    tag: string,
    assignee:string,
    storypoint:string,
    create_date:string,
    due_date:string
}