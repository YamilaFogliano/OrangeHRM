# 🚀 OrangeHRM Test Automation Framework (UI & API)

Framework híbrido de automatización de pruebas (**E2E y API REST**) sobre la plataforma de RRHH **OrangeHRM Open Source**, desarrollado con **Playwright**, **TypeScript** y el patrón **Page Object Model (POM)**.

---

## 📌 Resumen Técnico

Suite de automatización que valida flujos críticos de usuario e interacciones directas con la API interna de OrangeHRM.

* **Patrones & Arquitectura:** Page Object Model (POM), arquitectura basada en componentes y cliente API modular.
* **Autenticación Eficiente:** Sesiones persistentes (`auth.setup.ts`) para optimizar tiempos de ejecución.
* **Gestión Dinámica de Datos:** Uso de UUIDs y tipos estrictos de TypeScript para garantizar datos aislados en cada prueba.
* **Sincronización:** Manejo asíncrono avanzado con `waitForResponse` para validar peticiones XHR en segundo plano.

---

## 🛠️ Tech Stack

* **Lenguaje:** TypeScript
* **Herramienta:** Playwright Test (UI & API)
* **Configuración:** Variables de entorno seguras (`Environment.ts`)

---

## 🧪 Cobertura de Pruebas

### 🌐 UI Testing (End-to-End)
* **Acceso y Navegación:** Login por roles, menú lateral dinámico y módulo *Maintenance* con re-autenticación.
* **Gestión de Usuarios (CRUD):** Creación, edición, filtrado y borrado dinámico de usuarios.
* **Mapeo de Datos:** Lectura de tablas en módulo *Claim* y cálculo de totales monetarios en tiempo real.
* **Módulo Buzz:** Publicación y validación de entradas sociales en vivo.

### 🔌 API Testing (REST)
* **GET:** Recuperación de la lista completa de usuarios e inspección por índice/posición.
* **POST:** Creación de un usuario utilizando el ID de un empleado disponible capturado automáticamente.
* **PUT:** Actualización de estado (`Enabled`/`Disabled`), contraseñas y datos del usuario.
* **DELETE:** Eliminación directa del registro creado garantizando la limpieza del entorno.

---

## 🏗️ Estructura del Proyecto

```text
├── components/          # Componentes de UI reutilizables
├── models/              # Tipos e interfaces de datos (TypeScript)
├── pages/               # Page Object Models (UI)
├── src/api/             # Clientes HTTP para pruebas de API
├── tests/               # Suites de prueba (Auth, UI CRUD, API CRUD)
└── utils/              # Configuración y variables de entorno
```