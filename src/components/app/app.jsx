import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route.jsx";
import { checkUserAuth } from '../../services/actions/user';
import Loader from '../loader/loader.jsx';
import Home from '../../pages/home/home.jsx';
import Login from '../../pages/login/login.jsx';
import Register from '../../pages/register/register.jsx';
import ForgotPassword from '../../pages/forgot-password/forgot-password.jsx';
import ResetPassword from '../../pages/reset-password/reset-password.jsx';
import Profile from '../../pages/profile/profile.jsx';
import Page404 from '../../pages/404/404.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../modal/modal';
import IngredientDetails from '../burger-ingredients/ingredient-details';
import { getIngredients, getOrderByNumber } from '../../services/actions/index.js';
import Feed from '../../pages/feed/feed';
import ProfileInfo from '../profile-info/profile-info';
import OrderFeedDetails from '../order-feed/order-feed-details';
import ProfileFeed from '../profile-feed/profile-feed';


function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  React.useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5`}>
        <Routes location={background || location}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
          <Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
          <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
          <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
          <Route path="/profile" element={<OnlyAuth component={<Profile />} />} >
            <Route path="" element={<ProfileInfo />} />
            <Route path="orders" element={<ProfileFeed />} />
          </Route>
          <Route path='/ingredients/:ingredientId' element={<IngredientDetails type="page" />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/feed/:number' element={<OrderFeedDetails />} />
          <Route path='/profile/:number' element={<OnlyAuth component={<OrderFeedDetails />} />} />
          <Route path="*" element={<Page404 />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path='/ingredients/:ingredientId'
              element={
                <Modal onClose={handleModalClose}>
                  <IngredientDetails type="modal" />
                </Modal>
              }
            />
            <Route
              path='/feed/:number'
              element={
                <Modal onClose={handleModalClose}>
                  <OrderFeedDetails />
                </Modal>
              }
            />
            <Route
              path='/profile/:number'
              element={
                <OnlyAuth
                  component={<Modal onClose={handleModalClose}>
                    <OrderFeedDetails />
                  </Modal>}
                />
              }
            />
          </Routes>

        )}
      </main>
    </div>
  );
}

export default App;
