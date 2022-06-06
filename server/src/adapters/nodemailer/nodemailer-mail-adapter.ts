import { MailAdapter, SendMailData } from '../email-adapter'
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "58358d9ef5aaec",
    pass: "8cbc7ff8d0d461"
  }
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Ariel Ramos <teste@teste.com>',
      subject,
      html: body
    })
  }
}