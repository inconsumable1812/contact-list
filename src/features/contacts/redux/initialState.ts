import type { State } from './types';

const initialState: State = {
  status: 'idle',
  error: null,
  contact: {
    forUserID: 0,
    id: 0,
    items: []
  }
};

export { initialState };
