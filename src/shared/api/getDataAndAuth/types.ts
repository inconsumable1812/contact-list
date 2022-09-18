import { User } from '../types';

type QueryParameters = {
  login: string;
  password: string;
};

type Response = User[];

export type { QueryParameters, Response };
