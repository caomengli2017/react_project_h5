import { IUserModel } from '@src/types/model/user';
export type IUserReducer = {
  loading: boolean;
  login: boolean;
  error?: {
    code: number;
    msg: string;
  };
} & Partial<IUserModel>;
