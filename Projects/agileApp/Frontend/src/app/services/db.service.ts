import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { task, sprint, activity } from '../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private url = "http://localhost:3005"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

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

  getSprints(): Observable<sprint[]> {
    return this.http.get<sprint[]>(this.url + "/sprints", { responseType: "json" })
  }

  insertSprints(data: sprint): Observable<sprint[]> {
    return this.http.post<sprint[]>(this.url + "/sprints/insert", data, this.httpOptions)
  }

  updateSprintStatus(data:any): Observable<sprint[]> {
    return this.http.post<sprint[]>(this.url + "/sprints/update", data, this.httpOptions)
  }

  searchActivityByTask(task_id:number): Observable<activity[]> {
    return this.http.get<activity[]>(this.url + "/activity/searchTask/"+task_id, { responseType: "json" })
  }

  deleteActivity(activity_id:activity) {
    return this.http.post(this.url + "/activity/delete/",activity_id, { responseType: "json" })
  }

}
