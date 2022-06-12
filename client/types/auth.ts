export interface LoginInputs {
  email: string,
  password: string,
};

export interface JoinInputs extends LoginInputs {
  nickname: string,
};

export interface IUser {
  email: string,
  nickname: string,
  rank: string,
  point: number,
}