import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewaySvcService {
  getHello(): string {
    return 'Welcome to gateway-svc!';
  }
}
