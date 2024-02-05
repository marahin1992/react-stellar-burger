import React, { useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { WebsocketStatus } from "../../utils/orders-feed";
import OrderFeed from '../../components/order-feed/order-feed';
import OrdersInfo from '../../components/orders-info/orders-info';
import { connect as connectOrderFeed, disconnect as disconnectOrderFeed } from "../../services/actions/orders-feed";
import { CheckingOrder } from '../../utils/checkingOrders';
import { ORDERS_FEED_SERVER_URL } from '../../utils/orders-feed';
import LoaderWithCondition from '../../components/loader-with-condition/loader-with-condition';
import { Order } from '../../utils/types';


function Feed() {


  const dispatch = useDispatch();

  const ingredients = useSelector(state => state.ingredients.data);


  const { data, status, connectingError } = useSelector(state => state.orderFeed);

  React.useEffect(() => {
    dispatch(connectOrderFeed(ORDERS_FEED_SERVER_URL));
    return () => { dispatch(disconnectOrderFeed()); }
  }, []);

  const checkedOrders: Order[] = useMemo(() => data.orders.filter((order: Order) => CheckingOrder(order, ingredients)), [data, ingredients]);

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