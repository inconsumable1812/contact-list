import { E164Number } from 'shared/types';

export type EditForm = {
  name: string;
  phone: E164Number;
  email: string;
};
