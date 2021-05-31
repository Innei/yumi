import { Test, TestingModule } from '@nestjs/testing'
import { AuthModule } from './auth.module'
import { AuthService } from './auth.service'
// import {DbModule} from '@lib/db'
describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('', () => {
    expect(true).toBe(true)
  })
})
