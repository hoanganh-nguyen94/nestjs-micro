import { Test, TestingModule } from '@nestjs/testing';
import { GatewaySvcV2Controller } from './gateway-svc-v2.controller';
import { GatewaySvcV2Service } from './gateway-svc-v2.service';

describe('GatewaySvcV2Controller', () => {
  let gatewaySvcV2Controller: GatewaySvcV2Controller;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GatewaySvcV2Controller],
      providers: [GatewaySvcV2Service],
    }).compile();

    gatewaySvcV2Controller = app.get<GatewaySvcV2Controller>(GatewaySvcV2Controller);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(gatewaySvcV2Controller.getHello()).toBe('Hello World!');
    });
  });
});
