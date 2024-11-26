import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { VentasService } from '../../shared/services/ventas.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-venta',
  templateUrl: './new-venta.component.html',
  styleUrls: ['./new-venta.component.css']
})
export class NewVentaComponent implements OnInit {
  ventaForm!: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'actions'];
  dataSource = new MatTableDataSource<any>();
  selectedProducts: any[] = [];
  total: number = 0;

  private fb = inject(FormBuilder);
  private ventasService = inject(VentasService);
  private dialogRef = inject(MatDialogRef<NewVentaComponent>);
  public data = inject(MAT_DIALOG_DATA);

  constructor() {
    this.ventaForm = this.fb.group({
      searchTerm: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.ventasService.getProducts().subscribe(
      (data: any) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  buscar(): void {
    const termino = this.ventaForm.get('searchTerm')?.value;
    if (termino?.trim().length === 0) {
      return this.loadProducts();
    }

    this.ventasService.buscarProductos(termino).subscribe(
      (data: any) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error al buscar productos:', error);
      }
    );
  }

  addProduct(product: any): void {
    const existingProduct = this.selectedProducts.find((p) => p.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.selectedProducts.push({ ...product, quantity: 1 });
    }

    this.calculateTotal();
  }

  removeProduct(productId: number): void {
    this.selectedProducts = this.selectedProducts.filter((p) => p.id !== productId);
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.selectedProducts.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
  }

  saveVenta(): void {
    const venta = {
      products: this.selectedProducts,
      total: this.total,
      date: new Date()
    };

    this.dialogRef.close(venta);
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
