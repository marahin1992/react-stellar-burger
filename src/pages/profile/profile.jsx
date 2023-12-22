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
import ProfileInfo from '../../components/profile-info/profile-info';
import { Outlet } from 'react-router-dom';


function Profile() {


  return (
    <main className={`${styles.main} `}>
      <ProfileNavigation subtitle={'В этом разделе вы можете изменить свои персональные данные'} />
      <Outlet/>
    </main>
  );
}

export default Profile;