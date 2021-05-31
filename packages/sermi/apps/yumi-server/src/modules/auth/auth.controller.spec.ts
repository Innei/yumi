import { DbModule } from '@lib/db'
import { UserModel } from '@lib/db/models/user.model'
import { INestApplication, UnprocessableEntityException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelForClass, ReturnModelType } from '@typegoose/typegoose'
import { isDefined } from 'class-validator'
import { isUndefined, pick } from 'lodash'
import * as request from 'supertest'
import { AuthController } from './auth.controller'
import { AuthModule } from './auth.module'
import { AuthService } from './auth.service'

describe('AuthController', () => {
  const route = '/auth'

  let controller: AuthController
  let service: AuthService
  let userModel: ReturnModelType<typeof UserModel>
  let app: INestApplication

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, DbModule],
    }).compile()

    controller = module.get<AuthController>(AuthController)
    service = module.get<AuthService>(AuthService)

    app = module.createNestApplication()
    await app.init()
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

  it('login with register user', async () => {
    const data = pick(model, ['username', 'password'])

    return request(app.getHttpServer())
      .post(route + '/login')
      .send(data)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect((res) => {
        try {
          const { username, email, token, auth_code, password } = res.body
          return (
            isDefined(token) &&
            username === model.email &&
            email === model.email &&
            isUndefined(auth_code) &&
            isUndefined(password)
          )
        } catch {
          return false
        }
      })
      .expect(201)
  })

  afterAll(async () => {
    await userModel.deleteMany({})
    await app.close()
  })
})
