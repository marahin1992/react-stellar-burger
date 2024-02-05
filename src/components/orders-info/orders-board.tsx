import { Order } from "../../utils/types";
import styles from "./orders-board.module.css";


type OrdersBoardProps = {
  data: Order[];
  type: string;
}

function OrdersBoard({ data, type }: OrdersBoardProps) {

  const digitsStyle = type === 'completed' ? styles.digitsCompleted : '';

  let formattedData = data;

  formattedData = formattedData.length <= 20 ? formattedData : formattedData.slice(0, 20)

  return (
    <div className={`${styles.container}`}>
      <h2 className={`${styles.boards} text text_type_main-medium pb-6`}>
        {type === 'completed' ? 'Готовы:' : 'В работе:'}
      </h2>
      <ul className={`${styles.list}`}>
        {
          formattedData.map((order) => <li key={order._id} className={`text text_type_digits-default ${styles.number} ${digitsStyle}`}>{order.number}</li>)
        }
      </ul>


    </div>
  );
}


export default OrdersBoard;