# 🚀 OrangeHRM Test Automation Framework (UI & API)

Framework híbrido de automatización de pruebas (**E2E y API REST**) sobre la plataforma de RRHH **OrangeHRM Open Source**, desarrollado con **Playwright**, **TypeScript** y el patrón **Page Object Model (POM)**.

---

## 📌 Sobre OrangeHRM

**OrangeHRM Open Source** es una plataforma integral de gestión de recursos humanos (HRMS) utilizada mundialmente para administrar empleados, solicitudes, permisos y reclutamiento. Este framework de automatización está diseñado para validar tanto la experiencia del usuario en la interfaz gráfica (UI) como la integridad de las comunicaciones en segundo plano mediante su API REST.

### Características Principales:
* **Gestión de Entidad Empleado/Usuario:** Administración completa (CRUD) de credenciales y roles del sistema.
* **Módulos Integrados:** Automatización sobre flujos de *Admin*, *PIM*, *Maintenance*, *Claim* y el feed social *Buzz*.
* **Arquitectura Híbrida (UI + API):** Validación paralela mediante interfaz web e interacción directa con endpoints HTTP para máxima velocidad y fiabilidad en la preparación de datos.
* **Seguridad y Accesos por Rol:** Verificación de restricciones de acceso y re-autenticación en áreas sensibles.

---

## 🛠️ Tech Stack & Herramientas

* **Lenguaje:** TypeScript
* **Herramienta (UI & API):** Playwright Test
* **Patrón de Diseño:** Page Object Model (POM) & Component-Based Architecture
* **Reportes:** Allure Report & Playwright HTML Report
* **Gestión de Entorno:** `.env` (`dotenv`)

---

## 📌 Resumen Técnico & Buenas Prácticas

* **Page Object Model (POM) Modular:** Organización desacoplada mediante clases de página (`pages/`), componentes reutilizables (`components/`) y clientes HTTP dedicados (`src/api/`).
* **Autenticación Eficiente:** Uso de estados de sesión almacenados (`auth.setup.ts`) para evitar logueos innecesarios en cada prueba y acelerar la suite.
* **Gestión Dinámica de Datos:** Generación de identificadores únicos (UUIDs) y tipado estricto con interfaces de TypeScript (`models/`) para garantizar el aislamiento de datos en pruebas concurrentes.
* **Sincronización Asíncrona Avanzada:** Intercepción y espera explícita de respuestas XHR con `waitForResponse` para certificar la consistencia del backend antes de realizar aserciones en la UI.
* **Pruebas de API REST Purificadas:** Cliente de API extensible (`BaseApiClient.ts`) para consumir endpoints de forma limpia con soporte para token de autorización Bearer.

---

## 🧪 Cobertura de Pruebas

### 🌐 UI Testing (End-to-End)
* **Acceso y Navegación (`login.spec.ts`, `navigation.spec.ts`):** Autenticación por roles, validación de menú lateral dinámico y módulo *Maintenance* con re-autenticación.
* **Gestión de Usuarios - CRUD (`user.spec.ts`):** Creación, edición, filtrado y eliminación de usuarios con aserciones en tablas.
* **Mapeo de Datos:** Lectura analítica de registros en el módulo *Claim* y cálculo de montos en tiempo real.
* **Módulo Buzz:** Publicación y validación de entradas sociales en vivo.

### 🔌 API Testing - REST (`users.api.spec.ts`)
* **GET:** Recuperación del listado global de usuarios e inspección detallada por índice/posición.
* **POST:** Creación automatizada de nuevos usuarios capturando previamente el ID de un empleado disponible.
* **PUT:** Modificación de estados de cuenta (`Enabled`/`Disabled`), credenciales y parámetros de usuario.
* **DELETE:** Eliminación directa del registro creado por API para garantizar un entorno limpio (Teardown).

---

## 🏗️ Estructura del Proyecto

```text
OrangeHRM/
├── .auth/                  # Sesiones de autenticación guardadas
├── .github/                # Workflows de CI/CD (GitHub Actions)
├── allure-results/         # Reportes detallados con Allure
├── components/             # Componentes UI reutilizables (tablas, modales)
├── models/                 # Interfaces y tipos de TypeScript
├── pages/                  # Page Object Models (UI)
├── src/
│   └── api/                # Clientes HTTP para automatización de API
│       ├── BaseApiClient.ts
│       └── UsersApiClient.ts
├── tests/                  # Suites de prueba E2E y API
│   ├── auth.setup.ts
│   ├── login.spec.ts
│   ├── navigation.spec.ts
│   ├── user.spec.ts
│   └── users.api.spec.ts
├── utils/                  # Configuración de variables de entorno
├── .env                    # Variables de entorno locales
├── playwright.config.ts    # Configuración global de Playwright
└── package.json