import { useParams } from "react-router-dom";
import styles from "./order-feed-details.module.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../loader/loader.jsx';
import TotalPrice from "../total-price/total-price";
import {
  FormattedDate
} from '@ya.praktikum/react-developer-burger-ui-components';
import Status from "./status";
import IngredientList from "./ingredient-list";
import { useEffect } from "react";
import { getOrderByNumber } from "../../services/actions";

function OrderFeedDetails() {

  const dispatch = useDispatch();

  const { number } = useParams();

  const order = useSelector((state) => {
    let order = state.orderFeed.data.orders.find(order => order.number === +number);
    if (order) {
      return order;
    }
    order = state.profileFeed.data.orders.find(order => order.number === +number);
    if (order) {
      return order;
    }

    return state.selectedOrder.order;
  })


  useEffect(() => {
    if (!order) {
      dispatch(getOrderByNumber(number));
    }

  }, [order])

  return (!order) ? <Loader /> : (
    <div className={`${styles.order}`}>
      <div className={`${styles.container} pt-15 pb-15 pr-10 pl-10`}>
        <p className={`${styles.number} text text_type_digits-default`}>{`#${order.number}`}</p>
        <h2 className={`${styles.title} text text_type_main-medium pt-10 pb-3`}>{order.name}</h2>
        <Status status={order.status} />
        <h3 className={`${styles.title} text text_type_main-medium pt-15 pb-6`}>Состав:</h3>
        <IngredientList data={order.ingredients} />
        <div className={`${styles.footer} pt-10`}>
          <FormattedDate date={new Date(order.createdAt)} className={`${styles.date} text text_type_main-default text_color_inactive`} />
          <TotalPrice data={order.ingredients} type='order' />

        </div>
      </div>
    </div>

  )
}

export default OrderFeedDetails;