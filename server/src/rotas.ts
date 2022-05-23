import express from 'express'
import { prisma } from './prisma'
import nodemailer from 'nodemailer'
import { SubmitFeedbackService } from './services/submit-feedback-service'
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository'

export const routes = express.Router()

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a89d734f6e2a41",
    pass: "d332d7d2a97245"
  }
})

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const submitFeedbackService = new SubmitFeedbackService(
    prismaFeedbacksRepository
  )

  await submitFeedbackService.execute({
    type,
    comment,
    screenshot
  })

  // await transport.sendMail({
  //   from: 'Equipe Feedget <oi@feedget.com>',
  //   to: 'Ariel Ramos <teste@teste.com>',
  //   subject: 'Novo feedback',
  //   html: [
  //     `<p>Tipo do feedback: ${type} </p>`,
  //     `<p>Comentário: ${comment}</p>`
  //   ].join('\n')
  // })

  return res.status(201).send() /*.json({ data: feedback })*/
})