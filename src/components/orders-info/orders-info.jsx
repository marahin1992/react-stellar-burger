import React, { useRef } from "react";
import styles from "./orders-info.module.css";

import PropTypes from "prop-types";
import OrdersBoard from "./orders-board";
import Completed from "./completed";



function OrdersInfo({ data, orders }) {

  const completedOrders = React.useMemo(() => {
    return orders.filter(item => item.status === "done");
  }, [orders]);

  const noCompletedOrders = React.useMemo(() => {
    return orders.filter(item => item.status === "pending");
  }, [orders]);


  return (
    <section className={`${styles.info} pt-25 pl-15`}>
      <div className={`${styles.boards}`}>
        <OrdersBoard data={completedOrders} type='completed' />
        <OrdersBoard data={noCompletedOrders} type='inWork' />
      </div>
      <Completed quantity={data.total} type='allTime' />
      <Completed quantity={data.totalToday} type='today' />

    </section>
  );
}

OrdersInfo.propTypes = {
  data: PropTypes.object , 
  orders: PropTypes.array , 
}

export default OrdersInfo;