import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FloareFlorarie } from '../model/floare-florarie';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient : HttpClient) { }

  headers :any;

  ngOnInit(): void {
    const lang = localStorage.getItem('language') || 'RO';
    this.headers = new HttpHeaders({
      'Accept-Language': lang    })
  }

  addFlower(floare: FloareFlorarie, florarie: string): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8085/addFlower/'+ florarie, floare);
  }

  getAllFlowers(florarie: string):Observable<any> {
    return this.httpClient.get<any>('http://localhost:8085/allFlowers/'+florarie,{
      headers:this.headers
    });
  }

  updateFlower(floare: FloareFlorarie, florarie:string, culoare:string, denumire:string) {
    return this.httpClient.put<any>('http://localhost:8085/updateFlower/'+florarie+'/'+denumire+'/'+culoare, floare);
  }

  deleteFlower(florarie:string, culoare:string, denumire:string) {
    return this.httpClient.delete<any>('http://localhost:8085/deleteFlower/'+florarie+'/'+denumire+'/'+culoare);
  
  }

  searchFlower(denumire: string):Observable<any> {
    return this.httpClient.get<any>('http://localhost:8085/searchFlower/'+denumire);
  }

  filterByColor(florarie:string, culoare:string): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8085/filterByColor/'+ florarie +'/' + culoare);
  }

  filterByPret(florarie:string, pret:number): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8085/filterByPret/'+ florarie +'/' + pret);
  }

  filterByCantitate(florarie:string, cantitate:number): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8085/filterByCantitate/'+ florarie +'/' + cantitate);
  }

  filterByDisponibilitate(florarie:string, disponibilitate:boolean): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8085/filterByDisponibilitate/'+ florarie +'/' + disponibilitate);
  }

  createReport(florarie: string, type: string) {
    return this.httpClient.get<any>('http://localhost:8085/reports/'+ florarie +'/' + type);
  }

}
