import styles from "./tab-line.module.css";

import {
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from "../../services/store";
import { setTab } from "../../services/actions";
import PropTypes from "prop-types";

type TabLineProps = {
  scrollTo: (tab: string) => void;
}

function TabLine({ scrollTo }: TabLineProps) {

  const current = useSelector(state => state.tab);

  const dispatch = useDispatch();

  const setCurrent = (e: string) => {
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