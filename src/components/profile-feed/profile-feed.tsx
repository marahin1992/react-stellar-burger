import styles from "./profile-feed.module.css";
import OrderFeed from "../order-feed/order-feed";
import { connect as connectProfileFeed, disconnect as disconnectProfileFeed } from "../../services/actions/profile-feed";
import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "../../services/store";
import { WebsocketStatus } from "../../utils/orders-feed";
import Loader from '../loader/loader';
import { Order } from "../../utils/types";


function ProfileFeed() {

  let token = localStorage.getItem('accessToken');
  token = (token !== null) ? token.replace('Bearer ', '') : token;


  const PROFILE_FEED_SERVER_URL = `wss://norma.nomoreparties.space/orders?token=${token}`;

  const dispatch = useDispatch();

  const { data, status, connectingError } = useSelector(state => state.profileFeed);

  React.useEffect(() => {
    dispatch(connectProfileFeed(PROFILE_FEED_SERVER_URL));
    return () => { dispatch(disconnectProfileFeed()); }
  }, []);

  const orders: Order[] = useMemo(() => {
    let arr = [...data.orders];
    arr.reverse();
    return arr
  },[data])


  return (<>
    {status === WebsocketStatus.CONNECTING && (<Loader />)}
    {connectingError && (<h3>Произошла ошибка</h3>)}
    {status === WebsocketStatus.ONLINE && (
      <OrderFeed type='profile' orders={orders} />
    )}

  </>);
}

ProfileFeed.propTypes = {
}

export default ProfileFeed;