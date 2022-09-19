export type priority = "High" | "Medium" | "Low";

export interface task {
    task_id:number,
    name: string,
    description:string,
    status:string,
    priority: priority,
    tag: string,
    assignee:string,
    story_point:number,
    create_date:string,
    due_date:string,
    sprint_id:number
}


export interface sprint {
    sprint_id:number,
    sprint_name:string,
    create_date:string,
    end_date:string
}