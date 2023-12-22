import styles from "./tab-line.module.css";

import {
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from "react-redux";
import { setTab } from "../../services/actions";
import PropTypes from "prop-types";


function TabLine({ scrollTo }) {

  const current = useSelector(state => state.tab);

  const dispatch = useDispatch();

  const setCurrent = (e) => {
    scrollTo(e);
    dispatch(setTab(e));
  }

  return (
    <div className={styles.tabLine}>
      <Tab value="one" active={current.current === 'one'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current.current === 'two'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current.current === 'three'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}

TabLine.propTypes = {
  scrollTo: PropTypes.func ,  
}

export default TabLine;