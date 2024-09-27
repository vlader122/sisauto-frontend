import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AccesosService } from "../service/accesos.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AccesosInterceptor implements HttpInterceptor {

    token: string = environment.token;

    constructor(
        private _accesosService: AccesosService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this._accesosService.obtenerToken();

        if(!request.url.includes('/register') && token) {
            const peticionConToken = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })
            return next.handle(peticionConToken);
        } else {
            return next.handle(request);
        }
    }
}
