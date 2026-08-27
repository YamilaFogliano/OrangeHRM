import { test, expect } from '@playwright/test';
import { UsersApiClient, UserPayload } from '../src/api/UsersApiClient';

test.describe('API Suite: OrangeHRM Users Management (CRUD)', () => {
    let apiClient: UsersApiClient;
    let createdUserId: number;

    // Generación de datos dinámicos para pruebas
    const randomSuffix = crypto.randomUUID().slice(0, 8);
    const testUserData: UserPayload = {
        username: `user.${randomSuffix}`,
        password: 'YamilaOrange1#',
        status: true,
        userRoleId: 1, // Admin
    };

    test.beforeAll(async ({ request }) => {
        // Inicialización cliente API cargando cookies de sesión
        apiClient = await UsersApiClient.fromSavedAuthState(request);
    });

    test('1. GET - Obtener la lista de usuarios', async () => {
        const response = await apiClient.getUsers(10, 0);

        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
        expect(response.headers()['content-type']).toContain('application/json');

        const body = await response.json();
        expect(body).toHaveProperty('data');
        expect(Array.isArray(body.data)).toBeTruthy();
    });

    test('2. POST - Crear un nuevo usuario', async () => {
        const response = await apiClient.createUser(testUserData);

        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        const body = await response.json();
        expect(body.data).toHaveProperty('id');
        expect(body.data.username).toBe(testUserData.username);

        // Guardar ID para los siguientes tests (PUT / DELETE)
        createdUserId = body.data.id;
    });

    test('3. PUT - Actualizar el usuario creado', async () => {
        expect(createdUserId, 'Se requiere un ID de usuario creado previamente').toBeDefined();

        const updatedPayload: UserPayload = {
            ...testUserData,
            status: false, // Cambio de estado a Inactivo
        };

        const response = await apiClient.updateUser(createdUserId, updatedPayload);

        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        const body = await response.json();
        expect(body.data.status).toBe(false);
    });

    test('4. DELETE - Eliminar el usuario creado', async () => {
        expect(createdUserId, 'Se requiere un ID de usuario para eliminar').toBeDefined();

        const response = await apiClient.deleteUsers(createdUserId);

        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        const body = await response.json();
        expect(body.data).toContain(createdUserId);
    });
});