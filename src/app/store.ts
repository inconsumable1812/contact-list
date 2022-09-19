import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { reducer as userReducer } from 'features/auth';
import { reducer as contactsReducer } from 'features/contacts';

export const store = configureStore({
  reducer: {
    user: userReducer,
    contacts: contactsReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
