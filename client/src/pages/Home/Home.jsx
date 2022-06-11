import React, { useEffect } from 'react';
import styles from './Home.module.scss';
import { Nav, Recipes } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { apiGetRecipes } from '../../Redux/spoonacular/apiCalls';
import { imgs } from '../../assets';
const Home = () => {
  const dispatch = useDispatch();
  const allrecipes = useSelector((state) => state.spoon.data.totalRecipes);
  const { error, pending } = useSelector((state) => state.spoon);
  useEffect(() => {
    if (allrecipes.length === 0) {
      apiGetRecipes(dispatch);
    }
  }, []);

  return (
    <div className={`${styles.homeContainer} appcontainer`}>
      <Nav />
      {pending ? (
        <div className='pendingContainer'>
          <img className='pendingHome' src={imgs.loader} alt='icon-loader' />
        </div>
      ) : (
        <Recipes recipes={allrecipes} />
      )}
      {error && <p>Fuiste p</p>}
    </div>
  );
};

export default Home;
