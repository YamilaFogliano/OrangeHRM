import { APIRequestContext } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';

export interface UserPayload {
    username: string;
    password?: string;
    status: boolean;
    userRoleId: number;
    empNumber: number;
    changePassword?: boolean; // Regla de negocio para PUT en OrangeHRM
}

export class UsersApiClient extends BaseApiClient {
    private readonly endpoint = '/web/index.php/api/v2/admin/users';

    private constructor(request: APIRequestContext, cookieHeader: string) {
        super(request, cookieHeader);
    }

    static async fromSavedAuthState(request: APIRequestContext): Promise<UsersApiClient> {
        const cookieHeader = await BaseApiClient.loadAuthenticationCookie();
        return new UsersApiClient(request, cookieHeader);
    }

    async getUsers(limit = 50, offset = 0) {
        return this.get(`${this.endpoint}?limit=${limit}&offset=${offset}&sortField=u.userName&sortOrder=ASC`);
    }

    async createUser(user: UserPayload) {
        return this.post(this.endpoint, user);
    }

    async updateUser(id: number, payload: Partial<UserPayload>) {
        return this.put(`/web/index.php/api/v2/admin/users/${id}`, payload);
    }

    async deleteUsers(userId: number | number[]) {
        const ids = Array.isArray(userId) ? userId : [userId];
        return this.delete(this.endpoint, { ids });
    }

    async getFirstAvailableEmployeeNumber(): Promise<number> {
        const response = await this.get('/web/index.php/api/v2/pim/employees?limit=10&offset=0');
        const body = await response.json();

        if (body.data && body.data.length > 0) {
            return body.data[0].empNumber;
        }

        throw new Error('No se encontraron empleados registrados en la base de datos de OrangeHRM.');
    }

}