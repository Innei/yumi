import { Test, TestingModule } from '@nestjs/testing'
import { EmailService } from './helper.service.email'

describe('HelperService', () => {
  let service: EmailService
  let module: TestingModule
  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [EmailService],
    }).compile()

    service = module.get<EmailService>(EmailService)
  })

  afterAll(async () => {
    await module.close()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
