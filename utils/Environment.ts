export class Environment {

    static readonly ADMIN_USERNAME = Environment.getRequired('ADMIN_USERNAME')
    static readonly ADMIN_PASSWORD = Environment.getRequired('ADMIN_PASSWORD')
    static readonly EMP_USERNAME = Environment.getRequired('EMP_USERNAME')
    static readonly EMP_PASSWORD = Environment.getRequired('EMP_PASSWORD')

    private static getRequired(key: string): string {
        const value = process.env[key]

        if (!value) {
            throw new Error('Environment variable ' + key + 'does not exist')
        }

        return value

    }
}