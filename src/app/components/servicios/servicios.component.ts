import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Servicios } from 'src/app/models/Servicios';
import { ServiciosService } from 'src/app/service/servicios.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicios.component.html',
  providers: [MessageService]
})
export class ServiciosComponent implements OnInit{
    titulo = "Servicio";
    dato: Servicios = new Servicios;
    servicios: Servicios[] = [];
    operacion: string = "";

    serviciosDialog: boolean = false;
    eliminarServicioDialog: boolean = false;

    formulario: FormGroup;
    enviando: boolean = false;
    constructor(
        private _serviciosService:ServiciosService,
        private _messageService:MessageService,
    ) {
        this.formulario = new FormGroup({
            nombreServicio: new FormControl('',[Validators.required,Validators.minLength(2)]),
            descripcion: new FormControl('',[Validators.required]),
            costo: new FormControl('',[Validators.required]),
        })
    }

    ngOnInit(): void {
        this.fservicios();
    }

    abrirDialog(){
        this.operacion = "Nuevo";
        this.serviciosDialog = true;
    }

    ocultarDialog(){
        this.serviciosDialog = false;
    }

    fservicios(){
        this._serviciosService.obtenerServicios().subscribe( dato => {
            this.servicios = dato
        })
    }

    faceptar() {
        this.dato.NombreServicio = this.formulario.value.nombreServicio;
        this.dato.Descripcion = this.formulario.value.descripcion;
        this.dato.Costo = this.formulario.value.costo;

        if(this.operacion == "Nuevo"){
            this._serviciosService.guardarServicio(this.dato).subscribe( dato => {
                this.fservicios();
            });
            this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Servicio Añadido', life: 3000 });
        } else{
            this._serviciosService.actualizarServicio(this.dato).subscribe(dato => {
                this.fservicios();
            });
            this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Servicio Actualizado', life: 3000 });
        }


        this.serviciosDialog = false;
        this.formulario.reset();
    }

    feliminar(servicio){
        this.dato.ServicioID = servicio.servicioID;
        this.dato.NombreServicio = servicio.nombreServicio;
        this.eliminarServicioDialog = true;
    }

    feditar(servicio){
        this.dato.ServicioID = servicio.servicioID;
        this.operacion = "Editar";
        this.serviciosDialog = true;
        this.formulario.patchValue({
            nombreServicio: servicio.nombreServicio,
            descripcion: servicio.descripcion,
            costo: servicio.costo,
        });
    }

    confirmDelete() {
        this.eliminarServicioDialog = false;
        this._serviciosService.eliminarServicio(this.dato.ServicioID).subscribe(dato => {
            this.fservicios();
        });
        this._messageService.add({ severity: 'warn', summary: 'Correcto', detail: 'Servicio Eliminado', life: 3000 });
    }

}
