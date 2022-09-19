import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { task } from '../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private url = "http://localhost:3005"
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) {}
  
  getTasks(sprint_id?:any):Observable<task[]>{
    if(!sprint_id){
      sprint_id = "";
    }
    return this.http.get<task[]>(this.url+"/tasks/"+sprint_id,{responseType:"json"})
  }

  insertTask(data:task):Observable<any>{
    return this.http.post(this.url+"/tasks/insert",data,this.httpOptions)
  }

  deleteTask(data:task):Observable<any>{
    return this.http.post(this.url+"/tasks/delete",data,this.httpOptions)
  }

  updateTask(data:task):Observable<any>{
    return this.http.post(this.url+"/tasks/update",data,this.httpOptions)
  }
}
