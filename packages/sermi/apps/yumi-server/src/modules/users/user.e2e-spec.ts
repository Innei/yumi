import { randomStringUnSafeSync } from '@app/server/utils'
import { DbModule, UserModel } from '@lib/db'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { getModelForClass } from '@typegoose/typegoose'
import * as supertest from 'supertest'
import { AuthModule } from '../auth/auth.module'
import { AuthService } from '../auth/auth.service'
import { UsersModule } from './users.module'
describe('UserController', () => {
  const route = '/users'
  let app: INestApplication
  const testingUsers = [
    {
      email: 'test@test.com',
      password: '123456',
      username: 'test-user-1',
      token: '',
      id: '',
    },
    {
      email: 'test@test.com',
      password: '123456',
      username: 'test-user-2',
      token: '',
      id: '',
    },
  ]
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [UsersModule, AuthModule, DbModule],
    }).compile()

    app = module.createNestApplication()
    await app.init()

    const authService = module.get<AuthService>(AuthService)

    for (const user of testingUsers) {
      console.log('register: ', user.username)
      delete user.id
      // @ts-ignore
      const { _id } = await authService.register(user)
      const token = await authService.signToken(_id)
      user.token = token
      user.id = _id.toString()
    }
  })

  afterAll(async () => {
    await getModelForClass(UserModel).deleteMany({
      username: { $in: testingUsers.map((i) => i.username) },
    })

    await app.close()
  })

  describe('GET /user', () => {
    it('should return status 200', async () => {
      await supertest
        .agent(app.getHttpServer())
        .get(route + '/self')
        .set('Authorization', 'Bearer ' + testingUsers[0].token)
        .expect(200)
    })
  })

  describe('GET /user/:id', () => {
    it(
      'should return fully profile if self, id=' + testingUsers[0].id,
      async () => {
        await supertest
          .agent(app.getHttpServer())
          .get(route + '/' + testingUsers[0].id)
          .set('Authorization', 'Bearer ' + testingUsers[0].token)
          .expect(200)
          .expect((res) => {
            return !!res.body.email
          })
      },
    )

    it(
      'should return serialized profile if not self, id=' + testingUsers[1].id,
      async () => {
        await supertest
          .agent(app.getHttpServer())
          .get(route + '/' + testingUsers[1].id)
          .set('Authorization', 'Bearer ' + testingUsers[0].token)
          .expect(200)
          .expect((res) => {
            return typeof res.body.email == 'undefined'
          })
      },
    )
  })

  describe('PATCH /self', () => {
    it('should omit un-modifiable field', async () => {
      const agent = supertest.agent(app.getHttpServer())
      const moName = randomStringUnSafeSync()
      // 1. patch
      await agent
        .patch(route + '/self')
        .set('Authorization', 'Bearer ' + testingUsers[0].token)
        .send({ email: 'eam@am.com', name: moName })
        .expect(204)

      // 2. get
      await agent
        .get(route + '/self')
        .set('Authorization', 'Bearer ' + testingUsers[0].token)
        .expect(200)
        .expect((res) => {
          const body = res.body

          return body.name === moName && body.email === testingUsers[0].email
        })
    })
  })

  describe('POST /reset, reset password', () => {
    it('should reset password successfully', async () => {
      const agent = supertest.agent(app.getHttpServer())

      // 1. reset password
      const new_password = '654321'
      await agent
        .post(route + '/reset')
        .set('Authorization', 'Bearer ' + testingUsers[0].token)
        .send({
          old_password: testingUsers[0].password,
          new_password,
        })
        .expect(204)

      // 2. login with old password
      await agent
        .post('/auth/login')
        .send({
          username: testingUsers[0].username,
          password: testingUsers[0].password,
        })
        .expect(403)

      // 3. login with new password
      const {
        body: { token: new_token },
      } = await agent
        .post('/auth/login')
        .send({
          username: testingUsers[0].username,
          password: new_password,
        })
        .expect(200)

      // 4. old token should be revoke

      await agent
        .get(route + '/self')
        .set('Authorization', 'Bearer ' + testingUsers[0].token)
        .expect(401)
      // finally set to model
      testingUsers[0].password = new_password
      testingUsers[0].token = new_token
    })

    it('should reject if old password not equal password', async () => {
      const agent = supertest.agent(app.getHttpServer())

      const new_password = '654321'
      await agent
        .post(route + '/reset')
        .set('Authorization', 'Bearer ' + testingUsers[0].token)
        .send({
          old_password: 'a',
          new_password,
        })
        .expect(400)
    })
  })
})
