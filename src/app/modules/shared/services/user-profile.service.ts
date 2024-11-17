import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para llamadas a un backend
import { KeycloakProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private keycloakService: KeycloakService, private http: HttpClient) {}

  // Método para obtener el perfil del usuario desde Keycloak
  async getUserProfile(): Promise<KeycloakProfile> {
    const profile = await this.keycloakService.loadUserProfile();
    return profile;
  }

  // Método para actualizar el perfil del usuario en Keycloak o el backend
  async updateUserProfile(newProfile: any): Promise<any> {
    try {
      // Lógica para actualizar el perfil en Keycloak o enviar a un backend si es necesario
      // Keycloak no permite la actualización directa del perfil del usuario.
      // Normalmente, tendrías que hacer esto desde un backend que se comunique con Keycloak.
      return this.http.put('/api/user/profile', newProfile).toPromise();
    } catch (error) {
      console.error('Error al actualizar el perfil', error);
      throw error;
    }
  }

  // Método para obtener el estado de las notificaciones por correo desde el backend
  async getEmailNotifications(): Promise<boolean> {
    try {
      const response = await this.http.get<boolean | undefined>('/api/user/email-notifications').toPromise();
      return response ?? false; // Si response es undefined, devuelve false
    } catch (error) {
      console.error('Error al obtener las notificaciones', error);
      return false; // Si ocurre un error, devolvemos false por defecto
    }
  }
  

  // Método para actualizar el estado de las notificaciones en el backend
  async updateEmailNotifications(enabled: boolean): Promise<any> {
    try {
      return this.http.put('/api/user/email-notifications', { enabled }).toPromise();
    } catch (error) {
      console.error('Error al actualizar las notificaciones', error);
      throw error;
    }
  }
}
