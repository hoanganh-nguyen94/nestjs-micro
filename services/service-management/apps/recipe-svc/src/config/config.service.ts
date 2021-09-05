export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      port: process.env.RECIPE_SVC_PORT || 3002,
      host: process.env.RECIPE_SVC_HOST || 'localhost',
    }
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
