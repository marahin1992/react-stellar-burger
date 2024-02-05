import styles from "./ingredient-image.module.css";

type IngredientImageProps = {
  image: string;
  index: number;
  more?: number | null;
}

function IngredientImage({ image, index, more }: IngredientImageProps) {

  const letIndexStyle = () => {
    switch (index) {
      case 0: {
        return '';
      }
      case 1: {
        return styles.circle2nd;
      }
      case 2: {
        return styles.circle3nd;
      }
      case 3: {
        return styles.circle4nd;
      }
      case 4: {
        return styles.circle5nd;
      }
    }
  }


  const indexStyle = letIndexStyle();

  return (
    <div className={`${styles.circle} ${indexStyle}`}>
      <div className={`${styles.circleBackground}`}>
        <img src={image} className={`${styles.image}`} alt={''}/>
        {more && (<div className={`${styles.moreBackground}`}>
          <p className={`${styles.more} text text_type_main-default`}>{`+${more}`}</p>
        </div>)}
      </div>
    </div>

  );
}

export default IngredientImage;