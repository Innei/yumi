import { DbModule, UserModel } from '@lib/db'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { getModelForClass } from '@typegoose/typegoose'
import * as supertest from 'supertest'
import { AuthModule } from '../auth/auth.module'
import { AuthService } from '../auth/auth.service'
import { UsersModule } from './users.module'
import { mongoose } from '@typegoose/typegoose'
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
    console.log('-------disconnect mongoose-----------')
    await mongoose.disconnect()
    console.log('-------close server-----------')
    await app.close()
    console.log('----------end------------')
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
})
