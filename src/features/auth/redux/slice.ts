import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './initialState';
import { authAndGetUser } from './thunks/authAndGetUser';
import { selectUser } from './selectors';

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
      .addCase(authAndGetUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(authAndGetUser.fulfilled, (state, action) => {
        const { payload } = action;
        const { id, name, password } = payload[0];

        state.status = 'fulfilled';
        state.user.id = id ?? 0;
        state.user.name = name ?? '';
        state.user.password = password ?? '';
      })
      .addCase(authAndGetUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message ?? '';
      });
  }
});

const { reducer } = slice;

const { statusReset, logOut } = slice.actions;

export { reducer, selectUser, statusReset, logOut };
