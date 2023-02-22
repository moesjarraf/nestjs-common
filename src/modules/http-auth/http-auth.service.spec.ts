import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../config/config.service';
import { HttpAuthModuleConfig } from './http-auth.module';
import { HttpAuthService } from './http-auth.service';

describe('HttpAuthService', () => {
  let module: TestingModule;
  let authService: HttpAuthService;

  beforeEach(async () => {
    module = await Test.createTestingModule(HttpAuthModuleConfig).compile();
    await module.init();

    authService = module.get<HttpAuthService>(HttpAuthService);
  });

  describe('validateBearer()', () => {
    test('should return true if a token is correct', () => {
      const token = 'A0qA!YGeE!F2uNsbMl$BVw52StGgDNHv@K6j6i3iilr1qWvB*P4nm2KkjbvVu55U';
      jest.spyOn(ConfigService.prototype, 'http_auth', 'get').mockImplementation(() => ({ bearer_token: token }));


      expect(authService.validateBearer(token)).toEqual({ authorized: true });
    });

    test('should return false if a token is incorrect', () => {
      const token = 'test';
      jest.spyOn(ConfigService.prototype, 'http_auth', 'get').mockImplementation(() => ({ bearer_token: 'test1234' }));

      expect(authService.validateBearer(token)).toEqual({ authorized: false });
    });
  });
});
