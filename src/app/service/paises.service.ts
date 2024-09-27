import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paises } from '../models/Paises';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  ruta = `${environment.rutaBackend}/api/Paises`;
  constructor(private _httpClient: HttpClient) { }

  obtenerPaises(): Observable<Paises[]> {
    return this._httpClient.get<Paises[]>(this.ruta);
  }

  guardarPais(pais:Paises): Observable<any> {
    return this._httpClient.post<void>(this.ruta,pais);
  }
}
