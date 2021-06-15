import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import typeormConfig from './config/typeorm-config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: false,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRoot(typeormConfig()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
