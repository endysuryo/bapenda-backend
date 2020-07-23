import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// Load dot environment before load other modules
import dotenv = require('dotenv');
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from './timeout.interceptor';
import { UserModule } from './user/user.module';
import * as migrations from './migrations/index';
import { CustomerModule } from 'customer/customer.module';
import { BillboardModule } from 'billboard/billboard.module';
import { SubDistrictModule } from 'subdistrict/subdistrict.module';
import { CustomerBillboardModule } from 'customerBillboard/customerBillboard.module';
import { AuthMiddleware } from 'middleware';
import { CustomerController } from 'customer/customer.controller';
import { BillboardController } from 'billboard/billboard.controller';
import { CustomerBillboardController } from 'customerBillboard/customerBillboard.controller';
import { SubDistrictController } from 'subdistrict/subdistrict.controller';
import { UserController } from 'user/user.controller';

const { parsed } = dotenv.config({
  path:
    process.cwd() +
    '/.env' +
    (process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''),
});
process.env = { ...process.env, ...parsed };

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      password: process.env.TYPEORM_PASSWORD,
      username: process.env.TYPEORM_USERNAME,
      database: process.env.TYPEORM_DATABASE,
      port: Number(process.env.TYPEORM_PORT),
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
        __dirname + '/**/**/*.entity{.ts,.js}',
        __dirname + '/**/**/**/*.entity{.ts,.js}',
      ],
      logging: Boolean(process.env.TYPEORM_LOGGING),
      synchronize: false,
      migrationsRun: true,
      dropSchema: false,
      cli: {
        migrationsDir: __dirname + '/migrations',
      },
      migrations: [migrations.InitDB1591768539227],
    }),
    UserModule,
    CustomerModule,
    BillboardModule,
    SubDistrictModule,
    CustomerBillboardModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useValue: TimeoutInterceptor,
    },
    AppService,
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        UserController,
        CustomerController,
        BillboardController,
        CustomerBillboardController,
        SubDistrictController,
      );
  }
}
