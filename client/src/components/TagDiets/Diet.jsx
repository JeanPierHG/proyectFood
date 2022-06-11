import React from 'react';
import styles from './Diet.module.scss';
import { imgs } from '../../assets';
/* eslint-disable react/prop-types */
const Diet = (props) => {
  const imgDiet = {
    'gluten free': imgs.glutenFreeIcon,
    'dairy free': imgs.dairyFreeIcon,
    paleolithic: imgs.paleolithicIcon,
    'lacto ovo vegetarian': imgs.lactoOvoIcon,
    primal: imgs.primalIcon,
    'whole 30': imgs.whole30Icon,
    vegan: imgs.veganIcon,
    'fodmap friendly': imgs.foadmapFriendlyIcon,
    pescatarian: imgs.pescatarianIcon,
    ketogenic: imgs.ketogenicIcon,
  };

  return (
    <div className={`${styles.tagsContainer}`}>
      {props.diets?.map((d, index) => (
        <div key={index} className={styles.tagsDetailsContainer}>
          <img src={imgDiet[d]} alt='tags-icon' />
          <p>{d[0].toUpperCase() + d.slice(1)}</p>
        </div>
      ))}
    </div>
  );
};

export default Diet;
