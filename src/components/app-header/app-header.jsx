import styles from "./app-header.module.css";
import { data } from "../../utils/data";
import { 
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';


function AppHeader() {

  const linkStyles = 'text text_type_main-default pl-5 pr-5 pb-4 pt-4';
  return (
    <header className={`${styles.appHeader} p-4`}>
      <div className={styles.content}>
        <nav className={styles.navigation}>
          <a className={`${styles.link} ${linkStyles}`} href="#">
            <BurgerIcon type="primary"/>
            Конструктор
          </a>
          <a className={`${styles.link} ${linkStyles} text_color_inactive`} href="#">
            <ListIcon type="secondary"/>
            Лента заказов       
          </a>
        </nav>
        <Logo />
        <a className={` ${styles.link} ${linkStyles} text_color_inactive`} href="#">
          <ProfileIcon type="secondary"/>
          Личный кабинет
        </a>
      </div>
    </header>
  );
}

export default AppHeader;