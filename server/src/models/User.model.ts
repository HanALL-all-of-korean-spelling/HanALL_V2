import * as bcrypt from 'bcrypt';

export class UserModel {
  id: number;
  email: string;
  passwd: string;
  nickname: string;
  userRank: number;
  userPoint: number;
  isAdmin: boolean;
  createTime: Date | null;
  updateTime: Date | null;
  deleteTime: Date | null;

  constructor(user: UserModel) {
    this.id = user.id;
    this.email = user.email;
    this.passwd = this.encryptPasswd(user.passwd);
    this.nickname = user.nickname;
    this.userRank = user.userRank;
    this.userPoint = user.userPoint;
    this.isAdmin = user.isAdmin;
  }

  private encryptPasswd(passwd: string): string {
    return bcrypt.hashSync(passwd, 10);
  }
}
