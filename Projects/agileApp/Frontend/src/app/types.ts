import { Time } from "@angular/common";

export type priority = "High" | "Medium" | "Low";

export interface task {
    task_id: number,
    name: string,
    description: string,
    status: string,
    priority: priority,
    tag: string,
    member_id: number,
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
    member_name: string,
    member_email:string
}

export interface activity {
    activity_id: number,
    member_id: number,
    activity_desc: string,
    activity_dur:string,
    activity_datetime: string,
    task_id:number
}

export interface MemberView{
    member_id:number,
    member_name: string,
    member_email:string,
    total_time:string,
    days_worked:number,
    avg_time:string
}