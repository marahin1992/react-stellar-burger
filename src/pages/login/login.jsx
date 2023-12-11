import React from 'react';
import styles from "./login.module.css";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/loader.jsx';
import {
  Input,
  PasswordInput,
  Button,
  EmailInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import TextWithLink from '../../components/text-with-link/text-with-link.jsx';
import { login } from '../../services/actions/user';
import { useForm } from '../../hooks/useForm';

function Login() {

  const dispatch = useDispatch();

  const [formValues, handleChange] = useForm({email:'', password:''});

  const {email, password} = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      const body = {
        "email": email,
        "password": password,
      }
      dispatch(login(body));
    }
  }

  return (
    <main className={`${styles.main} `}>
      <form className={`${styles.form} pt-15 pb-20`} onSubmit={handleSubmit}>
        <h1 className={`${styles.title} text text_type_main-medium pt-15 `}>
          Вход
        </h1>
        <EmailInput
          name={'email'}
          placeholder="E-mail"
          value={email}
          onChange={handleChange}
        />
        <PasswordInput
          name={'password'}
          extraClass="mb-2"
          value={password}
          onChange={handleChange}
        />
        <Button 
          htmlType="submit" 
          type="primary" 
          size="medium" 
        >
          Войти
        </Button>
      </form>
      <div className={`${styles.help}`}>
        <TextWithLink text={'Вы новый пользователь?'} link={'/register'} linkText={'Зарегистрироваться'} />
        <TextWithLink text={'Забыли пароль?'} link={'/forgot-password'} linkText={'Восстановить пароль'} />
      </div>
    </main>
  );
}

export default Login;