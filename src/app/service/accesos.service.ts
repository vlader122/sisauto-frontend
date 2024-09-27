import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccesosService {

    rutaApi = `${environment.rutaBackend}/login`;

    token: string = environment.token;

  constructor(
    private _httpClient: HttpClient
  ) { }

  accesos(email: string, password:string){
    const body = { email: email, password: password };
    return this._httpClient.post(this.rutaApi, body,
        {
            headers: new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8')
        }
    )
  }

  cerrarSession(){
    sessionStorage.clear();
  }

  obtenerToken(){
    var token = sessionStorage.getItem(this.token);
    if(token === null){
        token = '';
    }
    return token;
  }
}
