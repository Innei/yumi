import { AppModule } from '@app/server/app.module'
import { randomStringUnSafeSync, snowflake } from '@app/server/utils'
import { UserModel } from '@lib/db'
import { UserRole } from '@lib/db/models/user.model'
import { INestApplication } from '@nestjs/common'
import { TestingModule, Test } from '@nestjs/testing'
import { getModelForClass } from '@typegoose/typegoose'
import * as supertest from 'supertest'

describe('App e2e', () => {
  const testUser = {
    username: 'testuser',
    password: '123456',
    email: 'test@qq.com',
  }

  const route = '/users'
  let app: INestApplication
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    // create test account
    try {
      getModelForClass(UserModel).create({
        ...testUser,
        auth_code: randomStringUnSafeSync(6),
        _id: snowflake.gen(),
        banned: false,
        created_at: new Date(),
        email_verified: true,
        protected: false,
        role: UserRole.User,
        updated_at: null,
      })
    } catch {}

    // init server
    app = module.createNestApplication()
    await app.init()
  })

  it('GET /self', async () => {
    // 1. login

    supertest(app.getHttpServer())
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ ...testUser })
      .expect(200)
      .expect((res) => {
        try {
          const { token } = res.body

          return token ? true : false
        } catch {
          return false
        }
      })
      .then((res) => {
        const { token } = res.body
        supertest(app.getHttpServer())
          .get(route + '/self')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          .expect((res) => {
            console.log(res)

            return !!res
          })
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
