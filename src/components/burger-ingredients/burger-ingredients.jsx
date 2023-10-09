import styles from "./burger-ingredients.module.css";
import { data } from "../../utils/data";
import { 
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import TabLine from "../tab-line/tab-line.jsx";
import IngredientCard from "../ingredient-card/ingredient-card.jsx";


function BurgerIngredients() {

  const sauces = data.filter(item => item.type === "sauce");
  const buns = data.filter(item => item.type === "bun");
  const mains = data.filter(item => item.type === "main");



  return (
    <section className={`${styles.burgerIngredients}`}>
      <h2 className={`${styles.title} text text_type_main-large pb-5 pt-10`}>
        Соберите бургер
      </h2>
      <TabLine />
      <ul className={`${styles.list} custom-scroll`}>
        <li className={`${styles.category}`}>
          <h3 className={`${styles.title} text text_type_main-medium pb-6 pt-10`}>Булки</h3>
            <ul className={`${styles.ingredients} pr-4 pl-4`}>
            {
            buns.map((card) => <IngredientCard key={card._id} data={card}/>

            )
            } 
            </ul>
        </li>
        <li className={`${styles.category}`}>
          <h3 className={`${styles.title} text text_type_main-medium pb-6 pt-10`}>Соусы</h3>
            <ul className={`${styles.ingredients}  pr-4 pl-4`}>
            {
            sauces.map((card) => <IngredientCard key={card._id} data={card}/>

            )
            } 
            </ul>
        </li>
        <li className={`${styles.category}`}>
          <h3 className={`${styles.title} text text_type_main-medium pb-6 pt-10`}>Начинки</h3>
            <ul className={`${styles.ingredients}  pr-4 pl-4`}>
            {
            mains.map((card) => <IngredientCard key={card._id} data={card}/>

            )
            } 
            </ul>
        </li>
        
        
      </ul>

    </section>
  );
}

export default BurgerIngredients;