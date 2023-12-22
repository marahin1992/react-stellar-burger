import styles from "./completed.module.css";

import PropTypes from "prop-types";



function Completed({ quantity, type }) {

  return (
    <div className={`${styles.container}`}>
      <h2 className={`${styles.title} text text_type_main-medium`}>
        {type === 'today' ? 'Выполнено за сегодня:' : 'Выполнено за все время:'}
      </h2>
      <p className={`${styles.quantity} text text_type_digits-large`}>{quantity}</p>


    </div>
  );
}

Completed.propTypes = {
  quantity: PropTypes.number , 
  type: PropTypes.string , 
}

export default Completed;