import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeycloakAdminService {
  private adminUrl = 'http://localhost:8082/auth/admin/realms/inventory';  // Cambia esto según tu configuración de Keycloak
  private token = 'TOKEN_DE_ADMINISTRADOR';  // Aquí deberías implementar la lógica para obtener el token de admin

  constructor(private http: HttpClient) {}

  // Método para crear un nuevo usuario
  createUser(userData: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.adminUrl}/users`, userData, { headers });
  }

  // Método para cambiar la contraseña de un usuario
  changePassword(userId: string, newPassword: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    const passwordData = {
      type: 'password',
      value: newPassword,
      temporary: false,
    };

    return this.http.put(
      `${this.adminUrl}/users/${userId}/reset-password`,
      passwordData,
      { headers }
    );
  }
}
