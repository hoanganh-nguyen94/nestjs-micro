export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      port: process.env.INGREDIENT_SVC_PORT || 3001,
      host: process.env.INGREDIENT_SVC_HOST || 'localhost',
      db_host: process.env.INGREDIENT_DB_HOST || 'localhost',
      db_port: process.env.INGREDIENT_DB_PORT || '6379',
    }
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
