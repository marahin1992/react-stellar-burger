import React from 'react';
import styles from "./text-with-link.module.css";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

function TextWithLink({text, link, linkText}) {

  return (    
      <div className={`${styles.textAndLink}`}>
        <p className='text text_type_main-default text_color_inactive'>
          {text}
        </p>
        <Link to={link} className={`${styles.link} text text_type_main-default`}>{linkText}</Link>
      </div>
  );
}

TextWithLink.propTypes = {
  text: PropTypes.string , 
  link: PropTypes.string , 
  linkText: PropTypes.string 
}

export default TextWithLink;

