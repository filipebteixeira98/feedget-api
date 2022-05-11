import express from 'express';
import nodemailer from 'nodemailer';

import { prisma } from './prisma';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'c2d0b07e467b20',
    pass: '2913d16771730a',
  },
});

const app = express();

app.use(express.json());

app.post('/feedbacks', async (request, response) => {
  const { type, comment, screenshot } = request.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  await transport.sendMail({
    from: 'Team Feedget <hello@feedget.com>',
    to: 'Filipe Teixeira <filipebarrosteixeira98@gmail.com>',
    subject: 'You got a new feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Type of feedback: ${type}</p>`,
      `<p>Comment: ${comment}</p>`,
      `</div>`,
    ].join('\n'),
  });

  return response.status(201).json({ data: feedback });
});

app.listen(3333, () =>
  console.log('🚀 Server is running at http://localhost:3333')
);
