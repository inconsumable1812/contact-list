import React, { FC, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from '@mui/material';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import './EditModal.scss';
import { E164Number } from 'shared/types';
import { useForm } from 'react-hook-form';

type Props = {
  name: string;
  phone: E164Number;
  email: string;
  isOpen: boolean;
  onClose: () => void;
};

interface CustomProps {
  onChange: (event: { target: { name: string; value: E164Number } }) => void;
  value: E164Number;
  name: string;
}

const PhoneInputCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, value, ...other } = props;
    return (
      <PhoneInput
        {...other}
        defaultCountry="RU"
        countryCallingCodeEditable={false}
        international
        inputRef={ref}
        onChange={(value: any) => {
          onChange({ target: { name: props.name, value } });
        }}
        value={value}
      />
    );
  }
);

type EditForm = {
  name: string;
  phone: E164Number;
  email: string;
};

export const EditModal: FC<Props> = ({
  phone,
  onClose,
  name,
  isOpen,
  email
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<EditForm>({
    defaultValues: {
      name: 'user1',
      phone: '+78000',
      email: '@mail'
    },
    mode: 'onSubmit'
  });
  // const [val, setVal] = useState<E164Number>('');

  // const handler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(event, 'event');

  //   setVal(event.currentTarget?.value);
  // };

  return (
    <form>
      <Dialog className="edit-modal" open={isOpen} onClose={onClose}>
        <DialogTitle className="edit-modal__header">Редактор</DialogTitle>
        <DialogContent>
          <TextField
            label="Имя"
            type="text"
            fullWidth
            variant="filled"
            {...register('name', {
              required: 'Введите логин',
              minLength: {
                value: 3,
                message: 'Минимальная длина 3'
              }
            })}
          />

          <TextField
            {...register('phone', {
              required: 'Введите логин',

              minLength: {
                value: 3,
                message: 'Минимальная длина 3'
              }
            })}
            value={getValues().phone}
            InputProps={{
              inputComponent: PhoneInputCustom as any
            }}
          />

          {/* <PhoneInput
            className="edit-modal__phone"
            international
            defaultCountry="RU"
            countryCallingCodeEditable={false}
            {...register('phone', {
              required: 'Введите логин',

              minLength: {
                value: 3,
                message: 'Минимальная длина 3'
              }
            })}
          /> */}

          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={onClose}>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};
