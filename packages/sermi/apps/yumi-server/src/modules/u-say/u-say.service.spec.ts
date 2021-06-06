import { Test, TestingModule } from '@nestjs/testing'
import { USayService } from './u-say.service'

describe('USayService', () => {
  let service: USayService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [USayService],
    }).compile()

    service = module.get<USayService>(USayService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
