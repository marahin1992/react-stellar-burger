import styles from "./profile.module.css";
import ProfileNavigation from '../../components/profile-navigation/profile-navigation';
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