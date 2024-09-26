import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { OrdenesRoutingModule } from './ordenes-routing.module';
import { OrdenesComponent } from './ordenes.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DividerModule } from 'primeng/divider';


@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    OrdenesRoutingModule,
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    AutoCompleteModule,
    DividerModule,
],
    declarations: [OrdenesComponent]
})
export class OrdenesModule { }
