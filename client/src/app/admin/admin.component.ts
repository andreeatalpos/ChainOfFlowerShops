import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {User} from "../model/user";
import {MatDialog} from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { AdminService } from '../services/admin.service';
import { AuthenticationService } from '../services/authentication.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  datasource: User[] = [];
  constructor(private httpClient :HttpClient, public dialog: MatDialog, private adminService : AdminService, private authService : AuthenticationService,
    private translateService:TranslateService) { 
    this.translateService.setDefaultLang('RO');
    this.translateService.use(localStorage.getItem('language') || 'RO');
  }
  value = '';
  f = '';
  languages: string[] = ["RO", "EN", "FR"];
  language="";

  ngOnInit(): void {
    this.getAllUsers();
    this.language = localStorage.getItem('language') || "RO";
  }
  displayedColumns: string[] = ['username', 'role','flowershop', 'action'];
  openDialog() {
    const dialogRef = this.dialog.open(AddUserDialogComponent,{
      width:'30%'
    }).afterClosed().subscribe(val =>{
      if(val=='save') {
        this.getAllUsers();
      }
    });
  }

  getAllUsers() {
    this.adminService.getUsers().subscribe(
      response =>{
        console.log(response);
        this.datasource = response;
      }
    )
  }

  sendNotifications() {
    this.adminService.sendNotifications().subscribe(
      response =>{
        console.log(response);
        console.log("Notifications sent");
      }
    )
  }
  editUser(row : any) :void{
    console.log(row);
    this.dialog.open(AddUserDialogComponent,{
      width:'30%',
      data : row
    }).afterClosed().subscribe(val=> {
      if(val=='update') {
        this.getAllUsers();
        this.sendNotifications();
      }
    })
  }

  deleteUser(username: string) {
    this.adminService.deleteUser(username).subscribe({
      next:(res) => {
        alert ("User successfully deleted!");
        this.getAllUsers();
      },
      error:()=> {
        alert("Error while deleting user!");
      }
    })
  }

  
  searchUser(username:string) {
    this.adminService.searchUser(username).subscribe({
      next:(res) => {
        alert ("The searched user was found!");
        this.datasource = res;
      },
      error:()=> {
        alert("Error while searching user!");
      }
    })
  }

  filterUsers() {
    this.adminService.filterUsers().subscribe({
      next:(res) => {
        alert ("The filtered users are shown!");
        this.datasource = res;
      },
      error:()=> {
        alert("Error while filtering user!");
      }
    })
  }

  translate() {
    localStorage.setItem('language', this.language);
    console.log(localStorage.getItem('language'));
    window.location.reload();
  }
  logout() {
    this.authService.logout();
  }

}
