import { Module } from '@nestjs/common';
import { GatewaySvcV2Controller } from './gateway-svc-v2.controller';
import { GatewaySvcV2Service } from './gateway-svc-v2.service';

@Module({
  imports: [],
  controllers: [GatewaySvcV2Controller],
  providers: [GatewaySvcV2Service],
})
export class GatewaySvcV2Module {}
