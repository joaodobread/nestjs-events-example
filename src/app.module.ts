import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import typeormConfig from './config/typeorm-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: false,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRoot(typeormConfig()),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
