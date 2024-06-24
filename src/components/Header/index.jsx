import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import styles from './Header.module.scss';
import logoImage from '../../logo2.jpg'; // Замените путь на ваш путь к изображению

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userId = useSelector(state => state.auth.data?._id); // Получение id пользователя из состояния

  const onClickLogout = () => {
    if (window.confirm('Хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>На главную</div>
          </Link>
          <div className={styles.container}>
            <img src={logoImage} alt="Logo" className={styles.logoImage} />
            <div className={styles.text}>Книжный магазин PAPIER</div>
          </div>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                {userId === '663923ceeb8ba9ca54f12ad4' && (
                  <Link to="/add-post">
                    <Button variant="contained">Добавить книгу</Button>
                  </Link>
                )}
                <Link to="/cart">
                  <Button variant="contained">Корзина</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
                <Link to="/cart">
                  <Button variant="contained">Корзина</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
