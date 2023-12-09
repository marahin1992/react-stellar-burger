import React from 'react';
import styles from "./reset-password.module.css";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/loader/loader.jsx';
import {
  Input,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import TextWithLink from '../components/text-with-link/text-with-link.jsx';
import { useNavigate } from 'react-router-dom';
import { resetPasswordRequest } from '../services/api';

function ResetPassword() {

  const [resetForm, setResetForm] = React.useState({});

  const navigate = useNavigate();

  React.useEffect(() => {
    console.log(!localStorage.getItem('emailFlag'));
    if (!localStorage.getItem('emailFlag')) {
      navigate('/');
    }
  },[])

  const handleChange = (e) => {
    setResetForm({...resetForm, [e.target.name]: e.target.value })
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (resetForm.password && resetForm.token) {
      return resetPasswordRequest(resetForm).then(() => {
        localStorage.setItem("emailFlag", false);
        navigate('/login');
      });
    }
  }

  return (
    <main className={`${styles.main} `}>
      <form className={`${styles.form} pt-15 pb-20`}>
        <h1 className={`${styles.title} text text_type_main-medium pt-15 `}>
          Восстановление пароля
        </h1>
        <PasswordInput
          name={'password'}
          extraClass="mb-2"
          placeholder='Введите новый пароль'
          value={resetForm.password}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          name={'token'}
          value={resetForm.token}
          onChange={handleChange}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          onClick={handleClick}
        >
          Зарегистрироваться
        </Button>
      </form>
      <div className={`${styles.help}`}>
        <TextWithLink text={'Вспомнили пароль?'} link={'/login'} linkText={'Войти'} />
      </div>
    </main>
  );
}

export default ResetPassword;