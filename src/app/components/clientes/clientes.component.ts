import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Clientes } from 'src/app/models/Clientes';
import { Paises } from 'src/app/models/Paises';
import { ClientesService } from 'src/app/service/clientes.service';
import { PaisesService } from 'src/app/service/paises.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit{
    titulo = "Clientes";
    dato: Clientes;
    paises: Paises[];
    estado: string = "";

    formulario:FormGroup;
    enviando: boolean = false;

    constructor(
        private _paisesService: PaisesService,
        private _clientesService:ClientesService,
        private _fb:FormBuilder
    ) {}

    ngOnInit(): void {
        this.fpaises();
        this.formulario = new FormGroup({
            Nombre: new FormControl(),
            Apellido: new FormControl(),
            Telefono: new FormControl(),
            Direccion: new FormControl(),
            PaisID: new FormControl(),
        });
    }

    fpaises(){
        this._paisesService.obtenerPaises().subscribe( dato => {
            this.paises = dato
        })
    }

    faceptar(): void{
        this.enviando = true;
        this.dato.Nombre = this.formulario.value.Nombre;
        this.dato.Apellido = this.formulario.value.Apellido;
        this.dato.Telefono = this.formulario.value.Telefono;
        this.dato.Direccion = this.formulario.value.Direccion;
        this.dato.PaisID = this.formulario.value.PaisID;

        this._clientesService.guardarCliente(this.dato).subscribe( dato => {
            console.log(dato);
        });
        console.log(JSON.stringify(this.dato));

    }

}
