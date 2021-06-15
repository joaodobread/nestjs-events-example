import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { join } from 'path';
import { UserCreatedEventInterface } from '../interfaces/user-created.interface';

@Injectable()
export class UserEventHandler {
  constructor(private readonly mailerService: MailerService) {}

  @OnEvent('user.created', { async: true })
  onUserCreated({ name, email }: UserCreatedEventInterface) {
    this.mailerService.sendMail({
      template: join(process.env.PWD, 'templates', 'email-confirmation'),
      to: email,
      subject: 'Account created ʕ·͡ᴥ·ʔ',
      context: {
        name,
        email,
      },
    });
  }

  @OnEvent('user.deleted')
  onUserDeleted({ name }: UserCreatedEventInterface) {
    console.log(name, 'has been deleted');
  }
}
