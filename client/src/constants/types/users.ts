import { LoginInputs } from './auth';

export interface JoinInputs extends LoginInputs {
  nickname: string;
}
