import React from 'react';
import styles from "./register.module.css";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/loader/loader.jsx';
import {
  Input,
  PasswordInput,
  EmailInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import TextWithLink from '../components/text-with-link/text-with-link.jsx';
import { register } from '../services/actions/user';

function Register() {

  const dispatch = useDispatch();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (email && password) {
      const body = {
        "email": email,
        "password": password,
        "name": name,
      }
      console.log(body);
      dispatch(register(body));
    }
  }

  return (
    <main className={`${styles.main} `}>
      <form className={`${styles.form} pt-15 pb-20`}>
        <h1 className={`${styles.title} text text_type_main-medium pt-15 `}>
          Регистрация
        </h1>
        <Input 
          type="text" 
          placeholder="Имя" 
          name={'name'} 
          onChange={handleChangeName}
          value={name}
        />
        <EmailInput
          name={'email'}
          placeholder="E-mail"
          value={email}
          onChange={handleChangeEmail}
        />
        <PasswordInput
          name={'password'}
          extraClass="mb-2"
          value={password}
          onChange={handleChangePassword}
        />
        <Button htmlType="submit" type="primary" size="medium" onClick={handleClick}>
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