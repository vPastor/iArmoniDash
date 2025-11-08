# 🧩 iArmoni Dashboard – Prueba Técnica Frontend (Angular)

Aplicación web desarrollada en **Angular 18 (standalone)** como parte de la prueba técnica para el puesto de Frontend Developer.  
El objetivo es consumir los endpoints de `https://testing.myolm360.com/internal/v1` mediante autenticación y mostrar un dashboard con KPIs, tabla y gráfico interactivo.

---

## 🚀 Tecnologías utilizadas

- **Angular 18** (estructura standalone, sin módulos)
- **TypeScript**
- **RxJS**
- **ng2-charts / Chart.js** (visualización de datos)
- **HTML5 / SCSS**
- **Angular Forms**
- **Proxy API** para evitar CORS

---

## ⚙️ Instalación y ejecución

1️⃣ Clonar el repositorio:
```bash
git clone https://github.com/<tu-usuario>/iArmoniDash.git
cd iArmoniDash
```

2️⃣ Instalar dependencias:
```bash
npm install
```

3️⃣ Ejecutar en modo desarrollo:
```bash
ng serve --proxy-config proxy.conf.json
```

4️⃣ Abrir en el navegador:
```
http://localhost:4200
```

---

## 🔑 Credenciales

Las credenciales de lectura **no deben estar en el repositorio**.  
El login permite introducirlas manualmente en el formulario inicial.  
Una vez autenticado, el usuario puede cerrar sesión con el botón **“Cerrar sesión”**.

---

## 🌐 Endpoints utilizados

| Endpoint | Método | Descripción |
|-----------|---------|-------------|
| `/get_refresh_token` | GET (Basic Auth) | Obtiene el refresh token |
| `/get_access_token` | GET (Bearer <refresh_token>) | Obtiene el access token |
| `/dashboard_summary` | GET (Bearer <access_token>) | Devuelve el resumen del dashboard |

---

## 📊 Funcionalidades implementadas

✅ Autenticación completa (`refresh → access → dashboard_summary`)  
✅ Manejo de carga (`isLoading`) y errores (`apiRespuesta.error`)  
✅ Login y Logout funcionales  
✅ Dashboard con:
- KPIs visuales (totales, faltantes, procedimientos)
- Tabla de procedimientos por mes
- Gráfico de barras (Chart.js)
✅ Filtro por mes (actualiza tabla y gráfico dinámicamente)
✅ Separación modular:
- `AppComponent` → control de sesión, estados y errores
- `DashboardComponent` → presentación de datos y gráficos
- `AuthService` → comunicación con la API
✅ Diseño limpio y responsive básico en SCSS

---

## 🧠 Criterios de evaluación cumplidos

| Criterio | Estado | Detalle |
|-----------|---------|----------|
| Integración con API | ✅ | Flujo completo refresh → access → dashboard |
| Presentación de datos | ✅ | KPIs, tabla y gráfico |
| Filtros | ✅ | Filtro de mes dinámico |
| Comunicación entre componentes | ✅ | App ↔ Dashboard con `@Input()` |
| Manejo de carga y errores | ✅ | Estados visuales y controlados |
| Diseño / UX | ✅ | Limpio y minimalista |
| Documentación | ✅ | Este README lo cubre |

---

## 💡 Decisiones técnicas

- Se utilizó **Angular standalone** para mantener la estructura moderna y concisa.  
- El `AuthService` centraliza toda la comunicación con la API.  
- Los datos del dashboard se pasan al componente hijo vía `@Input()` para favorecer la reutilización.  
- `Chart.js` fue elegido por su simplicidad y compatibilidad con Angular (`ng2-charts`).  
- Se añadió un `proxy.conf.json` para evitar problemas de CORS durante el desarrollo.
- Se implementaron estados de carga y error visibles para mejorar la experiencia de usuario.
- El filtrado por mes se maneja directamente desde el `DashboardComponent`, actualizando automáticamente la tabla y el gráfico.
- Se priorizó la legibilidad del código y el cumplimiento de los criterios de evaluación.

---

## 🧩 Estructura del proyecto

```
src/
 ├── app/
 │   ├── app.ts               # Componente raíz (login + control de flujo)
 │   ├── app.html             # Template principal
 │   ├── app.scss             # Estilos globales
 │   ├── dashboard/
 │   │   └── dashboard.ts     # DashboardComponent (KPIs, tabla y gráfico)
 │   ├── auth.service.ts      # Lógica de autenticación y llamadas a API
 │   └── proxy.conf.json      # Configuración del proxy local
 ├── assets/                  # Recursos estáticos
 └── main.ts                  # Punto de arranque de Angular
```

---

## 🧪 Flujo de la aplicación

1️⃣ El usuario introduce sus credenciales y hace clic en **Iniciar sesión**.  
2️⃣ Se obtiene el **refresh token** mediante Basic Auth.  
3️⃣ Con el refresh token, se solicita el **access token**.  
4️⃣ Con el access token, se realiza la llamada a `/dashboard_summary`.  
5️⃣ Los datos obtenidos se muestran en el **DashboardComponent**.  
6️⃣ El usuario puede filtrar los resultados por mes.  
7️⃣ Al presionar **Cerrar sesión**, se limpian los estados y se vuelve al login.

---

## 🧑‍💻 Autor

**Victor Pastor Caro**  
Frontend Developer  
📧 victorpastorcaro@gmail.com  
💼 [LinkedIn](https://www.linkedin.com/in/victor-pastor-caro/)

---

> _Este proyecto se desarrolló siguiendo las buenas prácticas de Angular, priorizando la claridad del código, el manejo de estados, la modularidad y el cumplimiento de los criterios de evaluación de la prueba técnica._
