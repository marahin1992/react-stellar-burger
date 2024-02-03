import React, { useEffect, useRef } from 'react';
import styles from "./profile-info.module.css";
import { useDispatch, useSelector } from '../../services/store';
import {
  Input,
  PasswordInput,
  Button,
  EmailInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from "react";
import { patchUser } from '../../services/actions/user';
import { useForm } from '../../hooks/useForm';


function ProfileInfo() {

  const nameRef = useRef<HTMLInputElement>(null);

  const user = useSelector(state => state.user.user);

  const dispatch = useDispatch();

  const [formValues, handleChange, handleReset, isEdit] = useForm<{name: string; email: string ; password: string }>({ name: '', email: '', password: '' });

  const [disabled, setDisabled] = useState(true);

  React.useEffect(() => {
    handleReset({ ...user!, password: '' });
  }, [user]);


  const handleClickSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(patchUser(formValues));
  }

  const handleClickReset = () => {
    handleReset({ ...user!, password: '' });
  }

  //кастомизация инпута имени профиля
  const handleIconClick = () => {
    setDisabled(false);
  }

  useEffect(() => {
    if (!disabled && nameRef && nameRef.current) {
      nameRef.current.focus();
    }
  }, [disabled, nameRef])

  const handleOnBlur = () => {
    setDisabled(true);
  }

  return (
    <form className={`${styles.edit} pt-30`} onSubmit={handleClickSave}>
      <Input
        type="text"
        placeholder="Имя"
        icon="EditIcon"
        name={'name'}
        extraClass="mb-2"
        value={formValues.name}
        onChange={handleChange}
        disabled={disabled}
        onIconClick={handleIconClick}
        ref={nameRef}
        onBlur={handleOnBlur}
      />
      <EmailInput
        name={'email'}
        placeholder="E-mail"
        isIcon={true}
        extraClass="mb-2"
        value={formValues.email}
        onChange={handleChange}
      />
      <PasswordInput
        name={'password'}
        icon="EditIcon"
        value={formValues.password}
        onChange={handleChange}
      />
      {isEdit && (<div className={styles.buttons}>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={handleClickReset}
        >
          Отмена
        </Button>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          onClick={() => handleClickSave}
        >
          Сохранить
        </Button>
      </div>)}
    </form>
  );
}

export default ProfileInfo;