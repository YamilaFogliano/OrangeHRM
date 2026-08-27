import { test, expect } from '@playwright/test';
import { UsersApiClient, UserPayload } from '../src/api/UsersApiClient';

test.describe.serial('API Suite: OrangeHRM Users Management (CRUD)', () => {
    let createdUserId: number;
    const randomSuffix = crypto.randomUUID().slice(0, 6);

    //Obtener lista de usuarios totales existentes -->
    test('1. GET - Obtener la lista de usuarios', async ({ request }) => {
        const apiClient = await UsersApiClient.fromSavedAuthState(request);
        const response = await apiClient.getUsers();

        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        const body = await response.json();
        const usersList = body.data ?? [];

        console.log(`\n✅ [GET] Total de usuarios recuperados: ${usersList.length}`);
        console.log('===========================================================');

        // Iteracion sobre todos los usuarios devueltos
        usersList.forEach((user: any, index: number) => {
            const username = user.userName ?? user.username ?? 'N/A';
            const role = user.userRole?.name ?? 'Sin Rol';
            console.log(`   [#${index + 1}] ID: ${user.id} | Username: "${username}" | Rol: ${role}`);
        });

        console.log('===========================================================');
    });

    //Obtener la lista y elegir un usuario en particular por posición --> 
    test('1-A. GET - Obtener la lista de usuarios', async ({ request }) => {
        const apiClient = await UsersApiClient.fromSavedAuthState(request);
        const response = await apiClient.getUsers();

        expect(response.status()).toBe(200);
        const body = await response.json();
        const usersList = body.data ?? [];

        console.log(`\n✅ [GET] Usuarios recuperados en total: ${usersList.length}`);

        const targetPosition = 4;
        const targetIndex = targetPosition - 1;

        if (usersList[targetIndex]) {
            const selectedUser = usersList[targetIndex];
            const username = selectedUser.userName ?? selectedUser.username ?? 'N/A';

            console.log(`\n🔎 Datos capturados del usuario N° ${targetPosition}:`);
            console.log(`🆔 ID: ${selectedUser.id}`);
            console.log(`👤 Username: ${username}`);
            console.log(`💼 Rol: ${selectedUser.userRole?.name ?? 'N/A'}`);
        } else {
            console.log(`⚠️ No existe la posición ${targetPosition}. Solo hay ${usersList.length} usuarios.`);
        }
    });

    test('2. POST - Crear un nuevo usuario', async ({ request }) => {
        const apiClient = await UsersApiClient.fromSavedAuthState(request);
        const validEmpNumber = await apiClient.getFirstAvailableEmployeeNumber();

        const testUserData: UserPayload = {
            username: `YamilaOrange-user.${randomSuffix}`,
            password: 'YamilaOrange1#',
            status: true,
            userRoleId: 1, // 1 = Admin
            empNumber: validEmpNumber
        };

        const response = await apiClient.createUser(testUserData);

        if (response.status() !== 200) {
            console.error('⚠️ Error en POST:', await response.text());
        }

        expect(response.status()).toBe(200);

        const body = await response.json();
        createdUserId = body.data?.id;
        expect(createdUserId).toBeDefined();

        const createdUsername = body.data?.userName ?? body.data?.username ?? testUserData.username;

        console.log(`\n ✅ [POST] Usuario creado con éxito:`);
        console.log(`🆔 ID generado: ${createdUserId}`);
        console.log(`👤 Username: ${createdUsername}`);
        console.log(`💼 EmpNumber asociado: ${validEmpNumber}`);
    });

    test('3. PUT - Actualizar el usuario creado', async ({ request }) => {
        expect(createdUserId, 'Se requiere un ID de usuario creado previamente').toBeDefined();

        const apiClient = await UsersApiClient.fromSavedAuthState(request);
        const validEmpNumber = await apiClient.getFirstAvailableEmployeeNumber();

        const updatedPayload: UserPayload = {
            username: `YamilaOrange-user.${randomSuffix}`,
            password: 'YamilaOrange1#',
            changePassword: false,
            status: false,
            userRoleId: 1,
            empNumber: validEmpNumber
        };

        const response = await apiClient.updateUser(createdUserId, updatedPayload);

        if (response.status() !== 200) {
            console.error('⚠️ Error en PUT:', await response.text());
        }

        expect(response.status()).toBe(200);

        const body = await response.json();
        const updatedUsername = body.data?.userName ?? body.data?.username ?? updatedPayload.username;

        console.log(`\n✅ [PUT] Usuario ID #${createdUserId} actualizado correctamente:`);
        console.log(`👤 Username: ${updatedUsername}`);
        console.log(`🟢 Status (Enabled | Disabled): ${updatedPayload.status}`);
    });

    test('4. DELETE - Eliminar el usuario creado', async ({ request }) => {
        expect(createdUserId, 'Se requiere un ID de usuario para eliminar').toBeDefined();

        const apiClient = await UsersApiClient.fromSavedAuthState(request);
        const response = await apiClient.deleteUsers(createdUserId);

        expect(response.status()).toBe(200);

        console.log(`\n✅ [DELETE] Eliminación del usuario completada:`);
        console.log(`🗑 ID eliminado: ${createdUserId}`);
        console.log(`🟢 Status HTTP: ${response.status()}`);
    });
});