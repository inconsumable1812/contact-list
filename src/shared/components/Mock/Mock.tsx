import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'shared/components';
import styles from './Mock.module.scss';

type Props = {};

const Mock: FC<Props> = () => {
  return (
    <Container>
      <h1 className={styles.heading}>Страницы не существует!</h1>
      <nav className={styles.nav}>
        <Link to="/">на страницу регистрации</Link>
        <Link to="/contacts">К контактам</Link>
      </nav>
    </Container>
  );
};

export { Mock };
