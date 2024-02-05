import styles from "./status.module.css"
import PropTypes from "prop-types";



type StatusProps = {
  status: 'done' |  'pending' | 'created';
}

function Status({ status }: StatusProps) {

  const setSubtitle = () => {
    switch (status) {
      case 'done':
        return 'Выполнен'
      case 'pending':
        return 'Готовится'
      case 'created':
        return 'Создан'
    }
  }

  const subtitle = setSubtitle();

  const setClassName = () => {
    switch (status) {
      case 'done':
        return styles.done
      case 'pending':
        return styles.pending
      case 'created':
        return styles.created
    }
  }

  const statusStyle = setClassName();

  return (
    <p className={`${styles.status} ${statusStyle} text text_type_main-small`}>{subtitle}</p>
  )
}

Status.propTypes = {
  status: PropTypes.string , 
}

export default Status;