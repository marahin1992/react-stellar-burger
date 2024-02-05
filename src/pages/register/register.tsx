import React from 'react';
import styles from "./register.module.css";
import { useDispatch, useSelector } from '../../services/store';
import {
  Input,
  PasswordInput,
  EmailInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import TextWithLink from '../../components/text-with-link/text-with-link';
import { register } from '../../services/actions/user';
import { useForm } from '../../hooks/useForm';

function Register() {

  const dispatch = useDispatch();

  const [formValues, handleChange] = useForm({name:'',email:'',password:''});

  const {name, email, password} = formValues;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      const body = {
        "email": email,
        "password": password,
        "name": name,
      }
      dispatch(register(body));
    }
  }

  return (
    <main className={`${styles.main} `}>
      <form className={`${styles.form} pt-15 pb-20`} onSubmit={handleSubmit}>
        <h1 className={`${styles.title} text text_type_main-medium pt-15 `}>
          Регистрация
        </h1>
        <Input 
          type="text" 
          placeholder="Имя" 
          name={'name'} 
          onChange={handleChange}
          value={name}
        />
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
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <div className={`${styles.help}`}>
        <TextWithLink text={'Уже зарегистрированы?'} link={'/login'} linkText={'Войти'} />
      </div>
    </main>
  );
}

export default Register;