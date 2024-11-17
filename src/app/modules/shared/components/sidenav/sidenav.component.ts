import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{

  mobileQuery: MediaQueryList;
  username: any;
  menuNav = [
    {name: "Perfil", route: "profile", icon:"person"},
    {name: "Home",route: "home", icon:"home"},
    {name: "Categorias",route: "category", icon:"category"},
    {name: "Productos",route: "product", icon:"production_quantity_limits"},
    {name: "Ayuda",route: "ayuda", icon:"help"},
    {name: "Ventas",route: "ventas", icon:"sale"}

  ]

  private keyloak = inject(KeycloakService);

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }
  ngOnInit(): void {
    this.username = this.keyloak.getUsername();
  }

  logout(){
    this.keyloak.logout();
  }

}
