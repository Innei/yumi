import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GuestPassGuard extends AuthGuard('jwt') implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()

    if (request.headers['authorization']) {
      try {
        const user = (await super.canActivate(context)) as boolean
        return user
      } catch {}
    }

    return true
  }
}
