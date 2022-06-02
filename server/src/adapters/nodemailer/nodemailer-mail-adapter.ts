import { MailAdapter, SendMailData } from '../email-adapter'
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a89d734f6e2a41",
    pass: "d332d7d2a97245"
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