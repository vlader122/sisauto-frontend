import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    clientes: Clientes[] = [];

    products: Clientes[] = [];
    cols: any[] = [];

    formulario: FormGroup;
    enviando: boolean = false;
    constructor(
        private _paisesService: PaisesService,
        private _clientesService:ClientesService,
        private _fb:FormBuilder
    ) {
        this.formulario = new FormGroup({
            nombre: new FormControl('',[Validators.required,Validators.minLength(2)]),
            apellido: new FormControl('',[Validators.required]),
            direccion: new FormControl,
            telefono: new FormControl,
            paisID: new FormControl('',[Validators.required])
        })
    }

    ngOnInit(): void {
        this.fpaises();
        this.fclientes();
    }

    fpaises(){
        this._paisesService.obtenerPaises().subscribe( dato => {
            this.paises = dato
        })
    }

    fclientes(){
        this._clientesService.obtenerClientes().subscribe( dato => {
            this.clientes = dato
            console.log(this.clientes);

        })
    }

    faceptar(): void{
        this.dato = new Clientes;
        this.dato.Nombre = this.formulario.value.nombre;
        this.dato.Apellido = this.formulario.value.apellido;
        this.dato.Direccion = this.formulario.value.direccion;
        this.dato.Telefono = this.formulario.value.telefono;
        this.dato.PaisID = this.formulario.value.paisID;

        this._clientesService.guardarCliente(this.dato).subscribe( dato => {
             console.log(dato);
        });

    }

}
