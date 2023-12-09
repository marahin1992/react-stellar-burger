import styles from "./profile-navigation.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from "../../services/actions/user";
import { setUser } from "../../services/actions/user";

function ProfileNavigation({subtitle}) {

    const linkStyle = `${styles.link} text text_type_main-medium text_color_inactive`;

    const dispatch = useDispatch();


    function handleClick() {
      const body = {
        token: `${localStorage.getItem('refreshToken')}`
      }
      dispatch(logout(body));
    }

  return (
    <div className={`${styles.navigationContainer} pt-30`}>
        <nav className={`${styles.navigation}`}>
          <NavLink to='/profile' className={({ isActive }) =>
    [
      isActive ? `${linkStyle} ${styles.linkActive}` : linkStyle,
    ].join(" ")}>
            Профиль
          </NavLink>
          <NavLink to='/profile/orders' className={({ isActive }) =>
    [
      isActive ? `${linkStyle} ${styles.linkActive}` : linkStyle,
    ].join(" ")}>
            История заказов
          </NavLink>
          <button className={`${linkStyle} ${styles.button}`} onClick={handleClick} type='button'>
            Выход
          </button>
        </nav>
        <p className={`${styles.subtitle} text text_type_main-default text_color_inactive pt-20`}>
          {subtitle}
        </p>
    </div>
  );
}

export default ProfileNavigation;