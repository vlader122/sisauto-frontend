import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AccesosService } from "../service/accesos.service";

export const AccesosGuard: CanActivateFn = (route, state) => {
    const _accesosService = inject(AccesosService);
    const _ruta = inject(Router);

    const token = _accesosService.obtenerToken();

    if(!token){
        sessionStorage.clear();
        _ruta.navigateByUrl('/accesos');
        return false;
    } else{
        return true;
    }
};
