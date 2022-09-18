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

    if (result.length === 0) {
      throw new Error('Неверный логин или пароль');
    }

    return result;
  }
);

export { authAndGetData };
