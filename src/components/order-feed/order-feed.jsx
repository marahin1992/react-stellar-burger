import styles from "./order-feed.module.css";

import PropTypes from "prop-types";
import OrderCard from "./order";



function OrderFeed({ type, orders }) {

  const sectionStyle = type === 'profile' ? `${styles.profileOrders} pt-10` : styles.allOrders;

  return (
    <section className={`${styles.orders} ${sectionStyle}`}>
      {!(type === 'profile') && (<h2 className={`${styles.title} text text_type_main-large pb-5 pt-10`}>
        Лента заказов
      </h2>)}
      <ul className={`${styles.list} custom-scroll pl-2`}>
        {orders && orders.map((order) =>
          <OrderCard
            key={order.number}
            data={order}
            type={type === 'profile' ? 'profile' : 'all'}
          />)}
      </ul>

    </section>
  );
}

OrderFeed.propTypes = {
  type: PropTypes.string , 
  orders: PropTypes.arrayOf(PropTypes.object) , 
}

export default OrderFeed;