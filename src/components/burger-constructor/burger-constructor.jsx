import React from 'react';
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

function BurgerConstructor({data}) {

  const { isModalOpen, openModal, closeModal } = useModal();
  const stuffing = data.filter(item => !(item.type === "bun"));

  return (
    <section className={`${styles.burgerConstructor} pt-25 pl-4`}>
      <div className={styles.content}>
        <div className="pr-4">
          <ConstructorElement 
            className="pr-4"
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={20}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>
        <ul className={`${styles.list} custom-scroll pr-4`}>
          {
            stuffing.map((ingredient) =>
            (<li className={styles.element} key={ingredient._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </li>)
            )
          }
          
        </ul>
        <div className="pr-4">
          <ConstructorElement
            className="pr-4"
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={20}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>
      </div>
      <div className={`${styles.totalPrice} pt-10 pr-4`}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">{200}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={openModal}>Оформить заказ</Button>
      </div>
      {
      isModalOpen && 
      <Modal onClose={closeModal}>
        <OrderDetails/>
      </Modal> 
      }
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.array,
}

export default BurgerConstructor;