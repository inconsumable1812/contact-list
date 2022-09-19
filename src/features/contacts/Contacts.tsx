import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ContactsContainer } from './view/containers/ContactsContainer/ContactsContainer';
import { REQUEST_STATUS } from 'shared/helpers/redux';
import { selectContacts } from './redux/selectors';
import { useAuth } from 'shared/hooks/useAuth';
import { getContacts } from './redux/thunks/getContacts';
import { useNavigate } from 'react-router-dom';
import { useUserID } from 'shared/hooks/useUserID';

type Props = {};

export const Contacts: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { status, error, contact } = useAppSelector(selectContacts);
  const isAuth = useAuth();
  const userID = useUserID();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth === false) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    dispatch(getContacts({ userID }));
  }, [dispatch, userID]);

  const { items } = contact;

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
