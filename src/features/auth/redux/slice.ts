import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './initialState';
import { authAndGetData } from './thunks/authAndGetData';
import { selectData } from './selectors';

const slice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    statusReset: (state) => {
      state.status = 'idle';
    },
    logOut: (state) => {
      state.users = initialState.users;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authAndGetData.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(authAndGetData.fulfilled, (state, action) => {
        const { payload } = action;
        const { contacts, id, name, password } = payload;

        state.status = 'fulfilled';
        state.users.contacts = contacts ?? [];
        state.users.id = id ?? 0;
        state.users.name = name ?? '';
        state.users.password = password ?? '';
      })
      .addCase(authAndGetData.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message ?? '';
      });
  }
});

const { reducer } = slice;

const { statusReset, logOut } = slice.actions;

export { reducer, selectData, statusReset, logOut };
