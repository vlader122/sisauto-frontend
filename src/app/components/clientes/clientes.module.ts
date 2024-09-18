import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    ClientesRoutingModule,
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
],
    declarations: [ClientesComponent]
})
export class ClientesModule { }
