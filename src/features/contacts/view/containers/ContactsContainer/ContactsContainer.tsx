import { FC, SyntheticEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, CircularProgress, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import styles from './ContactsContainer.module.scss';
import { Contact } from '../Contact/Contact';
import { ContactItems } from 'shared/api/types';
import { Container } from 'shared/components';
import { useAppDispatch } from 'app/hooks';
import { logOut } from 'features/auth/redux/slice';
import { AddModal } from '../../components/AddModal/AddModal';

type Props = {
  contacts: ContactItems[];
  isLoading?: boolean;
  isError?: boolean;
  error?: string;
};

export const ContactsContainer: FC<Props> = ({
  contacts,
  isLoading = false,
  isError = false,
  error = 'Ошибка'
}) => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const searchHandler = (
    e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(e.currentTarget.value);
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchValue.trim().toLowerCase())
  );

  const handleOpenAddModal = () => {
    setIsOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setIsOpenAddModal(false);
  };

  const logoutHandler = () => {
    dispatch(logOut());
  };
  return (
    <Container>
      <header className={styles.header}>
        <Button
          onClick={logoutHandler}
          variant="contained"
          className={styles.logout}
        >
          <LogoutIcon></LogoutIcon>
        </Button>

        <Button
          onClick={handleOpenAddModal}
          variant="contained"
          className={styles.addContactIcon}
        >
          <AddIcon></AddIcon>
        </Button>
      </header>
      <Typography className={styles.heading} variant="h2">
        Ваш список контактов
      </Typography>
      <TextField
        className={styles.input}
        label="Поиск по имени"
        fullWidth
        variant="filled"
        onChange={searchHandler}
        value={searchValue}
      />
      {isLoading && (
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      )}
      {isError && <p className={styles.error}>{error}</p>}
      {filteredContacts.length !== 0 ? (
        <div className={styles.contactsBox}>
          {filteredContacts.map((contact) => (
            <Contact key={contact.id} contact={contact} />
          ))}
        </div>
      ) : (
        !isLoading && <p className={styles.emptyText}>Контактов не найдено</p>
      )}

      <AddModal
        isOpen={isOpenAddModal}
        onClose={handleCloseAddModal}
      ></AddModal>
    </Container>
  );
};
