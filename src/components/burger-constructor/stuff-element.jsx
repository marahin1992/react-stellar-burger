import styles from "./stuff-element.module.css";
import { useDrop, useDrag } from "react-dnd";
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from "react";
import PropTypes from "prop-types";

export default function StuffElement({ ingredient, index, handleClose, moveCard }) {

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "stuff",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: "stuff",
    item: () => {
      return { key: ingredient.key, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));

  return (
    <li className={`${styles.element} ${isDragging ? styles.elementDragging : ''}`} key={ingredient.key} ref={ref}>
      <DragIcon type="primary" />
      <ConstructorElement
        className="ingredient"
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => handleClose(ingredient._id, ingredient.key)}
      />
    </li>
  )
}

StuffElement.propTypes = {
  ingredient: PropTypes.object , 
  index: PropTypes.number , 
  handleClose: PropTypes.func , 
  moveCard: PropTypes.func 
}