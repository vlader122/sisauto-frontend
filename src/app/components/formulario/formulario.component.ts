import { Component } from '@angular/core';
import { Contacto } from 'src/app/models/Contacto';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html'
})


export class FormularioComponent {
    nombre:string = "";
    correo:string = "";
    telefono:string = "";
    contacto:Contacto = new Contacto;
    contactos:Contacto[] = [];

    adicionar(){
        const nuevoContacto= new Contacto;
        nuevoContacto.nombre = this.nombre;
        nuevoContacto.correo=this.correo;
        nuevoContacto.telefono=this.telefono;
        console.log(nuevoContacto);

        this.contactos.push(nuevoContacto);
        this.nombre = "";
        this.correo = "";
        this.telefono = "";
    }
}
