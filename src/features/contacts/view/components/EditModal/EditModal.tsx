import { FC } from 'react';
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
import { EditForm } from './types';
import './EditModal.scss';
import { PhoneInputCustom } from '../CustomPhoneInput/CustomPhoneInput';
import { useAppDispatch } from 'app/hooks';
import { editContact } from 'features/contacts/redux/slice';

type Props = {
  name: string;
  phone: string;
  email: string;
  id: number;
  isOpen: boolean;
  onClose: () => void;
};

export const EditModal: FC<Props> = ({
  phone,
  onClose,
  name,
  id,
  isOpen,
  email
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<EditForm>({
    defaultValues: {
      name,
      phone,
      email
    },
    mode: 'onChange'
  });

  const dispatch = useAppDispatch();

  const submitHandler = (val: EditForm) => {
    const item = { ...val, id };

    dispatch(editContact(item));
    onClose();
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit(submitHandler)}>
      <Dialog
        disablePortal
        className="edit-form__modal"
        open={isOpen}
        onClose={onClose}
      >
        <DialogTitle className="edit-form__header">Редактор</DialogTitle>
        <DialogContent className="edit-form__content">
          <TextField
            className="edit-form__name"
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
            className="edit-form__phone-container"
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
            className="edit-form__email"
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
          <Button type="submit">Изменить</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};
