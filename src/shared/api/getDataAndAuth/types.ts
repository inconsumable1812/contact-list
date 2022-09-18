import { User } from '../types';

type QueryParameters = {
  login: string;
  password: string;
};

type Response = Partial<User>;

export type { QueryParameters, Response };
