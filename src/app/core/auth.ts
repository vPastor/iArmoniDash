// src/app/core/auth.ts
import { Injectable } from '@angular/core';                         // permite inyección del servicio
import { HttpClient, HttpHeaders } from '@angular/common/http';     // cliente HTTP y cabeceras
import { environment } from '../../environments/environment';          // tu environment (está en app/environments)

@Injectable({ providedIn: 'root' })                                  // disponible en toda la app
export class AuthService {
  constructor(private http: HttpClient) {}                           // inyectamos HttpClient

  /** Paso 1: obtener refresh token con Basic Auth (usuario:contraseña) */
  getRefreshToken(user: string, pass: string) {
    const basic = btoa(`${user}:${pass}`);                           // "user:pass" -> Base64
    const headers = new HttpHeaders({ Authorization: `Basic ${basic}` });

    // GET /internal/v1/get_refresh_token  -> { token, duration, language }
    return this.http.get<{ duration: number; language: string; token: string }>(
      `${environment.apiBase}/get_refresh_token`,
      { headers }
    );
  }

  /** Paso 2: obtener access token usando el refresh como Bearer */
  getAccessToken(refreshToken: string) {
    const headers = new HttpHeaders({ Authorization: `Bearer ${refreshToken}` });

    // GET /internal/v1/get_access_token -> { token, duration, language }
    return this.http.get<{ duration: number; language: string; token: string }>(
      `${environment.apiBase}/get_access_token`,
      { headers }
    );
  }

  /** Paso 3: llamar al dashboard con el access token */
getDashboardSummary(accessToken: string) {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/json'
  });

  return this.http.get<any>(
    `${environment.apiBase}/dashboard_summary`,
    { headers }
  );
}

}