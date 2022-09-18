import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  fetchLogin,
  LoginQueryParameters
} from 'shared/api/getDataAndAuth/index';

const authAndGetData = createAsyncThunk(
  'loginAndGetData',
  async (queryParameters: LoginQueryParameters) => {
    const result = await fetchLogin(queryParameters);

    if (result instanceof globalThis.Error) {
      return Promise.reject(result);
    }

    return result;
  }
);

export { authAndGetData };
