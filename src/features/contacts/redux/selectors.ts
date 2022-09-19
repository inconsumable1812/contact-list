import type { RootState } from 'app/store';

const selectContacts = (state: RootState) => state.contacts;

export { selectContacts };
