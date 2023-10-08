import styles from "./burger-constructor.module.css";
import { data } from "../../utils/data";
import { 
  DragIcon,
  CurrencyIcon,
  Button,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';


function BurgerConstructor() {

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
          <li className={styles.element}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Соус традиционный галактический"
              price={15}
              thumbnail="https://code.s3.yandex.net/react/code/sauce-03.png"
            />
          </li>
          <li className={styles.element}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Сыр с астероидной плесенью"
              price={4142}
              thumbnail="https://code.s3.yandex.net/react/code/cheese.png"
            />
          </li>
          <li className={styles.element}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Соус традиционный галактический"
              price={15}
              thumbnail="https://code.s3.yandex.net/react/code/sauce-03.png"
            />
          </li>
          <li className={styles.element}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Сыр с астероидной плесенью"
              price={4142}
              thumbnail="https://code.s3.yandex.net/react/code/cheese.png"
            />
          </li>
          <li className={styles.element}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Соус традиционный галактический"
              price={15}
              thumbnail="https://code.s3.yandex.net/react/code/sauce-03.png"
            />
          </li>
          <li className={styles.element}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Сыр с астероидной плесенью"
              price={4142}
              thumbnail="https://code.s3.yandex.net/react/code/cheese.png"
            />
          </li>
          <li className={styles.element}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Сыр с астероидной плесенью"
              price={4142}
              thumbnail="https://code.s3.yandex.net/react/code/cheese.png"
            />
          </li>
          <li className={styles.element}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Соус традиционный галактический"
              price={15}
              thumbnail="https://code.s3.yandex.net/react/code/sauce-03.png"
            />
          </li>
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
        <Button htmlType="button" type="primary" size="medium">Оформить заказ</Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;