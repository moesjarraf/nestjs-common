import { Test, TestingModule } from '@nestjs/testing';
import { SSLService } from './ssl.service';
import { SSLModuleConfig } from './ssl.module';
import httpMocks from 'node-mocks-http';
import { ConfigService } from '../config/config.service';

describe('SSLService', () => {
  let module: TestingModule;
  let sslService: SSLService;

  beforeEach(async () => {
    module = await Test.createTestingModule(SSLModuleConfig).compile();
    await module.init();

    sslService = module.get<SSLService>(SSLService);
  });

  afterEach(async () => {
    await module.close();
  });

  describe('shouldRedirect', () => {
    it('should return false if ssl is disabled request', () => {
      jest
        .spyOn(ConfigService.prototype, 'ssl', 'get')
        .mockImplementation(() => ({ enabled: false }));

      const req = httpMocks.createRequest({
        hostname: 'example.com',
        method: 'GET',
        url: '/',
        app: {
          get: () => 'test',
        },
      });

      expect(sslService.shouldRedirect(req)).toBeFalsy();
    });

    it('should return false is hosname is localhost request', () => {
      jest
        .spyOn(ConfigService.prototype, 'ssl', 'get')
        .mockImplementation(() => ({ enabled: true }));

      const req = httpMocks.createRequest({
        hostname: 'localhost',
        method: 'GET',
        url: '/',
        app: {
          get: () => 'test',
        },
      });

      expect(sslService.shouldRedirect(req)).toBeFalsy();
    });

    it('should return false is path is health endpoint', () => {
      jest
        .spyOn(ConfigService.prototype, 'ssl', 'get')
        .mockImplementation(() => ({ enabled: true }));

      const req = httpMocks.createRequest({
        hostname: 'example.com',
        method: 'GET',
        url: '/api/health',
        app: {
          get: () => 'test',
        },
      });

      expect(sslService.shouldRedirect(req)).toBeFalsy();
    });

    it("should return true if it's an unsecure and not localhost request", () => {
      jest
        .spyOn(ConfigService.prototype, 'ssl', 'get')
        .mockImplementation(() => ({ enabled: true }));

      const req = httpMocks.createRequest({
        hostname: 'example.com',
        method: 'GET',
        url: '/',
        app: {
          get: () => 'test',
        },
      });

      expect(sslService.shouldRedirect(req)).toBeTruthy();
    });
  });
});
