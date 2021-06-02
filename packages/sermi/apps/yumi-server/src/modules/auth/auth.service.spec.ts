import { Test, TestingModule } from '@nestjs/testing'
import { AuthModule } from './auth.module'
import { AuthService } from './auth.service'
import { DbModule } from '@lib/db'
describe('AuthService', () => {
  let service: AuthService
  let module: TestingModule
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AuthModule, DbModule],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('service should be defined', () => {
    expect(service).toBeDefined()
  })
})
