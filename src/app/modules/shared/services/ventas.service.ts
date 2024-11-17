import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const url = "http://localhost:8080/api/v2";

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http:HttpClient) { }
  getProducts(){
    const endpoint =`${url}/Obtener`;
    return this.http.get(endpoint);
  }
}
