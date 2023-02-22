import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModuleConfig, DatabaseService, DB_DEFAULT_CONNECTION } from '../src';

describe('Application e2e test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule(AppModuleConfig)
      .overrideProvider(DB_DEFAULT_CONNECTION)
      .useFactory({ factory: (db: DatabaseService) => db.connect(), inject: [DatabaseService] })
      .compile();
    app = module.createNestApplication(undefined, { logger: ['error', 'warn'] });
    await app.init();
  }, 30000);

  afterAll(async () => {
    await app.close();
  });

  describe('GET /', () => {
    test('should redirect to swagger api', async () => {
      const res = await request(app.getHttpServer()).get('/');
      expect(res.status).toBe(302);
      expect(res.header.location).toBe('/api');
    });
  });
});