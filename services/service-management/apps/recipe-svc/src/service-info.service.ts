import { Injectable } from '@nestjs/common';


@Injectable()
export class ServiceInfoService {

  getHello(): string {
    return 'Welcome to recipe-svc!';
  }

  version(): string {
    return 'v1';
  }

}
