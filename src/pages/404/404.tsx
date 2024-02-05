import styles from "./404.module.css";
import { Link } from 'react-router-dom';

function Page404() {

  return (
    <div className={`${styles.container}`}>
      <h1  className={`${styles.title} text text_type_digits-large pt-30 pb-15`}>404</h1>
      <p  className={`${styles.subtitle} text text_type_main-medium pb-5`}>Ой! Страница не найдена</p>
      <Link className={`${styles.link} text text_type_main-medium`} to='/'>На главную</Link>
    </div>
  );
}

export default Page404;