import React, { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';

type Props = {
  name: string;
  isOpen: boolean;
  onClose: () => void;
};

export const DeleteModal: FC<Props> = ({ name, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Name</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Вы действительно хотите удалить этот контакт?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={onClose}>Удалить</Button>
      </DialogActions>
    </Dialog>
  );
};
