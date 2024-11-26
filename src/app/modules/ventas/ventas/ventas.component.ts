



import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar'; 
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VentasService } from '../../shared/services/ventas.service';
import { UtilService } from '../../shared/services/util.service';
import { KeycloakService } from 'keycloak-angular';
import { NewVentaComponent } from '../new-venta/new-venta.component';



@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit { 
  private VentasService = inject(VentasService)
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialog);
  private key = inject(KeycloakService);
  private util = inject(UtilService);
  isAdmin:any;

  ngOnInit(): void {
    this.getProducts();
    console.log(this.key.getUserRoles());
    this.isAdmin = this.util.isAdmin();
  }

  getProducts(){
    this.VentasService.getProducts().subscribe((resp:any) =>{
      console.log("Respuesta productos",resp);
    },(error:any)=>{
      console.log("Respuesta no obtenida",error);
    })
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  public dialog = inject(MatDialog);

  openProductDialog() {
    const dialogRef = this.dialogRef.open(NewVentaComponent, {
      width: '800px'
    });
  
    dialogRef.afterClosed().subscribe((venta) => {
      if (venta) {
        this.VentasService.saveVenta(venta).subscribe(
          () => this.openSnackBar('Venta guardada con éxito', 'Éxito'),
          (error) => this.openSnackBar('Error al guardar la venta', 'Error')
        );
      }
    });
  }


  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  

  

}

