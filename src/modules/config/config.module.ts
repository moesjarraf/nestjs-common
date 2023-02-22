import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: [
        '.env.development.local',
        '.env.development',
        '.env.staging',
        '.env.production',
        '.env.test',
        '.env',
      ],
      cache: true,
      expandVariables: true,
    }),
  ],
  controllers: [],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule { }
