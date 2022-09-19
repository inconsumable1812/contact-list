import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchContacts, ContactsQueryParameters } from 'shared/api/getContacts';

const getContacts = createAsyncThunk(
  'getContacts',
  async (queryParameters: ContactsQueryParameters) => {
    const result = await fetchContacts(queryParameters);

    if (result instanceof globalThis.Error) {
      return Promise.reject(result);
    }

    return result;
  }
);

export { getContacts };
