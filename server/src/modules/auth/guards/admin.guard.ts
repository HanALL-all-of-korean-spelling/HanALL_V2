import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminGuard extends AuthGuard('accesstoken') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info instanceof Error) {
      throw new UnauthorizedException('Accesstoken Exceed');
    }
    if (!user.isAdmin) {
      throw new ForbiddenException('접근 권한이 없습니다.');
    }
    return super.handleRequest(err, user, info, context, status);
  }
}
