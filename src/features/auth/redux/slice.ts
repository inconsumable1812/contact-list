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
      state.user = initialState.user;
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
        const { contacts, id, name, password } = payload[0];

        state.status = 'fulfilled';
        state.user.contacts = contacts ?? [];
        state.user.id = id ?? 0;
        state.user.name = name ?? '';
        state.user.password = password ?? '';
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
