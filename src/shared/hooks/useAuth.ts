import { useAppSelector } from 'app/hooks';
import { selectData } from 'features/auth/redux/selectors';

export const useAuth = () => {
  const { user } = useAppSelector(selectData);

  if (user.name === '') {
    return false;
  }

  return true;
};
