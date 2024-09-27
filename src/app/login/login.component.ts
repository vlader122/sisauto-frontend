import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AccesosService } from '../service/accesos.service';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import Mensajes from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PasswordModule,
    ReactiveFormsModule,
    ButtonModule
    ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
    private email: string = '';
    private password: string = '';

    token: string = environment.token;

    formulario: FormGroup;
    enviado: boolean = false;
    error: string = '';
    estado: boolean = false;

    constructor(
        private _accesosService: AccesosService,
        private _redirect: Router,
    ){
        this.formulario = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        })
    }

    faceptar(){
        this.estado = true;
        this.enviado = true;
        this.email = this.formulario.value.email;
        this.password = this.formulario.value.password;

        this._accesosService.accesos(this.email, this.password).subscribe(
            (data) => {
                if(data){
                    const cadenaToken = JSON.stringify(data);
                    const token = JSON.parse(cadenaToken).accessToken;
                    sessionStorage.setItem(this.token, token);
                    this.estado = false;
                    Mensajes.fire('Bienvenido!', '', 'success');
                    this._redirect.navigateByUrl('/');
                }
            },
            (err) => {
                if(err.status === 0){
                    Mensajes.fire('Error del Servidor!', 'Intente mas tarde', 'warning');
                    console.log("error de coneccion 500");
                }
                if(err.status === 401){
                    Mensajes.fire('Verifica tus datos!', 'Usuario o contraseña incorrectos', 'warning');
                    console.log("credenciales incorrectos");
                }
            }
        )

    }
}
