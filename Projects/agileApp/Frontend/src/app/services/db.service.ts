import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { task, sprint,team,activity, MemberView } from '../types';
import { Observable } from 'rxjs';
import { MemberExpression } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private url = "http://localhost:3005"
  activityArr:activity[] = [];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { 
    this.getAllActivity().subscribe(
      res=>this.activityArr = res,
      err=>console.log
    )
  }

  getTasks(sprint_id?: any): Observable<task[]> {
    if (!sprint_id) {
      sprint_id = "";
    }
    return this.http.get<task[]>(this.url + "/tasks/" + sprint_id, { responseType: "json" })
  }

  insertTask(data: task): Observable<any> {
    return this.http.post(this.url + "/tasks/insert", data, this.httpOptions)
  }

  deleteTask(data: task): Observable<any> {
    return this.http.post(this.url + "/tasks/delete", data, this.httpOptions)
  }

  updateTask(data: task): Observable<any> {
    return this.http.post(this.url + "/tasks/update", data, this.httpOptions)
  }

  filterTask(filterTag: string): Observable<any> {
    return this.http.post(this.url + "/tasks/filter/" + filterTag, { responseType: "json" })
  }

  getSprints(): Observable<sprint[]> {
    return this.http.get<sprint[]>(this.url + "/sprints", { responseType: "json" })
  }

  insertSprints(data: sprint): Observable<sprint[]> {
    return this.http.post<sprint[]>(this.url + "/sprints/insert", data, this.httpOptions)
  }

  updateSprintStatus(data:any): Observable<any> {
    return this.http.post(this.url + "/sprints/update", data, this.httpOptions)
  }

  searchActivityByTask(task_id:number): Observable<activity[]> {
    return this.http.get<activity[]>(this.url + "/activity/searchTask/"+task_id, { responseType: "json" })
  }

  deleteActivity(activity_id:activity) {
    return this.http.post<activity[]>(this.url + "/activity/delete/",activity_id, { responseType: "json" })
  }

  insertActivity(act:activity){
    return this.http.post<activity[]>(this.url + "/activity/add",act, { responseType: "json" })
  }

  updateActivity(data: activity): Observable<any> {
    return this.http.post(this.url + "/activity/update", data, this.httpOptions)
  }

  getAllActivity():Observable<any>{
    return this.http.get<activity[]>(this.url + "/activity/getAll", { responseType: "json" })
  }

  demoActivityFunc():activity[]{
    return this.activityArr;
  }

  updateSprint(data: sprint): Observable<sprint[]> {
    return this.http.post<sprint[]>(this.url + "/sprints/update", data, this.httpOptions)
  }

  getMembers():Observable<team[]>{
    return this.http.get<team[]>(this.url+'/members',{responseType:"json"})
  }

  insertMember(data:team):Observable<team[]>{
    return this.http.post<team[]>(this.url+'/members/insert',data, this.httpOptions)
  }

  updateMember(data:team):Observable<team[]>{
    return this.http.post<team[]>(this.url+"/members/update",data,this.httpOptions)
  }

  deleteMember(data:team):Observable<team[]>{
    return this.http.post<team[]>(this.url+"/members/delete",data,this.httpOptions)
  }

  getMemberName(member_id:number):Observable<team[]>{
    return this.http.get<team[]>(this.url + "/members/getName/"+member_id, { responseType: "json" })
  }

  deleteSprint(data: sprint): Observable<sprint[]> {
    return this.http.post<sprint[]>(this.url + "/sprints/delete", data, this.httpOptions)
  }

  getMemberView():Observable<MemberView[]>{
    return this.http.get<MemberView[]>(this.url+"/member_view/",{responseType:"json"})
  }

  

}
