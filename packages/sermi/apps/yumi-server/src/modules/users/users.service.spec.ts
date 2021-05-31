import { DbModule } from '@lib/db'
import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      imports: [DbModule],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('', () => {
    expect(true).toBe(true)
  })
})
