import { FC, useState } from 'react';
import {
  Box,
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

type Props = {};
type E164Number = any;

export const ContactContainer: FC<Props> = () => {
  const [value, setValue] = useState<E164Number>(+786786);
  const [isOpenChangeModal, setIsOpenChangeModal] = useState(false);

  const handleOpenChangeModal = () => {
    setIsOpenChangeModal(true);
  };

  const handleCloseChangeModal = () => {
    setIsOpenChangeModal(false);
  };

  return (
    <Card className={styles.contact}>
      <div className={styles.contact__container}>
        <Avatar className={styles.contact__avatar} />
        <Typography className={styles.contact__name} variant="h4">
          dfgdfg
        </Typography>
        <div className={styles.contact__phoneBox}>
          <PhoneIcon className={styles.contact__phoneIcon}></PhoneIcon>
          <Link
            underline="hover"
            className={styles.contact__phone}
            href={`tel:${value}`}
          >
            <Typography>7567567657</Typography>
          </Link>
        </div>

        <div className={styles.contact__emailBox}>
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

        <Button className={`${styles.button} ${styles.icons__delete}`}>
          <DeleteIcon />
        </Button>
      </div>
      <Dialog open={isOpenChangeModal} onClose={handleCloseChangeModal}>
        <DialogTitle>Subscribe</DialogTitle>
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
          <Button onClick={handleCloseChangeModal}>Cancel</Button>
          <Button onClick={handleCloseChangeModal}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
