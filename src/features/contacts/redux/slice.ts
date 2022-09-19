import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialState } from './initialState';
import { getContacts } from './thunks/getContacts';
import { selectContacts } from './selectors';
import { ContactItems } from 'shared/api/types';

const slice = createSlice({
  name: 'contactData',
  initialState,
  reducers: {
    statusReset: (state) => {
      state.status = 'idle';
    },
    removeContact: (state, action: PayloadAction<number>) => {
      const { payload } = action;
      state.contact.items = state.contact.items.filter(
        (contact) => contact.id !== payload
      );
    },
    addContact: (state, action: PayloadAction<ContactItems>) => {
      const { payload } = action;
      state.contact.items.push(payload);
    },
    editContact: (state, action: PayloadAction<ContactItems>) => {
      const { payload } = action;
      const currentContact = state.contact.items.find(
        (cont) => cont.id === payload.id
      );

      if (currentContact === undefined) {
        state.contact.items.push(payload);
        return;
      }

      currentContact.email = payload.email;
      currentContact.name = payload.name;
      currentContact.phone = payload.phone;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        const { payload } = action;
        const { items, id, forUserID } = payload[0];

        state.status = 'fulfilled';
        state.contact.forUserID = forUserID ?? 0;
        state.contact.id = id ?? 0;
        state.contact.items = items ?? [];
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message ?? '';
      });
  }
});

const { reducer } = slice;

const { statusReset, removeContact, editContact, addContact } = slice.actions;

export {
  reducer,
  selectContacts,
  statusReset,
  removeContact,
  editContact,
  addContact
};
