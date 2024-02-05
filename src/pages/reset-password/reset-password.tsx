import React from 'react';
import styles from "./reset-password.module.css";
import {
  Input,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import TextWithLink from '../../components/text-with-link/text-with-link';
import { useNavigate } from 'react-router-dom';
import { resetPasswordRequest } from '../../services/api';
import { useForm } from '../../hooks/useForm';

function ResetPassword() {

  const [formValues, handleChange] = useForm({password:'', token:''});

  const {password, token} = formValues;

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem('emailFlag')) {
      navigate('/');
    }
  },[])


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password && token) {
      return resetPasswordRequest(formValues).then(() => {
        localStorage.setItem("emailFlag", '');
        navigate('/login');
      });
    }
  }

  return (
    <main className={`${styles.main} `}>
      <form className={`${styles.form} pt-15 pb-20`} onSubmit={handleSubmit}>
        <h1 className={`${styles.title} text text_type_main-medium pt-15 `}>
          Восстановление пароля
        </h1>
        <PasswordInput
          name={'password'}
          extraClass="mb-2"
          placeholder='Введите новый пароль'
          value={password}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          name={'token'}
          value={token}
          onChange={handleChange}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Сохранить
        </Button>
      </form>
      <div className={`${styles.help}`}>
        <TextWithLink text={'Вспомнили пароль?'} link={'/login'} linkText={'Войти'} />
      </div>
    </main>
  );
}

export default ResetPassword;