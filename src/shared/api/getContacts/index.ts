import { fetch as fetchContacts } from './fetch';
import {
  QueryParameters as ContactsQueryParameters,
  Response as ContactsResponse
} from './types';

export type { ContactsQueryParameters, ContactsResponse };

export { fetchContacts };
