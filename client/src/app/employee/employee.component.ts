import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FloareFlorarie } from '../model/floare-florarie';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, throwError } from 'rxjs';
import {User} from "../model/user";

import { AdminService } from '../services/admin.service';
import { EmployeeService } from '../services/employee.service';
import { AddFlowerDialogComponent } from '../add-flower-dialog/add-flower-dialog.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  displayedColumns: string[] = ['denumire', 'culoare','pret', 'cantitate', 'disponibilitate', 'action'];
  filters : string[] = ['Color','Pret', 'Cantitate', 'Disponibilitate'];
  datasource: FloareFlorarie[] = [];
  filter= '';
  value='';
  florarie="Buchetino";
  reports: string[] =["JSON","XML","CSV"];
  languages: string[] = ["RO", "EN", "FR"];
  language="";
  report = "";
  filterValue='';
  showCharts = false;
  constructor(private httpClient :HttpClient, public dialog: MatDialog, private authService : AuthenticationService, private employeeService :EmployeeService,
    private translateService:TranslateService) { 

      this.translateService.setDefaultLang('RO');
      this.translateService.use(localStorage.getItem('language') || 'RO');
    }

  ngOnInit(): void {
    this.getAllFlowers();
    this.language = localStorage.getItem('language') || "RO";
  }
  
  openDialog(){
    const dialogRef = this.dialog.open(AddFlowerDialogComponent,{
      width:'30%'
    }).afterClosed().subscribe(val =>{
      if(val=='save') {
        this.getAllFlowers();
      }
    });
  }

  getAllFlowers(){
    this.employeeService.getAllFlowers(this.florarie).subscribe(
      response =>{

        this.datasource = response;
      }
    )
  }


  searchFlower(denumire:string) {
      this.employeeService.searchFlower(denumire).subscribe({
        next:(res) => {
          alert ("The searched flower was found!");
          console.log(res);
          this.datasource = res;
        },
        error:()=> {
          alert("Error while searching flower!");
        }
      })
  }

  editFlower(row: any){
    console.log(row);
    this.dialog.open(AddFlowerDialogComponent,{
      width:'30%',
      data : row
    }).afterClosed().subscribe(val=> {
      if(val=='update') {
        this.getAllFlowers();
      }
    })
  }

  addFlower() {
    const dialogRef = this.dialog.open(AddFlowerDialogComponent,{
      width:'30%'
    }).afterClosed().subscribe(val =>{
      if(val=='save') {
        this.getAllFlowers();
      }
    });
  }

  deleteFlower(denumire:string, culoare:string) {
    this.employeeService.deleteFlower(this.florarie,culoare, denumire).subscribe({
      next:(res) => {
        alert ("Flower successfully deleted!");
        this.getAllFlowers();
      },
      error:()=> {
        alert("Error while deleting flower!");
      }
    })
  }

  filtering() {
    if(this.filter == "Color") {
      this.filterByColor();
    }

    if(this.filter == "Pret") {
      this.filterByPret();
    }

    if(this.filter == "Cantitate") {
      this.filterByCantitate();
    }

    if(this.filter == "Disponibilitate") {
      this.filterByDisponibilitate();
    }

    this.showCharts = !this.showCharts;
  }

  filterByPret(){
    console.log("pret");
    this.employeeService.filterByPret(this.florarie, JSON.parse(this.filterValue)).subscribe({
      next:(res) => {
        alert ("The flowers were filtered!");
        console.log(res);
        this.datasource = res;
      },
      error:()=> {
        alert("Error while filtering flowers!");
      }
    })
  }

  filterByColor(){
    this.employeeService.filterByColor(this.florarie, this.filterValue).subscribe({
      next:(res) => {
        alert ("The flowers were filtered!");
        console.log(res);
        this.datasource = res;
      },
      error:()=> {
        alert("Error while filtering flowers!");
      }
    })
  }

  filterByDisponibilitate(){
    console.log("disponibilitate");
    this.employeeService.filterByDisponibilitate(this.florarie, JSON.parse(this.filterValue)).subscribe({
      next:(res) => {
        alert ("The flowers were filtered!");
        console.log(res);
        this.datasource = res;
      },
      error:()=> {
        alert("Error while filtering flowers!");
      }
    })
  }

  filterByCantitate(){
    console.log("ccantitate");
    this.employeeService.filterByCantitate(this.florarie, JSON.parse(this.filterValue)).subscribe({
      next:(res) => {
        alert ("The flowers were filtered!");
        console.log(res);
        this.datasource = res;
      },
      error:()=> {
        alert("Error while filtering flowers!");
      }
    })
  }

  createReport() {
    this.employeeService.createReport(this.florarie, this.report).subscribe({
      next:(res) => {
        alert ("Report successfully created!");
        this.getAllFlowers();
      },
      error:()=> {
        alert("Error while craeting report!");
      }
    });
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
