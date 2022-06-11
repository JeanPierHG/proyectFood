import React, { useState } from 'react';
import styles from './Recipes.module.scss';
import { RecipeItem, Pagination } from '../index';

/* eslint-disable react/prop-types */
const Recipes = (props) => {
  const [page, setPage] = useState(1);
  const [forPage] = useState(8);

  const max = Math.ceil(props.recipes.length / forPage);
  return (
    <div>
      <div>
        <Pagination page={page} setPage={setPage} max={max} />
      </div>
      <div className={styles.recipesContainer}>
        {props.recipes
          .slice((page - 1) * forPage, (page - 1) * forPage + forPage)
          ?.map((recipe) => (
            <RecipeItem
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              diets={recipe.diets}
              image={recipe.image}
            />
          ))}
      </div>
    </div>
  );
};

export default Recipes;
