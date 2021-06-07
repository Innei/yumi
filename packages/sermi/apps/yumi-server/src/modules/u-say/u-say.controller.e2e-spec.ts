import { randomStringUnSafeSync, snowflake } from '@app/server/utils'
import { DbModule, UserModel } from '@lib/db'
import { USayModel } from '@lib/db/models/u-say.model'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelForClass } from '@typegoose/typegoose'
import * as supertest from 'supertest'
import { AuthModule } from '../auth/auth.module'
import { USayModule } from './u-say.module'
describe('USayController e2e', () => {
  let app: INestApplication
  const route = '/u_say'

  const testingUser: any = {
    email: 'test@test.com',
    password: '123456',
    username: 'test-user-1a',
    _id: snowflake.gen(),
  }
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, DbModule, USayModule],
    }).compile()

    app = module.createNestApplication()

    await app.init()

    await getModelForClass(UserModel).create({
      ...testingUser,
      auth_code: randomStringUnSafeSync(),
    })
  })

  afterAll(async () => {
    await getModelForClass(UserModel).deleteOne({ _id: testingUser._id })
    await app.close()
  })

  describe('login first', () => {
    it('should login successfully', async () => {
      const server = app.getHttpServer()
      const res = await supertest
        .agent(server)
        .post('/auth/login')
        .send({
          username: testingUser.username,
          password: testingUser.password,
          code: '1111',
        })
        .expect(200)

      testingUser.token = res.body.token
    })
  })

  describe('POST /', () => {
    it('should create new say', async () => {
      const server = app.getHttpServer()
      const res = await supertest
        .agent(server)
        .post(route + '/')
        .set('Authorization', 'Bearer ' + testingUser.token)
        .send({ status: 'test' })
        .expect(201)
    })
  })
})
