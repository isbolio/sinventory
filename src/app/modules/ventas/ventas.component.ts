import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar'; 
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VentasService } from '../shared/services/ventas.service';
import { UtilService } from '../shared/services/util.service';
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent { 
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialog);
  private key = inject(KeycloakService);
  private util = inject(UtilService);
  isAdmin:any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  public dialog = inject(MatDialog);

}

