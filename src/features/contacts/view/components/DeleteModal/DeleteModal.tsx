import React, { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { removeContact } from 'features/contacts/redux/slice';

type Props = {
  name: string;
  id: number;
  isOpen: boolean;
  onClose: () => void;
};

export const DeleteModal: FC<Props> = ({ name, id, isOpen, onClose }) => {
  const dispatch = useAppDispatch();

  const removeHandler = () => {
    dispatch(removeContact(id));
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Вы действительно хотите удалить этот контакт?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={removeHandler}>Удалить</Button>
      </DialogActions>
    </Dialog>
  );
};
