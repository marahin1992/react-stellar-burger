import React from "react";
import styles from "./tab-line.module.css";

import {
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from "react-redux";
import { SET_TAB } from "../../services/actions";


function TabLine({ scrollTo }) {

  const current = useSelector(state => state.tab);

  const dispatch = useDispatch();

  const setCurrent = (e) => {
    scrollTo(e);
    dispatch({
      type: SET_TAB,
      tab: e
    });
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

export default TabLine;