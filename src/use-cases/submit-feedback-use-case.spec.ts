import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const submitFeedback = new SubmitFeedbackUseCase(
  { create: async () => {} },
  { sendMail: async () => {} }
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'Example comment',
        screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg',
      })
    ).resolves.not.toThrow();
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'Example comment',
        screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback without comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg',
      })
    ).rejects.toThrow();
  });
});
