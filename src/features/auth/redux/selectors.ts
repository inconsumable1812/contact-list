import type { RootState } from 'app/store';

const selectUser = (state: RootState) => state.user;

export { selectUser };
