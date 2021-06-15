import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import typeormConfig from './config/typeorm-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import mailerConfig from './config/mailer-config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EventEmitterModule } from '@nestjs/event-emitter';
import eventConfig from './config/event-config';
import { UserEventHandler } from './events/handlers/user-event-handle';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: false,
      load: [typeormConfig, mailerConfig],
    }),
    TypeOrmModule.forRoot(typeormConfig()),
    MailerModule.forRoot(mailerConfig()),
    EventEmitterModule.forRoot(eventConfig()),
    UserModule,
  ],
  controllers: [],
  providers: [UserEventHandler],
})
export class AppModule {}
