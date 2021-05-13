export type IUserReducer = {
  username: string;
  loading: boolean;
  login: boolean;
  error?: {
    code: number;
    msg: string;
  };
};
