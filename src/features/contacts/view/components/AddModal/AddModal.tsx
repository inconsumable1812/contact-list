import React, { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from '@mui/material';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { useForm } from 'react-hook-form';

import { emailRegex } from 'shared/helpers/regex';
import { AddForm } from './types';
import './AddModal.scss';
import { PhoneInputCustom } from '../CustomPhoneInput/CustomPhoneInput';
import { useAppDispatch } from 'app/hooks';
import { addContact } from 'features/contacts/redux/slice';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddModal: FC<Props> = ({ onClose, isOpen }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<AddForm>({
    defaultValues: {
      name: '',
      phone: '',
      email: ''
    },
    mode: 'onChange'
  });

  const dispatch = useAppDispatch();

  const submitHandler = (val: AddForm) => {
    const item = { ...val, id: new Date().getTime() };

    dispatch(addContact(item));
    reset();
    onClose();
  };

  return (
    <form className="add-form" onSubmit={handleSubmit(submitHandler)}>
      <Dialog
        disablePortal
        className="add-form__modal"
        open={isOpen}
        onClose={onClose}
      >
        <DialogTitle className="add-form__header">Добавить контакт</DialogTitle>
        <DialogContent className="add-form__content">
          <TextField
            className="add-form__name"
            margin="dense"
            label="Имя"
            type="text"
            fullWidth
            variant="filled"
            error={!!errors.name?.message}
            helperText={errors.name?.message}
            {...register('name', {
              required: 'Введите имя',
              minLength: {
                value: 3,
                message: 'Минимальная длина 3'
              }
            })}
          />

          <TextField
            margin="dense"
            className="add-form__phone-container"
            InputProps={{
              // TODO https://mui.com/material-ui/react-text-field/#integration-with-3rd-party-input-libraries
              inputComponent: PhoneInputCustom as any,
              inputProps: {
                control: control,
                rules: {
                  required: 'Введите номер',
                  validate: {
                    isPossible: (value: any) =>
                      isPossiblePhoneNumber(value) || 'Неправильный номер'
                  }
                }
              }
            }}
            fullWidth
            variant="filled"
            type="tel"
            error={!!errors.phone?.message}
            helperText={errors.phone?.message}
          />

          <TextField
            className="add-form__email"
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="filled"
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            {...register('email', {
              required: 'Введите почту',
              pattern: {
                value: emailRegex,
                message: 'Неправильная почта'
              }
            })}
          />
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={onClose}>
            Отмена
          </Button>
          <Button type="submit">Добавить</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};
