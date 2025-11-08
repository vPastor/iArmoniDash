import { 
  ApplicationConfig, 
  provideBrowserGlobalErrorListeners, 
  provideZoneChangeDetection 
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // 👈 import nuevo
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),                  // manejo global de errores
    provideZoneChangeDetection({ eventCoalescing: true }), // optimiza detección de cambios
    provideRouter(routes),                                 // enrutamiento
    provideHttpClient()                                    // 👈 habilita HttpClient en toda la app
  ]
};