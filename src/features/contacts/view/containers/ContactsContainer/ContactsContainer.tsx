import { FC } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';

import styles from './AuthContainer.module.scss';

import { Container, Loader } from 'shared/components';

type Props = {
  isLoading?: boolean;
  isError?: boolean;
  error?: string;
};

export const ContactsContainer: FC<Props> = ({
  isLoading = false,
  isError = false,
  error = ''
}) => {
  return <Container>dfg</Container>;
};
