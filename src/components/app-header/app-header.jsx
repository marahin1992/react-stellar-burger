import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';



function AppHeader() {


  const linkStyles = `${styles.link} text text_type_main-default pl-5 pr-5 pb-4 pt-4`;
  return (
    <header className={`${styles.appHeader}`}>
      <div className={`${styles.content}  p-4`}>
        <nav className={styles.navigation}>
          <NavLink className={linkStyles} to="/">
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? "primary" : "secondary"} />
                <p className={isActive ? "text text_type_main-default" : "text text_type_main-default text_color_inactive"}>Конструктор</p>
              </>

            )}
          </NavLink>
          <NavLink className={linkStyles} to="/feed">
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? "primary" : "secondary"} />
                <p className={isActive ? "text text_type_main-default" : "text text_type_main-default text_color_inactive"}>Лента заказов</p>
              </>)}
          </NavLink>
        </nav>
        <Logo />
        <NavLink className={linkStyles} to="/profile">
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? "primary" : "secondary"} />
              <p className={isActive ? "text text_type_main-default" : "text text_type_main-default text_color_inactive"}>Личный кабинет</p>
            </>)}
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;