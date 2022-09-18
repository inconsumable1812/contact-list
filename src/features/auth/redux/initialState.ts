import type { State } from './types';

const initialState: State = {
  status: 'idle',
  error: null,
  user: {
    id: 0,
    name: '',
    password: '',
    contacts: []
  }
};

export { initialState };
