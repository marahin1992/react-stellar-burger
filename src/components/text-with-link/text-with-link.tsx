import React from 'react';
import styles from "./text-with-link.module.css";
import { Link } from 'react-router-dom';

type TextWithLinkProps = {
  text: string;
  link: string;
  linkText: string;
}

function TextWithLink({text, link, linkText}: TextWithLinkProps) {

  return (    
      <div className={`${styles.textAndLink}`}>
        <p className='text text_type_main-default text_color_inactive'>
          {text}
        </p>
        <Link to={link} className={`${styles.link} text text_type_main-default`}>{linkText}</Link>
      </div>
  );
}



export default TextWithLink;

