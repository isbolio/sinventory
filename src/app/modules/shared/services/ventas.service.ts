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
  saveVenta(venta: any) {
    const endpoint = `${url}/GuardarVenta`; 
    return this.http.post(endpoint, venta);
  }
  buscarProductos(name: string) {
    const endpoint = `${url}/productos/filter/${name}`;
    return this.http.get(endpoint);
  }
  
  
}
