import { Injectable } from '@angular/core';
import { Servicios } from '../models/Servicios';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  ruta = `${environment.rutaBackend}/Servicios`;
  constructor(private _httpClient:HttpClient) { }

  obtenerServicios(): Observable<Servicios[]> {
    return this._httpClient.get<Servicios[]>(this.ruta);
  }

  guardarServicio(servicio:Servicios): Observable<any> {
    return this._httpClient.post<void>(this.ruta,servicio);
  }

  eliminarServicio(id:number): Observable<any> {
    return this._httpClient.delete<any>(this.ruta + '/' + id);
  }

  actualizarServicio(servicio:Servicios): Observable<any> {
    return this._httpClient.put<void>(this.ruta + '/' + servicio.ServicioID,servicio);
  }
}
