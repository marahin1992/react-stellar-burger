import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WebsocketStatus } from "../../utils/orders-feed.js";
import Loader from '../../components/loader/loader.jsx';
import OrderFeed from '../../components/order-feed/order-feed';
import OrdersInfo from '../../components/orders-info/orders-info.jsx';
import { connect as connectOrderFeed, disconnect as disconnectOrderFeed } from "../../services/actions/orders-feed.js";
import { CheckingOrder } from '../../utils/checkingOrders.js';
import { ORDERS_FEED_SERVER_URL } from '../../utils/orders-feed.js';
import LoaderWithCondition from '../../components/loader-with-condition/loader-with-condition.jsx';


function Feed() {



  const dispatch = useDispatch();

  const ingredients = useSelector(state => state.ingredients.data);

  const { data, status, connectingError } = useSelector(state => state.orderFeed);

  React.useEffect(() => {
    dispatch(connectOrderFeed(ORDERS_FEED_SERVER_URL));
    return () => { dispatch(disconnectOrderFeed()); }
  }, []);

  const checkedOrders = useMemo(() => data.orders.filter((order) => CheckingOrder(order, ingredients)), [data, ingredients]);

  return (
    <LoaderWithCondition
      isLoading={status === WebsocketStatus.CONNECTING}
      error={connectingError}
      completed={status === WebsocketStatus.ONLINE}>
      <OrderFeed orders={checkedOrders} type='all' />
      <OrdersInfo data={data} orders={checkedOrders} />
    </LoaderWithCondition>
  );
}

export default Feed;