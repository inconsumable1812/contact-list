import { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import { REQUEST_STATUS } from 'shared/helpers/redux';
import { AuthContainer } from './view/AuthContainer';
import { selectUser } from './redux/slice';
import styles from './Auth.module.scss';
import { Container } from 'shared/components';

type Props = {};

export const Auth: FC<Props> = () => {
  const { status, error } = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === REQUEST_STATUS.fulfilled) {
      navigate('/contacts');
    }
  }, [navigate, status]);

  switch (status) {
    case REQUEST_STATUS.idle: {
      return <AuthContainer />;
    }
    case REQUEST_STATUS.pending: {
      return <AuthContainer isLoading />;
    }
    case REQUEST_STATUS.fulfilled: {
      return (
        <Container>
          <h1>Вы уже вошли!</h1>
          <Link to={'/contacts'}>К контактам</Link>
        </Container>
      );
    }
    case REQUEST_STATUS.rejected: {
      return <AuthContainer isError error={error as string} />;
    }
    default: {
      return null;
    }
  }
};
