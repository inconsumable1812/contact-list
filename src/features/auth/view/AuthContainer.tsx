import { FC } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';

import styles from './AuthContainer.module.scss';
import { AuthForm } from './types';
import { Container, Loader } from 'shared/components';
import { useAppDispatch } from 'app/hooks';
import { authAndGetData } from '../redux/thunks/authAndGetData';

type Props = {
  isLoading?: boolean;
  isError?: boolean;
  error?: string;
};

export const AuthContainer: FC<Props> = ({
  isLoading = false,
  isError = false,
  error = ''
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthForm>({
    defaultValues: {
      login: '',
      password: ''
    },
    mode: 'onSubmit'
  });

  const dispatch = useAppDispatch();

  const loginHandler = (val: AuthForm) => {
    dispatch(authAndGetData(val));
  };

  return (
    <Container>
      <Paper className={styles.paper}>
        {isLoading && (
          <div className={styles.loader}>
            <Loader />
          </div>
        )}
        <form onSubmit={handleSubmit(loginHandler)}>
          <Typography className={styles.title} variant="h5">
            Вход в аккаунт
          </Typography>
          <TextField
            className={styles.field}
            label="Логин"
            error={!!errors.login?.message}
            helperText={errors.login?.message}
            fullWidth
            {...register('login', {
              required: 'Введите логин',
              minLength: {
                value: 3,
                message: 'Минимальная длина 3'
              }
            })}
          />
          <TextField
            className={styles.field}
            label="Пароль"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            fullWidth
            {...register('password', {
              required: 'Минимальная длина 6',
              minLength: 6
            })}
          />
          <Button size="large" variant="contained" type="submit" fullWidth>
            Войти
          </Button>
        </form>
      </Paper>

      {isError && <p className={styles.error}>{error}</p>}
    </Container>
  );
};
