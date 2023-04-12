import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { UserWithToken } from '../dto/auth.req.dto';

export const AccessCheck = createParamDecorator(
  (data, ctx: ExecutionContext): User | UserWithToken => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
