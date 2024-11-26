

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VentasComponent } from './ventas/ventas.component';
import { NewVentaComponent } from './new-venta/new-venta.component';
import { MatCardModule } from '@angular/material/card';





@NgModule({
  declarations: [
    VentasComponent,
    NewVentaComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
  ]
})
export class VentasModule { }
