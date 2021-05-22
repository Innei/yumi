import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserRegisterDto } from './user.dto'
import { UsersService } from './users.service'

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUser() {
    return await this.userService.getUser()
  }

  @Post()
  async createUser(@Body() body: UserRegisterDto) {
    return 'OK'
  }
}
