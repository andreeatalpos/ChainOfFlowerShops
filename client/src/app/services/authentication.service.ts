import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {Observable} from "rxjs";
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http :HttpClient, private router :Router) { }

    public loginUser(user:User): Observable<any> {
        sessionStorage.setItem('authenticatedUser', user.username);
       return this.http.post<any>("http://localhost:8085/login",user);
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem('authenticatedUser')
        return !(user === null);
    }
    logout(){
        sessionStorage.removeItem('authenticatedUser');
        this.router.navigate(['']);
    }
}