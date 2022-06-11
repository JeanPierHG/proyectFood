import React, { useEffect, useState } from 'react';
import styles from './RecipeDetails.module.scss';
import { Diet } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { apiRecipeById } from '../../Redux/spoonacular/apiCalls';
import { imgs } from '../../assets';
const RecipeDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const recipeDetails = useSelector(
    (state) => state.spoon.data.recipeDetails[0]
  );

  const { pending } = useSelector((state) => state.spoon);

  useEffect(() => {
    apiRecipeById(dispatch, id);
  }, []);

  const [isOpenInstruction, setIsOpenInstruction] = useState(false);

  return (
    <div className={styles.recipeContainer}>
      {pending ? (
        <img className='pending' src={imgs.loader} alt='loader' />
      ) : (
        <div className={styles.recipeDetail}>
          <div className={styles.recipeTitleContainer}>
            <h1 className={styles.recipeTitle}>{recipeDetails?.title}</h1>
          </div>
          <div className={styles.recipeGrid}>
            <div className={styles.recipeDietsContainer}>
              <Diet
                className={styles.recipeDiets}
                diets={recipeDetails?.diets}
              />
            </div>
            <div className={styles.recipeImgContainer}>
              <img
                src={recipeDetails?.image}
                alt='recipe-image'
                className={styles.recipeImg}
              />
            </div>
            <div className={styles.recipeHealthScoreContainer}>
              <img
                src={imgs.healthLogo}
                alt='health-logo'
                className={styles.recipeHealthLogo}
              />
              <span className={styles.recipeHealthScore}>
                HealthScore: {recipeDetails?.healthScore}
              </span>
            </div>
          </div>
          <div className={styles.recipeSummaryContainer}>
            <div
              className={styles.recipeSummary}
              dangerouslySetInnerHTML={{ __html: recipeDetails?.summary }}
            />
          </div>
          <div className={styles.recipeButtonContainer}>
            <button
              className={styles.recipeButton}
              onClick={() => setIsOpenInstruction(!isOpenInstruction)}
            >
              Instructions
            </button>
          </div>
          <span>
            {isOpenInstruction && (
              <div className={styles.recipeOverlayContainer}>
                <div className={styles.recipeOverlay}>
                  <button
                    className={styles.recipeOverlayButton}
                    onClick={() => setIsOpenInstruction(!isOpenInstruction)}
                  >
                    X
                  </button>
                  <h2 className={styles.recipeOverlayTitle}>Instructions</h2>
                  <ol className={styles.recipeOverlayList}>
                    {recipeDetails?.analyzedInstructions[0]?.steps?.map((s) => (
                      <li key={s.number}>
                        <h3>{s.number}.-</h3>
                        <p>{s.step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
