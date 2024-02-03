import ReactDOM from 'react-dom';
import styles from "./modal-overlay.module.css";


type ModalOverlayProps = {
  onClose: () => void;
}


function ModalOverlay({ onClose }: ModalOverlayProps) {

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
    </div>
  )
}


export default ModalOverlay;