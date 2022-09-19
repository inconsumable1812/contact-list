import { useAppSelector } from 'app/hooks';
import { selectUser } from 'features/auth/redux/selectors';

export const useUserID = () => {
  const { user } = useAppSelector(selectUser);

  return user.id;
};
