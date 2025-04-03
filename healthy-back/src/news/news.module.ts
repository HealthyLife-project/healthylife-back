// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { RedisModule, RedisModuleOptions } from '@nestjs-modules/ioredis';

// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     RedisModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService): RedisModuleOptions => ({
//         config: {
//           host: configService.get<string>('REDIS_HOST', 'localhost'),
//           port: configService.get<number>('REDIS_PORT', 6379),
//         },
//       }),
//     }),
//   ],
// })
// export class NewsModule {}
