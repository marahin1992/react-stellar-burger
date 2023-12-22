import styles from "./ingredient-card.module.css";
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/prop-types.js';
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

function IngredientCard({ data }) {

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: data,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });


  const location = useLocation();




  return (
    <Link to={`/ingredients/${data._id}`} className={styles.link} state={{ background: location }}>
      <article className={`${styles.ingredientCard}`} ref={dragRef}>
        {data.count !== 0
          ? (<Counter count={data.count} size="default" extraClass="m-1" className={styles.counter} />)
          : ""}
        <img className={`${styles.image}`} src={data.image} alt={data.name} />
        <div className={styles.price}>
          <p className="text text_type_digits-default">{data.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.name} text text_type_main-default`}>
          {data.name}
        </p>

      </article>
    </Link>

  );
}

IngredientCard.propTypes = {
  data: ingredientPropType,
}

export default IngredientCard;