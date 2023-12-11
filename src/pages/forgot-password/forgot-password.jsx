import React from 'react';
import styles from "./forgot-password.module.css";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/loader.jsx';
import {
  Button, 
  EmailInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import TextWithLink from '../../components/text-with-link/text-with-link.jsx';
import { forgotPasswordRequest } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

function ForgotPassword() {

  const [formValues, handleChange] = useForm({email:''});

  const {email} = formValues;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      const body = {
        "email": email
      }
      return forgotPasswordRequest(body).then(() => {
        localStorage.setItem('emailFlag', true);
        navigate('/reset-password');
      });
    }
  }

  return (
    <main className={`${styles.main} `}>
      <form className={`${styles.form} pt-15 pb-20`} onSubmit={handleSubmit}>
        <h1 className={`${styles.title} text text_type_main-medium pt-15 `}>
          Восстановление пароля
        </h1>
        <EmailInput 
          placeholder="Укажите e-mail"
          name={'email'}
          value={email}
          onChange={handleChange}
        />
        <Button  
          htmlType="submit" 
          type="primary" 
          size="medium"
        >
          Восстановить
        </Button>
      </form>
      <div className={`${styles.help}`}>      
        <TextWithLink text={'Вспомнили пароль?'} link={'/login'} linkText={'Войти'} />
      </div>
    </main>
  );
}

export default ForgotPassword;