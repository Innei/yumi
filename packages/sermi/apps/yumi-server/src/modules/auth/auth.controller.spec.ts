import { DbModule } from '@lib/db'
import { UserModel } from '@lib/db/models/user.model'
import { UnprocessableEntityException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelForClass, ReturnModelType } from '@typegoose/typegoose'
import { AuthController } from './auth.controller'
import { AuthModule } from './auth.module'
import { AuthService } from './auth.service'

describe('AuthController', () => {
  let controller: AuthController
  let service: AuthService
  let userModel: ReturnModelType<typeof UserModel>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, DbModule],
    }).compile()

    controller = module.get<AuthController>(AuthController)
    service = module.get<AuthService>(AuthService)

    userModel = getModelForClass(UserModel)
  })

  const model = {
    username: 'test-1',
    password: '1'.repeat(6),
    email: 'tu@qq.com',
    // TODO code
    code: '1111',
  }

  const createValidUser = async () => {
    const res = await controller.register(model)
    return res
  }

  it('register user', async () => {
    const res = await createValidUser()
    expect(res).toBeDefined()
    expect(res.username).toBe(model.username)
    expect(res.password).toBeUndefined()
    expect(res.auth_code).toBeUndefined()
  })

  it('register dup user', async () => {
    try {
      await createValidUser()
    } catch (e) {
      expect(e).toBeInstanceOf(UnprocessableEntityException)
    }
  })

  it('register with wrong username', async () => {
    try {
      await controller.register({ ...model, username: 'a---a' })
    } catch (e) {
      expect(e).toBeInstanceOf(UnprocessableEntityException)
    }
  })

  it('register with short password', async () => {
    try {
      await controller.register({ ...model, password: '1' })
    } catch (e) {
      expect(e).toBeInstanceOf(UnprocessableEntityException)
    }
  })

  afterAll(async () => {
    await userModel.deleteMany({})
  })
})
