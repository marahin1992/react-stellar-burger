import React, { useEffect, useRef } from 'react';
import styles from "./profile.module.css";
import { useDispatch, useSelector } from 'react-redux';
import {
  Input,
  PasswordInput,
  Button,
  EmailInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileNavigation from '../../components/profile-navigation/profile-navigation';
import { useState } from "react";
import { patchUser } from '../../services/actions/user';
import { useForm } from '../../hooks/useForm';


function Profile() {

  const nameRef = useRef('');

  const user = useSelector(state => state.user.user);

  const dispatch = useDispatch();

  const [formValues, handleChange, handleReset, isEdit] = useForm({name:'', email:'', password:''});

  const [disabled, setDisabled] = useState(true);

  React.useEffect(() => {
    handleReset({...user, password:''});
  },[user]);


  const handleClickSave = (e) => {
    e.preventDefault();
    dispatch(patchUser(formValues));
  }

  const handleClickReset = () => {
    handleReset({...user, password:''});
  }

  //кастомизация инпута имени профиля
  const handleIconClick = () => {
    setDisabled(false);
  }

  useEffect(() => {
    if (!disabled) {
      nameRef.current.focus();
    }
  }, [disabled])

  const handleOnBlur = () => {
    setDisabled(true);
  }

  return (
    <main className={`${styles.main} `}>
      <ProfileNavigation subtitle={'В этом разделе вы можете изменить свои персональные данные'} />
      <form className={`${styles.edit} pt-30` } onSubmit={handleClickSave}>
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
          type="email"
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
            onClick={handleClickSave}
          >
            Сохранить
          </Button>
        </div>)}
      </form>
    </main>
  );
}

export default Profile;