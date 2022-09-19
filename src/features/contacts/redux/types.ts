import { Contact } from 'shared/api/types';
import { RequestStatus } from 'shared/helpers/redux';

type State = {
  status: RequestStatus;
  error: string | null;
  contact: Contact;
};

export type { State };
