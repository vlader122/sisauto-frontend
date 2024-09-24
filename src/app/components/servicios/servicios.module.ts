import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ServiciosRoutingModule } from './servicios-routing.module';
import { ServiciosComponent } from './servicios.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';



@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    ServiciosRoutingModule,
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    InputNumberModule
],
    declarations: [ServiciosComponent]
})
export class ServiciosModule { }
