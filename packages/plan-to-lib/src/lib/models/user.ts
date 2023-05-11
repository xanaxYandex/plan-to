export interface IUser {
  _id: string;
  email: string;
  password: string;
  subscriptions: any[];
}

export type LoginCredentialsDto = Pick<IUser, 'email' | 'password'>;

export type CreateUserDto = Pick<IUser, 'email' | 'password'>;

export type UpdateUserDto = Partial<IUser>;

export type LoginResponse = { token: string };
