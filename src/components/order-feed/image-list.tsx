import styles from "./image-list.module.css";
import IngredientImage from "./ingredient-image";
import { useSelector } from "../../services/store";

type ImageListProps = {
  data: string[];
}

function ImageList({ data }: ImageListProps) {

  let formattedData = [...data];

  const ingredients = useSelector(state => state.ingredients.data);

  formattedData = formattedData.length <= 5 ? formattedData : formattedData.slice(0, 5)

  return (
    <ul className={`${styles.imageList}`}>
      {formattedData.map((id, index) => {
        const ingredient = ingredients.find((item) => item._id == id)!;
        return (index === 4 && data.length > 5)
          ? (<li key={index}>
            <IngredientImage image={ingredient.image_mobile} index={index} more={data.length - formattedData.length} />
          </li>)
          : (<li key={index}>
            <IngredientImage image={ingredient.image_mobile} index={index} more={null} />
          </li>)
      })}
    </ul>

  );
}


export default ImageList;
