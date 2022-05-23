import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Florarie } from '../model/florarie';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  headers :any;
  florarie! : Florarie;
  constructor(private httpClient : HttpClient) { 
    const lang = localStorage.getItem('language') || 'RO';
    this.headers = new HttpHeaders({
      'Accept-Language': lang    })
  }

  addUser(user:User): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8085/addUser", user);
  }

  getUsers():Observable<any> {
    return this.httpClient.get<any>('http://localhost:8085/users');
  }

  putUser(user:User, username:string) {
    return this.httpClient.put<any>('http://localhost:8085/updateUser/'+username, user);
  }

  deleteUser(username: string) {
    return this.httpClient.delete<any>('http://localhost:8085/deleteUser/'+username);
  }

  searchUser(username: string):Observable<any> {
    return this.httpClient.get<any>('http://localhost:8085/searchUser/'+username);
  }

  filterUsers(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8085/filteredUsers');
  }

  sendNotifications(): Observable<any>{
    console.log("Notifications sent!!");
    return this.httpClient.get<any>('http://localhost:8085/sendNotifications');
  }
}
