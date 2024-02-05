import styles from "./stuff-element.module.css";
import { useDrop, useDrag } from "react-dnd";
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from "react";
import { ConstructorElementData } from "../../utils/types";

type StuffElementProps = {
  ingredient: ConstructorElementData;
  index: number;
  handleClose: (id: string, key: string | undefined) => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

export default function StuffElement({ ingredient, index, handleClose, moveCard }: StuffElementProps) {

  const ref = useRef<HTMLLIElement>(null);

  const [, drop] = useDrop({
    accept: "stuff",
    hover: (item: {index: number, key: number}, monitor) => {
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
      if (clientOffset !== null){const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;}
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
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => handleClose(ingredient._id, ingredient.key)}
      />
    </li>
  )
}

