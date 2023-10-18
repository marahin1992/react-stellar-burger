import React, {useContext} from 'react';
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import { 
  DragIcon,
  CurrencyIcon,
  Button,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal.jsx";
import OrderDetails from "../order-details/order-details.jsx";
import {useModal} from "../../hooks/useModal";
import { DataContext, TotalContext } from "../../services/appContext.js";



function BurgerConstructor() {

  const { constructorData, setConstructorData } = useContext(DataContext);

  const { total } = useContext(TotalContext);

  const { isModalOpen, openModal, closeModal } = useModal();

  const selectedIngredients = React.useMemo(() => {
    let arr = [];
    if (constructorData['bun']['_id'] && constructorData['stuff'].length) {
      arr = [constructorData['bun']['_id']];
      
      constructorData['stuff'].forEach( item => {
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
      fetch(`https://norma.nomoreparties.space/api/orders`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'charset' : 'utf-8'
        },
        body: JSON.stringify(fetchBody)
      })
        .then(res => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
      })

      .then(data => {
        const order = data.order;
        setConstructorData(
          prevState => {
            return {...prevState, order: order.number}
          }
        )
        openModal();
        
      })
      .catch(e => {
        console.log(e);
      });
    }
  }

  return (
    <section className={`${styles.burgerConstructor} pt-25 pl-4`}>
      <div className={styles.content}>
        <div className={`${styles.ingredient} pr-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={constructorData.bun.name}
            price={constructorData.bun.price}
            thumbnail={constructorData.bun.image}
          />
        </div>
        <ul className={`${styles.list} custom-scroll pr-4`}>
          {
            constructorData.stuff.map((ingredient, id) =>
            (<li className={styles.element} key={id}>
              <DragIcon type="primary" />
              <ConstructorElement
                className="ingredient"
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </li>)
            )
          }
          
        </ul>
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
          <p className="text text_type_digits-medium">{total}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={handleClick}>Оформить заказ</Button>
      </div>
      {
      isModalOpen && 
      <Modal onClose={closeModal}>
        <OrderDetails order={constructorData.order}/>
      </Modal> 
      }
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.array,
}

export default BurgerConstructor;