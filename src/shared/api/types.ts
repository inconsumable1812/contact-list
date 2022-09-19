export type User = {
  id: number;
  name: string;
  password: string;
};

export type Contact = {
  id: number;
  forUserID: number;
  items: ContactItems[];
};

export type ContactItems = {
  name: string;
  email: string;
  phone: string;
  id: number;
};
