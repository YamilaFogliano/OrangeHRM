OrangeHRM es un software de licencia abierta GNU enfocado en recursos humanos. Se caracteriza por ser integral y flexible ayudando a empresas de todos los tamaños a gestionar a su personal, optimizar los procesos de RRHH e impulsar el crecimiento. Desde la gestión de empleados hasta la selección e incorporación, pasando por la gestión del rendimiento y la gestión de permisos. 


🚀 OrangeHRM Test Automation Framework (UI & API)

Framework de automatización e integración continua (End-to-End y API) sobre la plataforma OrangeHRM Open Source, construido con Playwright, TypeScript y Page Object Model (POM).

📌 Resumen del Proyecto
Este proyecto demuestra la implementación de un suite de pruebas automatizadas para validar flujos de trabajo críticos en OrangeHRM, combinando validaciones de interfaz de usuario (UI) e interacciones directas con la API REST interna (API Testing).

✨ Aspectos Técnicos Destacados
    Patrón de Diseño: Page Object Model (POM) con división clara de páginas (pages), componentes de UI reutilizables (components) e interfaces de API (api).

    Soporte Híbrido UI + API: Cobertura de flujos E2E dinámicos y validaciones directas de endpoints mediante llamadas HTTP con APIRequestContext.

    Optimización de Autenticación: Manejo de sesiones persistentes con auth.setup.ts para evitar logins redundantes.

    Manejo Dinámico de Datos: Uso de UUIDs (crypto.randomUUID()) y modelos de datos fuertemente tipados (UserModel, UserPayload) para evitar colisiones de datos en ejecuciones consecutivas.

    Control Asíncrono Avanzado: Sincronización explícita esperando respuestas de red (waitForResponse) ante filtros dinámicos y peticiones XHR.

🛠️ Tech Stack & Herramientas
    Lenguaje: TypeScript

    Framework E2E & API: Playwright Test

    Patrones: Page Object Model (POM), Component-Based Architecture, API Client Pattern

    Gestión de Entorno: Variables de entorno seguras (Environment.ts)

🏗️ Arquitectura del Proyecto

├── components/          # Componentes reusables (SidePanel, TopBarMenu, etc.)
├── models/              # Interfaces y tipos de TypeScript (UserModel, UserPayload)
├── pages/               # Page Object Models (LoginPage, UserManagementPage, Navigate)
├── src/api/             # Clientes HTTP encapsulados (UsersApiClient)
├── tests/               # Suites de pruebas automatizadas
│   ├── auth.setup.ts    # Configuración de autenticación global
│   ├── login.spec.ts    # Pruebas de acceso y navegación básica
│   ├── navigation.spec.ts # Búsquedas, recorridos dinámicos y módulo Maintenance
│   ├── user.spec.ts     # Flujos E2E de gestión de usuarios (CRUD UI)
│   └── users.api.spec.ts# Pruebas de API REST (CRUD completo)
└── utils/              # Variables de entorno y utilidades generales

🧪 Cobertura de Pruebas
🌐 Interfaz de Usuario (UI Testing)

    Autenticación y Accesos: Acceso guiado por roles, login de empleados y control de menú lateral con buscador dinámico.

    Navegación e Integridad de Menús: Recorrido exhaustivo de las subsecciones del menú principal y barra superior (Qualifications, Job, Organization, Configuration, Corporate Branding).

    Módulo Maintenance: Verificación de seguridad mediante re-autenticación por contraseña (Administrator Access) para ingresar a áreas protegidas.

    Gestión de Usuarios (CRUD Completo en UI):

        Creación dinámica de usuarios con generación de contraseñas/usernames únicos.

        Modificación de roles (Admin / ESS), contraseñas y nombres de usuario.

        Filtrado reactivo de datos en tabla con validación en segundo plano.

        Borrado de registros y confirmación en modales interactivos.

    Mapeo y Cálculo de Datos: Lectura dinámica de tablas en el módulo Claim, extrayendo y parseando valores monetarios para calcular totales acumulados en tiempo real.

    Interacción Social (Buzz Module): Publicación fluida de entradas con marcas de tiempo en vivo y aserciones de visibilidad.

🔌 API REST (API Testing)
    Ciclo de Vida Completo (CRUD en @users.api.spec.ts):

        GET: Recuperación de la lista completa de usuarios e inspección por índice/posición.

        POST: Creación de un usuario utilizando el ID de un empleado disponible capturado automáticamente.

        PUT: Actualización de estado (Enabled/Disabled), contraseñas y datos del usuario.

        DELETE: Eliminación directa del registro creado garantizando la limpieza del entorno.