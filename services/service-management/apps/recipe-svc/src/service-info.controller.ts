import { Controller, Get, Logger } from '@nestjs/common';
import { ServiceInfoService } from './service-info.service';

@Controller()
export class ServiceInfoController {

  private logger = new Logger('ServiceInfoController');

  constructor(private readonly svc: ServiceInfoService) {
  }

  @Get()
  getHello(): string {
    return this.svc.getHello();
  }

  @Get('version')
  version(): string {
    return this.svc.version()
  }

}
