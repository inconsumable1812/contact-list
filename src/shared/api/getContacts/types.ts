import { Contact } from '../types';

type QueryParameters = {
  userID: number;
};

type Response = Contact[];

export type { QueryParameters, Response };
