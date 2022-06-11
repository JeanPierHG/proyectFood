import React from 'react';
import styles from './RecipeItem.module.scss';

import { Diet } from '../index';

import { NavLink } from 'react-router-dom';

const RecipeItem = (props) => {
  /* eslint-disable react/prop-types */
  return (
    <article className={styles.recipeItemContainer}>
      <div className={styles.recipeItemContainerImg}>
        <img
          className={styles.recipeItemImg}
          src={props.image}
          alt='recipeimg'
          height={231}
        />
      </div>
      <div className={styles.recipeItemContainerDetails}>
        <div className={styles.recipeItemContainerTitle}>
          <NavLink
            className={styles.recipeItemDetailsTitle}
            to={`/home/${props.id}`}
          >
            <h3>{props.title}</h3>
          </NavLink>
        </div>
        <Diet diets={props.diets} />
      </div>
    </article>
  );
};

export default RecipeItem;
