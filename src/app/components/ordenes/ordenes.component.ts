import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Clientes } from 'src/app/models/Clientes';
import { DetalleOrdenes } from 'src/app/models/DetalleOrdenes';
import { Ordenes } from 'src/app/models/Ordenes';
import { Servicios } from 'src/app/models/Servicios';
import { ClientesService } from 'src/app/service/clientes.service';
import { OrdenesService } from 'src/app/service/ordenes.service';
import { ServiciosService } from 'src/app/service/servicios.service';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
  selector: 'app-orden',
  templateUrl: './ordenes.component.html',
  providers: [MessageService]
})
export class OrdenesComponent implements OnInit{
    titulo = " Orden";
    dato: Ordenes = new Ordenes;
    clientes: Clientes[];
    servicios: Servicios[];

    detalleOrdenes: DetalleOrdenes[] = [];

    estado: string = "";
    ordenes: Ordenes[] = [];
    operacion: string = "";
    ordenesDialog: boolean = false;
    eliminarOrdenDialog: boolean = false;

    clientesFiltrados: any[] | undefined;
    serviciosFiltrados: any[] | undefined;

    formulario: FormGroup;
    enviando: boolean = false;
    constructor(
        private _ordenesService:OrdenesService,
        private _clientesService:ClientesService,
        private _serviciosService:ServiciosService,
        private _messageService:MessageService,
    ) {
        this.formulario = new FormGroup({
            detalleOrdenesID: new FormControl(),
            clienteID: new FormControl('',[Validators.required,Validators.minLength(2)]),
            servicio: new FormControl('',[Validators.required,Validators.minLength(2)]),
            cantidad: new FormControl('',[Validators.required]),
            subtotal: new FormControl('',[Validators.required]),
            fecha: new FormControl('',[Validators.required]),
            total: new FormControl('',[Validators.required]),
        })
    }

    ngOnInit(): void {
        this.fordenes();
    }

    abrirDialog(){
        this.operacion = "Nuevo";
        this.fclientes();
        this.fservicios();
        this.ordenesDialog = true;
    }

    ocultarDialog(){
        this.ordenesDialog = false;
    }

    fclientes(){
        this._clientesService.obtenerClientes().subscribe( dato => {
            this.clientes = dato
        })
    }

    fservicios(){
        this._serviciosService.obtenerServicios().subscribe( dato => {
            this.servicios = dato
        })
    }

    fordenes(){
        this._ordenesService.obtenerOrdenes().subscribe( dato => {
            this.ordenes = dato
        })
    }

    faceptar() {
        this.dato.ClienteID = this.formulario.value.clienteID;
        this.dato.Fecha = this.formulario.value.fecha;
        this.dato.Total = this.formulario.value.total;

        if(this.operacion == "Nuevo"){
            this._ordenesService.guardarOrden(this.dato).subscribe( dato => {
                this.fordenes();
            });
            this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Orden Añadido', life: 3000 });
        } else{
            this._ordenesService.actualizarOrden(this.dato).subscribe(dato => {
                this.fordenes();
            });
            this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Orden Actualizado', life: 3000 });
        }

        this.ordenesDialog = false;
        this.formulario.reset();
    }

    feliminar(orden){
        this.dato.OrdenID = orden.ordenID;
        this.eliminarOrdenDialog = true;
    }

    feditar(orden){
        this.dato.OrdenID = orden.ordenID;
        this.operacion = "Editar";
        this.ordenesDialog = true;
        this.formulario.patchValue({
            nombre: orden.nombre,
            apellido: orden.apellido,
            direccion: orden.direccion,
            telefono: orden.telefono,
            paisID: orden.paisID,
        });
    }

    confirmDelete() {

        this.eliminarOrdenDialog = false;

        this._ordenesService.eliminarOrden(this.dato.OrdenID).subscribe(dato => {
            this.fordenes();
        });
        this._messageService.add({ severity: 'warn', summary: 'Correcto', detail: 'Orden Eliminado', life: 3000 });
    }

    clientesFiltro(event: AutoCompleteCompleteEvent){
        let filtrados: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.clientes as any[]).length; i++) {
            let cliente = (this.clientes as any[])[i];
            if (cliente.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtrados.push(cliente);
            }
        }

        this.clientesFiltrados = filtrados;
    }

    serviciosFiltro(event: AutoCompleteCompleteEvent){
        let filtrados: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.servicios as any[]).length; i++) {
            let servicio = (this.servicios as any[])[i];
            if (servicio.nombreServicio.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtrados.push(servicio);
            }
        }

        this.serviciosFiltrados = filtrados;
    }

    calcularSubtotal(){
        const cantidad = this.formulario.value.cantidad;
        const costoServicio = this.formulario.value.servicio.costo;

        const subtotal = cantidad * costoServicio;

        this.formulario.patchValue({ subtotal: subtotal });
    }

    addDetalle(){
        this.formulario.value.detalleOrdenesID = this.detalleOrdenes.length;
        this.detalleOrdenes.push(this.formulario.value);
    }

    quitarDetalle(){
        this.detalleOrdenes.splice(this.formulario.value.detalleOrdenesID, 1);
    }
}
