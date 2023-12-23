import styles from "./order.module.css";
import {
  FormattedDate
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from "react-router-dom";
import ImageList from "./image-list";
import TotalPrice from "../total-price/total-price";
import Status from "./status";
import PropTypes from "prop-types";

function OrderCard({ data, type }) {

  const location = useLocation();

  let ingredients = [...data.ingredients];
  ingredients.pop();

  return (
    <li className={styles.listElem}>
      <Link to={type === 'profile' ? `/profile/${data.number}` : `/feed/${data.number}`} className={styles.link} state={{ background: location }}>
      <article className={`${styles.orderCard} p-6`}>
        <div className={`${styles.header}`}>
          <p className={`${styles.number} text text_type_digits-default`}>{`#${data.number}`}</p>
          <FormattedDate date={new Date(data.createdAt)} className={`${styles.date} text text_type_main-default text_color_inactive`} />
        </div>
        <h3 className={`${styles.title} text text_type_main-medium`}>{data.name}</h3>
        {type === 'profile' && (<Status status={data.status} />)}
        <div className={`${styles.header}`}>
          <ImageList data={ingredients} />
          <TotalPrice data={data.ingredients} type='order' />
        </div>
      </article>
    </Link>
    </li>
    

  );
}

OrderCard.propTypes = {
  data: PropTypes.object ,
}

export default OrderCard;