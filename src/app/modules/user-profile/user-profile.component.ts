import { Component, OnInit, Renderer2 } from '@angular/core';
import { UserProfileService } from '../shared/services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userProfile: any = null;
  editMode: boolean = false;
  darkMode: boolean = false;

  constructor(private userProfileService: UserProfileService, private renderer: Renderer2) {}

  async ngOnInit() {
    this.userProfile = await this.userProfileService.getUserProfile();
    this.applyBackground();  // Aplica el fondo al iniciar
  }

  enableEditMode() {
    this.editMode = true;
  }

  saveProfile() {
    this.userProfileService.updateUserProfile(this.userProfile);
    this.editMode = false;
  }

  // Función para alternar entre el tema claro y oscuro
  toggleTheme() {
    this.darkMode = !this.darkMode;
    
    if (this.darkMode) {
      this.renderer.addClass(document.body, 'dark-theme');
      this.renderer.setStyle(document.body, 'background-image', 'url(assets/dark-background.jpg)');  // Fondo para tema oscuro
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
      this.renderer.setStyle(document.body, 'background-image', 'url(assets/light-background.jpg)');  // Fondo para tema claro
    }
  }

  // Aplica el fondo predeterminado
  applyBackground() {
    const defaultBackground = this.darkMode ? 'assets/dark-background.jpg' : 'assets/light-background.jpg';
    this.renderer.setStyle(document.body, 'background-image', `url(${defaultBackground})`);
    this.renderer.setStyle(document.body, 'background-size', 'cover');
    this.renderer.setStyle(document.body, 'background-repeat', 'no-repeat');
  }
}
