// Exportamos un objeto de configuración para este entorno (desarrollo)
export const environment = {
  production: false,   // bandera útil si luego quieres condicionar logs, etc.
  apiBase: '/internal/v1' // base de la API; pasa por el proxy a testing.myolm360.com/v1
};