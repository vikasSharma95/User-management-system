import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: any[]=[
    {id:1, name: "Arpit", email: "arpit@gmail.com", role:"angular developer"},
    {id:2, name: "mahesh", email: "mahesh@gmail.com", role:"java developer"},
    {id:3, name: "Satish", email: "satish@gmail.com", role:"c++ developer"},
    {id:4, name: "suresh", email: "suresh@gmail.com", role:"Html developer"},
    {id:5, name: "ankush", email: "ankush@gmail.com", role:".net developer"},
    {id:6, name: "suraj", email: "suraj@gmail.com", role:"react developer"}
  ]

  constructor(private http: HttpClient) { }


}
