import nodemailer from 'nodemailer';

import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'c2d0b07e467b20',
    pass: '2913d16771730a',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Team Feedget <hello@feedget.com>',
      to: 'Filipe Teixeira <filipebarrosteixeira98@gmail.com>',
      subject,
      html: body,
    });
  }
}
