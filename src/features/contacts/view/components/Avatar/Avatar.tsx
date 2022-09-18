import { FC } from 'react';
import { Avatar as MuiAvatar } from '@mui/material';

import styles from './AuthContainer.module.scss';
import { stringAvatar } from './utils/stringAvatar';

type Props = {
  className: string;
  name?: string;
};

export const Avatar: FC<Props> = ({ className, name = '' }) => {
  return <MuiAvatar className={className} {...stringAvatar('Kent Dodds')} />;
};
