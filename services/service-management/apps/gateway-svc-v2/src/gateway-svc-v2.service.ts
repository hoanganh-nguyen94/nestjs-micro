import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewaySvcV2Service {
  getHello(): string {
    return 'Hello World!';
  }
}
