import { useAppSelector } from 'app/hooks';
import { selectData } from 'features/auth/redux/selectors';

export const useAuth = () => {
  const { users } = useAppSelector(selectData);

  if (users.name !== '') {
    return true;
  }

  return false;
};
