import styles from "./order-details.module.css";
import image from "../../images/done.jpg";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function OrderDetails() {
  const order = useSelector(state => state.order);

  return (
    <div className={`${styles.container} pt-30 pb-30 pr-10 pl-10`}>
      <p className={`${styles.id} text text_type_digits-large`}>{order.order}</p>
      <p className={`${styles.subtitle} text text_type_main-medium pt-8 pb-15`}>идентификатор заказа</p>
      <img className={styles.image} src={image} alt="done"/>
      <p className={`${styles.calorieName} text text_type_main-default pt-15 pb-2`}>Ваш заказ начали готовить</p>      
      <p className={`${styles.calorieName} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

OrderDetails.propTypes = {
  order: PropTypes.number,
}

export default OrderDetails;