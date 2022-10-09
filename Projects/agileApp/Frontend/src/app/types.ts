import { Time } from "@angular/common";

export type priority = "High" | "Medium" | "Low";

export interface task {
    task_id: number,
    name: string,
    description: string,
    status: string,
    priority: priority,
    tag: string,
    assignee: string,
    story_point: number,
    create_date: string,
    due_date: string,
    sprint_id: number,
    total_time:string
}


export interface sprint {
    sprint_id: number,
    sprint_name: string,
    start_date: string,
    end_date: string,
    sprint_status:string
}

export interface team{
    member_id:number,
    name: string,
    email:string
}