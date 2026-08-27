import { APIRequestContext, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import * as path from 'node:path';

export abstract class BaseApiClient {
    protected readonly request: APIRequestContext;
    protected readonly cookieHeader: string;

    protected constructor(request: APIRequestContext, cookieHeader: string) {
        this.request = request;
        this.cookieHeader = cookieHeader;
    }

    //Carga la cookie 'orangehrm' almacenada tras el proceso de login/setup.

    protected static async loadAuthenticationCookie(): Promise<string> {
        const authFilePath = path.resolve(process.cwd(), '.auth', 'admin.json');
        const authState = JSON.parse(await readFile(authFilePath, 'utf-8')) as {
            cookies?: Array<{ name: string; value: string }>;
        };

        const orangeHrmCookie = authState.cookies?.find((c) => c.name === 'orangehrm');
        expect(orangeHrmCookie, 'La cookie "orangehrm" no fue encontrada en .auth/admin.json').toBeTruthy();

        return `orangehrm=${orangeHrmCookie?.value}`;
    }

    protected getHeaders(): Record<string, string> {
        return {
            Cookie: this.cookieHeader,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
    }

    // Métodos CRUD base
    protected async get(endpoint: string) {
        return this.request.get(endpoint, { headers: this.getHeaders() });
    }

    protected async post(endpoint: string, data: unknown) {
        return this.request.post(endpoint, { headers: this.getHeaders(), data });
    }

    protected async put(endpoint: string, data: unknown) {
        return this.request.put(endpoint, { headers: this.getHeaders(), data });
    }

    protected async delete(endpoint: string, data: unknown) {
        return this.request.delete(endpoint, { headers: this.getHeaders(), data });
    }
}