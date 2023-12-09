import React, { useEffect, useRef } from 'react';
import styles from "./profile.module.css";
import { useDispatch, useSelector } from 'react-redux';
import {
  Input,
  PasswordInput,
  Button,
  EmailInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileNavigation from '../components/profile-navigation/profile-navigation';
import { useState } from "react";
import { getUser, patchUser } from '../services/actions/user';


function Profile() {

  const nameRef = useRef('');

  const user = useSelector(state => state.user.user);

  const dispatch = useDispatch();

  const [profileForm, setProfileForm] = React.useState({isEdit: false, disabled: true, form:{name:'marah', email:'marahin199@ya.ru', password:''}});

  React.useEffect(() => {
    setProfileForm({...profileForm, form: {...user, password:''}, isEdit: false});
  },[user]);

  const handleChange = (e) => {
    setProfileForm({...profileForm, form:{...profileForm.form, [e.target.name]: e.target.value}, isEdit: true })
  }

  const handleClickSave = () => {
    dispatch(patchUser(profileForm.form));
  }

  const handleClickReset = () => {
    setProfileForm({...profileForm, form: {...user, password:''}, isEdit: false});
  }

  const handleIconClick = () => {
    setProfileForm({...profileForm, disabled: false});
    
  }

  useEffect(() => {
    if (!profileForm.disabled) {
      nameRef.current.focus();
    }
  }, [profileForm.disabled])

  const handleOnBlur = () => {
    setProfileForm({...profileForm, disabled: true});
  }

  return (
    <main className={`${styles.main} `}>
      <ProfileNavigation subtitle={'В этом разделе вы можете изменить свои персональные данные'} />
      <div className={`${styles.edit} pt-30`}>
        <Input
          type="text"
          placeholder="Имя"
          icon="EditIcon"
          name={'name'}
          extraClass="mb-2"
          value={profileForm.form.name}
          onChange={handleChange}
          disabled={profileForm.disabled}
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
          value={profileForm.form.email}
          onChange={handleChange}
        />
        <PasswordInput
          name={'password'}
          icon="EditIcon"
          value={profileForm.form.password}
          onChange={handleChange}
        />
        {profileForm.isEdit && (<div className={styles.buttons}>
          <Button  
            htmlType="button" 
            type="secondary" 
            size="medium"
            onClick={handleClickReset}
          >
            Отмена
          </Button>
          <Button 
            htmlType="button" 
            type="primary" 
            size="medium"
            onClick={handleClickSave}
          >
            Сохранить
          </Button>
        </div>)}
      </div>
    </main>
  );
}

export default Profile;