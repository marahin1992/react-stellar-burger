import styles from "./ingredient-image.module.css";
import PropTypes from "prop-types";

function IngredientImage({ image, index, more }) {

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
        <img src={image} className={`${styles.image}`} />
        {more && (<div className={`${styles.moreBackground}`}>
          <p className={`${styles.more} text text_type_main-default`}>{`+${more}`}</p>
        </div>)}
      </div>
    </div>

  );
}

IngredientImage.propTypes = { 
  image: PropTypes.string , 
  index: PropTypes.number , 
  more: PropTypes.number  
}

export default IngredientImage;