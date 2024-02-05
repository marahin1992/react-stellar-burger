import React from 'react';
import styles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import OrderDetails from "./order-details";
import { useModal } from "../../hooks/useModal";
import { useDispatch, useSelector } from '../../services/store';
import { deleteStuff, moveStuff, addBun, addStuff } from '../../services/actions';
import { getOrder } from '../../services/actions/index';
import { useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import StuffElement from './stuff-element';
import { useNavigate } from 'react-router-dom';
import TotalPrice from '../total-price/total-price';
import LoaderWithCondition from '../loader-with-condition/loader-with-condition';
import { ConstructorElementData, IngredientWithCount } from '../../utils/types';



function BurgerConstructor() {

  const constructorData = useSelector(state => state.constructorData);

  const order = useSelector(state => state.order);

  const user = useSelector((store) => store.user.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleDrop = (item: IngredientWithCount) => {
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
    drop(item: IngredientWithCount) {
      handleDrop(item);
    },
  });

  const { isModalOpen, openModal, closeModal } = useModal();

  const selectedIngredients = React.useMemo(() => {
    let arr: string[] = [];
    if (constructorData['bun']['_id']) {
      arr = [constructorData['bun']['_id']];

      if (constructorData['stuff']) {constructorData['stuff'].forEach((item: ConstructorElementData) => {
        arr = [...arr, item._id];
      });}
      arr = [...arr, constructorData['bun']['_id']];
    }
    return arr;
  }, 
    [constructorData]
  );


  const handleClick = () => {
    if (!user) {
      navigate('/login');
      return
    }

    if (selectedIngredients.length > 2) {
      dispatch(getOrder(selectedIngredients));
      openModal();

    }
  }

  const handleClose = (id: string, key: string | undefined) => {
    dispatch(deleteStuff(id, key))
  }

  const moveCard = (dragIndex: number, hoverIndex: number) => {
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
              constructorData.stuff.map((ingredient: ConstructorElementData, index: number) =>
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
        <TotalPrice type='constructor' data={selectedIngredients} />
        <Button htmlType="button" type="primary" size="medium" onClick={handleClick}>Оформить заказ</Button>
      </div>
      {
        isModalOpen &&
        <Modal onClose={closeModal}>
          
          <LoaderWithCondition
            isLoading={order.isLoading}
            error={order.hasError}
            completed={(!order.isLoading &&
              !order.hasError &&
              ((order.order)as unknown as boolean))} >
            <OrderDetails/>
          </LoaderWithCondition>

        </Modal>
      }
    </section>
  );
}

export default BurgerConstructor;