import type { RootState } from 'app/store';

const selectData = (state: RootState) => state.data;

export { selectData };
