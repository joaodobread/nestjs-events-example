import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export default (): MailerOptions =>
  <MailerOptions>{
    transport: {
      host: process.env.MAILER_HOST,
      port: parseInt(process.env.MAILER_PORT, 10),
      ignoreTLS: true,
      secure: false,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    },
    defaults: {
      from: process.env.MAILER_FROM,
    },
    template: {
      dir: join(process.env.PWD, 'templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  };
