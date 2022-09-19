import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectUser } from 'features/auth/redux/slice';
// import styles from './Auth.module.scss';
import { ContactsContainer } from './view/containers/ContactsContainer/ContactsContainer';
import { REQUEST_STATUS } from 'shared/helpers/redux';
import { selectContacts } from './redux/selectors';
import { useAuth } from 'shared/hooks/useAuth';
import { getContacts } from './redux/thunks/getContacts';
import { useNavigate } from 'react-router-dom';

type Props = {};

export const Contacts: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const { status, error, contact } = useAppSelector(selectContacts);
  const isAuth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth === false) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    dispatch(getContacts({ userID: user.id }));
  }, [dispatch, user.id]);

  const { items } = contact;

  // const contacts = [
  //   {
  //     name: 'Super Man',
  //     email: 'uf31@ml.com',
  //     phone: '+78005553543',
  //     id: 1
  //   },
  //   {
  //     name: 'Super Woman',
  //     email: 'uf32@ml.com',
  //     phone: '+78005553544',
  //     id: 2
  //   },
  //   {
  //     name: 'Batman Super',
  //     email: 'uf33@ml.com',
  //     phone: '+78005553565',
  //     id: 3
  //   }
  // ];

  switch (status) {
    case REQUEST_STATUS.idle: {
      return <ContactsContainer contacts={items} />;
    }
    case REQUEST_STATUS.pending: {
      return <ContactsContainer contacts={items} isLoading />;
    }
    case REQUEST_STATUS.fulfilled: {
      return <ContactsContainer contacts={items} />;
    }
    case REQUEST_STATUS.rejected: {
      return (
        <ContactsContainer contacts={items} isError error={error as string} />
      );
    }
    default: {
      return null;
    }
  }
};
