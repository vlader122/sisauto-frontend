import { Injectable } from '@angular/core';
import { Ordenes } from '../models/Ordenes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  ruta = `${environment.rutaBackend}/api/Ordenes`;
  constructor(private _httpClient:HttpClient) { }

  obtenerOrdenes(): Observable<Ordenes[]> {
    return this._httpClient.get<Ordenes[]>(this.ruta);
  }

  guardarOrden(orden:Ordenes): Observable<any> {
    return this._httpClient.post<void>(this.ruta,orden);
  }

  eliminarOrden(id:number): Observable<any> {
    return this._httpClient.delete<any>(this.ruta + '/' + id);
  }

  actualizarOrden(orden:Ordenes): Observable<any> {
    return this._httpClient.put<void>(this.ruta + '/' + orden.OrdenID,orden);
  }
}
