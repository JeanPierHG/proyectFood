import React from 'react';
import styles from './Landing.module.scss';
import { NavLink } from 'react-router-dom';
const Landing = () => {
  return (
    <div className={styles.landing}>
      <div className={styles.landingDetails}>
        <h1 className={styles.landingTitle}>Henry Food</h1>
        <p className={styles.landingDescription}>
          Henry food is an app that provides information about recipes, diets
          and accompanies you through each meal guiding you step by step with
          intuitive images.
        </p>
        <NavLink to={'/home'}>
          <button className={styles.landingButton}>Let&apos;s cook!</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Landing;
