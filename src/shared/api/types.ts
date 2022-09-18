export type User = {
  id: number;
  name: string;
  password: string;
  contacts: Contact[];
};

export type Contact = {
  name: string;
  email: string;
  phone: string;
};
