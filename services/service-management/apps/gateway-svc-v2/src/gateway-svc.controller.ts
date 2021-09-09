import { Controller, Get } from '@nestjs/common';
import { GatewaySvcService } from './gateway-svc.service';

@Controller()
export class GatewaySvcController {

  constructor(
    private readonly svc: GatewaySvcService,
  ) {
  }

  @Get()
  getHello() {
    return this.svc.getHello();
  }


  @Get('hello')
  getHelloNew() {
    return this.svc.getHello();
  }
}
