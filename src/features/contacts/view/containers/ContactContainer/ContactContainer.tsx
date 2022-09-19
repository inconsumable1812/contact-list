import { FC, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  TextField,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import Input from 'react-phone-number-input/input';

import styles from './ContactContainer.module.scss';
import { Avatar } from '../../components/Avatar/Avatar';
import { E164Number } from 'shared/types';
import { EditModal } from '../../components/EditModal/EditModal';

type Props = {};

export const ContactContainer: FC<Props> = () => {
  const [value, setValue] = useState<E164Number>('+78005553535');
  const [isOpenChangeModal, setIsOpenChangeModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const handleOpenChangeModal = () => {
    setIsOpenChangeModal(true);
  };

  const handleCloseChangeModal = () => {
    setIsOpenChangeModal(false);
  };

  const handleOpenDeleteModal = () => {
    setIsOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  return (
    <Card className={styles.contact}>
      <div className={styles.contact__container}>
        <Avatar className={styles.contact__avatar} />
        <Typography className={styles.contact__name} variant="h4">
          dfgdfg
        </Typography>
        <div className={`${styles.contact__box} ${styles.contact__phoneBox}`}>
          <PhoneIcon className={styles.contact__phoneIcon}></PhoneIcon>
          <Link
            underline="hover"
            className={styles.contact__phone}
            href={`tel:${value}`}
          >
            <Input onChange={setValue} value={value} disabled></Input>
          </Link>
        </div>

        <div className={`${styles.contact__box} ${styles.contact__emailBox}`}>
          <EmailIcon className={styles.contact__emailIcon}></EmailIcon>
          <Link
            underline="hover"
            className={styles.contact__email}
            href={`mailto:gfhfgh`}
          >
            <Typography>@mail</Typography>
          </Link>
        </div>
      </div>
      <div className={styles.icons}>
        <Button
          onClick={handleOpenChangeModal}
          className={`${styles.button} ${styles.icons__edit}`}
        >
          <EditIcon />
        </Button>

        <Button
          onClick={handleOpenDeleteModal}
          className={`${styles.button} ${styles.icons__delete}`}
        >
          <DeleteIcon />
        </Button>
      </div>

      <EditModal
        name={''}
        phone={undefined}
        email={''}
        isOpen={isOpenChangeModal}
        onClose={handleCloseChangeModal}
      ></EditModal>

      <Dialog open={isOpenDeleteModal} onClose={handleCloseDeleteModal}>
        <DialogTitle>DELETE</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button onClick={handleCloseDeleteModal}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
