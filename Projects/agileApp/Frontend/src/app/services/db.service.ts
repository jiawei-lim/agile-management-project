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
  
  getTasks():Observable<task[]>{
    return this.http.get<task[]>(this.url+"/tasks/",{responseType:"json"})
  }

  insertTask(data:task):Observable<any>{
    return this.http.post(this.url+"/tasks/insert",data,this.httpOptions)
  }
}
