import { Controller, Get } from '@nestjs/common';
import { GatewaySvcV2Service } from './gateway-svc-v2.service';

@Controller()
export class GatewaySvcV2Controller {
  constructor(private readonly gatewaySvcV2Service: GatewaySvcV2Service) {}

  @Get()
  getHello(): string {
    return this.gatewaySvcV2Service.getHello();
  }
}
