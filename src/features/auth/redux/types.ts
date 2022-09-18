import { User } from 'shared/api/types';
import { RequestStatus } from 'shared/helpers/redux';

type State = {
  status: RequestStatus;
  error: string | null;
  user: User;
};

export type { State };
