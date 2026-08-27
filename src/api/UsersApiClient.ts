import { APIRequestContext } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';

export type UserPayload = {
    username: string;
    password?: string;
    status: boolean;
    userRoleId: number;
};

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

    async updateUser(userId: number, user: UserPayload) {
        return this.put(`${this.endpoint}/${userId}`, user);
    }

    async deleteUsers(userId: number | number[]) {
        const ids = Array.isArray(userId) ? userId : [userId];
        return this.delete(this.endpoint, { ids });
    }
}