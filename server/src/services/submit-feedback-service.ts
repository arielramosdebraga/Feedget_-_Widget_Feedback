import { MailAdapter } from "../adapters/email-adapter"
import { FeedbacksRepository } from "../repositories/feedbacks-repository"

interface SubmitFeedbackServiceRequest {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackService {
  constructor (
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackServiceRequest) {
    const { type, comment, screenshot } = request

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<p>Tipo do feedback: ${type} </p>`,
        `<p>Comentário: ${comment}</p>`
      ].join('\n')
    })
  }
}