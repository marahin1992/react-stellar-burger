import React, { useContext } from 'react';
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
import { DECR_COUNTER, DEL_STUFF, SET_ORDER, MOVE_STUFF } from '../../services/actions';
import { getOrder } from '../../services/actions/index.js';
import { useDrop, useDrag } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import StuffElement from './stuff-element.jsx';



function BurgerConstructor({ onDropHandler }) {

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      onDropHandler(item);
    },
  });

  const constructorData = useSelector(state => state.constructorData);


  const dispatch = useDispatch();

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
    if (selectedIngredients.length > 0) {
      const fetchBody = {
        ingredients: selectedIngredients,
      }
      dispatch(getOrder(fetchBody));
      openModal();
    }
  }

  const handleClose = (id, key) => {
    console.log(key)
    dispatch({
      type: DECR_COUNTER,
      _id: id
    });
    dispatch({
      type: DEL_STUFF,
      key: key
    });
  }

  const moveCard = (dragIndex, hoverIndex) => {
    dispatch({
      type: MOVE_STUFF,
      dragIndex: dragIndex,
      hoverIndex
    })
  };

  return (
    <section className={`${styles.burgerConstructor} pt-25 pl-4`}>
      <div className={styles.content} ref={dropTarget}>
        <div className={`${styles.ingredient} pr-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={constructorData.bun.name}
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
            text={constructorData.bun.name}
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
          <OrderDetails order={constructorData.order} />
        </Modal>
      }
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.array,
}

export default BurgerConstructor;