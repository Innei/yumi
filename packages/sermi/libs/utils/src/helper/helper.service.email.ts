/**
 * Helper Email service.
 * @file Helper Email 邮件服务
 * @module shared/helper/email.service
 * @author Surmon <https://github.com/surmon-china>
 * @author Innei
 */
import { createTransport, SendMailOptions } from 'nodemailer'
import { Injectable, Logger } from '@nestjs/common'
import { APP } from '@app/server/app.config'
import { __TEST__ } from '@app/server/utils'

@Injectable()
export class EmailService {
  private logger: Logger
  private transporter: ReturnType<typeof createTransport>
  private clientIsValid: boolean

  constructor() {
    this.logger = new Logger(EmailService.name)
    this.transporter = createTransport({
      // @ts-ignore
      secure: true,
      host: APP.email.host || 'smtp.innei.ren',
      port: APP.email.port || 465,
      auth: {
        user: APP.email.account,
        pass: APP.email.password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
    if (__TEST__) {
      return
    }
    this.verifyClient()
  }

  // 验证有效性
  private verifyClient(): void {
    return this.transporter.verify((error) => {
      if (error) {
        this.clientIsValid = false
        setTimeout(this.verifyClient.bind(this), 1000 * 60 * 30)
        this.logger.error(
          '邮件客户端初始化连接失败！将在半小时后重试：' + error?.message,
        )
      } else {
        this.clientIsValid = true
        this.logger.log('邮件客户端初始化连接成功！随时可发送邮件')
      }
    })
  }

  //TODO send
  public sendMail(mailOptions: SendMailOptions) {
    if (!this.clientIsValid) {
      console.warn('由于未初始化成功，邮件客户端发送被拒绝！')
      return false
    }
    const options = Object.assign(mailOptions, { from: APP.email.from })
    this.transporter.sendMail(options, (error, info: any) => {
      if (error) {
        this.logger.warn('邮件发送失败！' + error?.message)
      } else {
        this.logger.debug(
          '邮件发送成功' + ' ' + info.messageId + ' ' + info.response,
        )
      }
    })
  }
}
