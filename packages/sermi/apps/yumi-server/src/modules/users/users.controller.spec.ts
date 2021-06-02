import { randomStringUnSafeSync, snowflake } from '@app/server/utils'
import { UserModel } from '@lib/db'
import { UserRole } from '@lib/db/models/user.model'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelForClass } from '@typegoose/typegoose'
import * as supertest from 'supertest'
import { promisify } from 'util'
import { AuthController } from '../auth/auth.controller'
import { AuthModule } from '../auth/auth.module'
import { UsersController } from './users.controller'
import { UsersModule } from './users.module'

describe('UsersController', () => {
  let userController: UsersController
  let authController: AuthController
  const testUser = {
    username: 'testuser',
    password: '123456',
    email: 'test@qq.com',
  }

  const route = '/users'
  let app: INestApplication
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, AuthModule],
    }).compile()

    userController = module.get<UsersController>(UsersController)
    authController = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(userController).toBeDefined()
  })

  afterAll(async () => {})
})
