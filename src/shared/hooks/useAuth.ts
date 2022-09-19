import { useAppSelector } from 'app/hooks';
import { selectUser } from 'features/auth/redux/selectors';

export const useAuth = () => {
  const { user } = useAppSelector(selectUser);

  if (user.id === 0) {
    return false;
  }

  return true;
};
