import { Module } from '@nestjs/common';
import { PingController } from './ping/ping.controller';
import { ItemModule } from './item/item.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config/ormConfig';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
          }),
          TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: ormConfig,
          }),
        ItemModule,
      ],
    controllers: [PingController],
    providers: [],
})
export class AppModule {}
