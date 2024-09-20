import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Clientes } from 'src/app/models/Clientes';
import { Paises } from 'src/app/models/Paises';
import { ClientesService } from 'src/app/service/clientes.service';
import { PaisesService } from 'src/app/service/paises.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './clientes.component.html',
  providers: [MessageService]
})
export class ClientesComponent implements OnInit{
    titulo = "Clientes";
    dato: Clientes = new Clientes;
    paises: Paises[];
    estado: string = "";
    clientes: Clientes[] = [];
    clienteIdEliminar: number;

    clientesDialog: boolean = false;
    eliminarClienteDialog: boolean = false;

    formulario: FormGroup;
    enviando: boolean = false;
    constructor(
        private _paisesService: PaisesService,
        private _clientesService:ClientesService,
        private _fb:FormBuilder,
        private _messageService:MessageService,
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

    abrirDialog(){
        this.clientesDialog = true;
    }

    ocultarDialog(){
        this.clientesDialog = false;
    }

    fpaises(){
        this._paisesService.obtenerPaises().subscribe( dato => {
            this.paises = dato
        })
    }

    fclientes(){
        this._clientesService.obtenerClientes().subscribe( dato => {
            this.clientes = dato
        })
    }

    faceptar() {
        this.dato.Nombre = this.formulario.value.nombre;
        this.dato.Apellido = this.formulario.value.apellido;
        this.dato.Direccion = this.formulario.value.direccion;
        this.dato.Telefono = this.formulario.value.telefono;
        this.dato.PaisID = this.formulario.value.paisID;

        this._clientesService.guardarCliente(this.dato).subscribe( dato => {
            this.fclientes();
        });
        this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Cliente Añadido', life: 3000 });

        this.clientesDialog = false;
        this.formulario.reset();
    }

    feliminar(id: number){
        this.eliminarClienteDialog = true;
        this.clienteIdEliminar = id;
    }

    confirmDelete() {

        this.eliminarClienteDialog = false;

        this._clientesService.eliminarCliente(this.clienteIdEliminar).subscribe(dato => {
            this.fclientes();
        });
        this._messageService.add({ severity: 'warn', summary: 'Correcto', detail: 'Cliente Eliminado', life: 3000 });
    }

}
