import React from 'react';
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal.jsx";
import OrderDetails from "./order-details.jsx";
import { useModal } from "../../hooks/useModal";
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStuff, moveStuff, addBun, addStuff } from '../../services/actions';
import { getOrder } from '../../services/actions/index.js';
import { useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import StuffElement from './stuff-element.jsx';
import Loader from '../loader/loader.jsx';
import { useNavigate } from 'react-router-dom';



function BurgerConstructor() {

  const constructorData = useSelector(state => state.constructorData);

  const order = useSelector(state => state.order);

  const user = useSelector((store) => store.user.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleDrop = (item) => {
    if (item.type == "bun") {
      const prevBun = constructorData.bun;
      if (!(prevBun.name === item.name)) {
        dispatch(addBun(item, prevBun))
      }

    } else {
      dispatch(addStuff(item));
    };
  }

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      handleDrop(item);
    },
  });

  const totalPrice = useMemo(() => {
    return constructorData['bun']['price'] * 2 + constructorData['stuff'].reduce((acc, item) => acc + item.price, 0)
  }, [constructorData]);

  const { isModalOpen, openModal, closeModal } = useModal();

  const selectedIngredients = React.useMemo(() => {
    let arr = [];
    if (constructorData['bun']['_id'] && constructorData['stuff'].length) {
      arr = [constructorData['bun']['_id']];

      constructorData['stuff'].forEach(item => {
        arr = [...arr, item._id];
      });
      arr = [...arr, constructorData['bun']['_id']];
    }
    return arr;
  }, [
    constructorData
  ]);

  const handleClick = () => {
    if (!user) {
      navigate('/login');
    }

    if (selectedIngredients.length > 0) {
      const fetchBody = {
        ingredients: selectedIngredients,
      }
      dispatch(getOrder(fetchBody));
      openModal();

    }
  }

  const handleClose = (id, key) => {
    dispatch(deleteStuff(id, key))
  }

  const moveCard = (dragIndex, hoverIndex) => {
    dispatch(moveStuff(dragIndex, hoverIndex))
  };

  return (
    <section className={`${styles.burgerConstructor} pt-25 pl-4`}>
      <div className={styles.content} ref={dropTarget}>
        <div className={`${styles.ingredient} pr-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${constructorData.bun.name} (верх)`}
            price={constructorData.bun.price}
            thumbnail={constructorData.bun.image}
          />
        </div>
        <DndProvider backend={HTML5Backend}>
          <ul className={`${styles.list} custom-scroll pr-4`}>
            {
              constructorData.stuff.map((ingredient, index) =>
              (<StuffElement
                ingredient={ingredient}
                index={index}
                key={ingredient.key}
                handleClose={handleClose}
                moveCard={moveCard}
              />)
              )
            }

          </ul>
        </DndProvider>
        <div className={`${styles.ingredient} pr-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${constructorData.bun.name} (низ)`}
            price={constructorData.bun.price}
            thumbnail={constructorData.bun.image}
          />
        </div>
      </div>
      <div className={`${styles.totalPrice} pt-10 pr-4`}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={handleClick}>Оформить заказ</Button>
      </div>
      {
        isModalOpen &&
        <Modal onClose={closeModal}>
          {order.isLoading && (<Loader />)}
          {order.hasError && (<h3>Произошла ошибка</h3>)}
          {!order.isLoading &&
            !order.hasError &&
            order.order && (
              <OrderDetails order={constructorData.order} />
            )}


        </Modal>
      }
    </section>
  );
}

export default BurgerConstructor;