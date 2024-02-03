import styles from "./completed.module.css";


type CompletedProps = {
  quantity: number;
  type: string;
}

function Completed({ quantity, type }: CompletedProps) {

  return (
    <div className={`${styles.container}`}>
      <h2 className={`${styles.title} text text_type_main-medium`}>
        {type === 'today' ? 'Выполнено за сегодня:' : 'Выполнено за все время:'}
      </h2>
      <p className={`${styles.quantity} text text_type_digits-large`}>{quantity}</p>


    </div>
  );
}



export default Completed;