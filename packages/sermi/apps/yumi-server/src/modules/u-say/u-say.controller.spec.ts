import { Test, TestingModule } from '@nestjs/testing'
import { USayController } from './u-say.controller'

describe('USayController', () => {
  let controller: USayController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [USayController],
    }).compile()

    controller = module.get<USayController>(USayController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
