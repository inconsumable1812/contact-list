import { FC, useState } from 'react';
import { Button, Card, Link, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { formatPhoneNumberIntl } from 'react-phone-number-input';

import styles from './Contact.module.scss';
import { Avatar } from '../../components/Avatar/Avatar';
import { EditModal } from '../../components/EditModal/EditModal';
import { DeleteModal } from '../../components/DeleteModal/DeleteModal';
import { ContactItems } from 'shared/api/types';

type Props = {
  contact: ContactItems;
};

export const Contact: FC<Props> = ({ contact }) => {
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
        <Avatar name={contact.name} className={styles.contact__avatar} />
        <Tooltip
          className={styles.contact__nameTooltip}
          title={contact.name}
          placement="top"
          componentsProps={{
            tooltip: {
              style: {
                fontSize: '1rem'
              }
            }
          }}
        >
          <Typography className={styles.contact__name} variant="h4">
            {contact.name}
          </Typography>
        </Tooltip>
        <div className={`${styles.contact__box} ${styles.contact__phoneBox}`}>
          <PhoneIcon className={styles.contact__phoneIcon}></PhoneIcon>
          <Link
            underline="hover"
            className={styles.contact__phone}
            href={`tel:${contact.phone}`}
          >
            <p>{formatPhoneNumberIntl(contact.phone ?? '')}</p>
          </Link>
        </div>

        <div className={`${styles.contact__box} ${styles.contact__emailBox}`}>
          <EmailIcon className={styles.contact__emailIcon}></EmailIcon>
          <Link
            underline="hover"
            className={styles.contact__email}
            href={`mailto:gfhfgh`}
          >
            <Typography className={styles.contact__emailText}>
              {contact.email}
            </Typography>
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
        name={contact.name}
        phone={contact.phone}
        email={contact.email}
        id={contact.id}
        isOpen={isOpenChangeModal}
        onClose={handleCloseChangeModal}
      ></EditModal>

      <DeleteModal
        name={contact.name}
        id={contact.id}
        isOpen={isOpenDeleteModal}
        onClose={handleCloseDeleteModal}
      ></DeleteModal>
    </Card>
  );
};
