import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) { }

  getData(url){
    return new Promise((resolve,reject)=>{
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*',
          "Content-Type": "application/json",
          'Authorization':'authkey',
          'userid':'1'
        })
      };
      this.http.get(url).subscribe((res)=>{
        resolve(res);
      },(err)=>{
        reject(err);
      })
    });
  }

}
