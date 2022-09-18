import { User } from 'shared/api/types';
import { RequestStatus } from 'shared/helpers/redux';

type State = {
  status: RequestStatus;
  error: string | null;
  users: User;
};

export type { State };
