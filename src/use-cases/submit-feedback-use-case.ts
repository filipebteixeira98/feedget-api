import { FeedbacksRepository } from '../repositories/feedbacks-repository';

import { MailAdapter } from '../adapters/mail-adapter';

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: 'New feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Type of feedback: ${type}</p>`,
        `<p>Comment: ${comment}</p>`,
        `</div>`,
      ].join('\n'),
    });
  }
}
