import { Injectable } from '@angular/core';
import { Clientes } from '../models/Clientes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  ruta = `${environment.rutaBackend}/Clientes`;
  constructor(private _httpClient:HttpClient) { }

  obtenerClientes(): Observable<Clientes[]> {
    return this._httpClient.get<Clientes[]>(this.ruta);
  }

  guardarCliente(cliente:Clientes): Observable<any> {
    return this._httpClient.post<void>(this.ruta,cliente);
  }

  eliminarCliente(id:number): Observable<any> {
    return this._httpClient.delete<any>(this.ruta + '/' + id);
  }

  actualizarCliente(cliente:Clientes): Observable<any> {
    return this._httpClient.put<void>(this.ruta + '/' + cliente.ClienteID,cliente);
  }
}
