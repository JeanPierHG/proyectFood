import React, { useEffect, useRef, useState } from 'react';
import styles from './CreateRecipe.module.scss';
import { imgs } from '../../assets';

import { postRecipe, apiGetRecipes } from '../../Redux/spoonacular/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { validateImage, validateText } from './validateForm';
import { NavLink } from 'react-router-dom';

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

const CreateRecipe = () => {
  const typeDiets = useSelector((state) => state.spoon.data.diets);
  const dispatch = useDispatch();

  const [succesPost, setSuccesPost] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    healthScore: null,
    image: '',
    analyzedInstructions: [
      {
        name: '',
        steps: [],
      },
    ],
    diets: [],
  });

  const [errorText, setErrorText] = useState({});
  const [errorImage, setErrorImage] = useState(null);
  const [dietSelected, setDietSelected] = useState([]);
  const [imageRecipe, setImageRecipe] = useState('');
  const [inputStep, setInputSteps] = useState({
    number: 0,
    step: null,
  });

  const inputStepRef = useRef(null);
  const inputImageRef = useRef(null);

  const handleValidateImage = (input) => {
    const message = validateImage(input);
    setErrorImage(message);
    setImageRecipe(inputImageRef.current.value);
  };

  const handleValidateInputs = (data) => {
    const message = validateText(data);
    setErrorText(message);
    if (Object.entries(message).length === 0) {
      setSuccesPost(true);
      postRecipe(dispatch, formData);
      apiGetRecipes(dispatch);
    }
  };

  const handleOnChange = (event) => {
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleDietSelected = (e) => {
    if (dietSelected.includes(e.target.value)) {
      setDietSelected((dietSelected) =>
        dietSelected.filter((d) => d !== e.target.value)
      );
    } else {
      setDietSelected((dietSelected) => [...dietSelected, e.target.value]);
    }
  };

  const handleOnChangeStep = (event) => {
    setInputSteps((inputStep) => ({
      ...inputStep,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAddStep = () => {
    setFormData((formData) => ({
      ...formData,
      analyzedInstructions: [
        {
          name: '',
          steps: [...formData.analyzedInstructions[0].steps, inputStep],
        },
      ],
    }));

    setInputSteps({
      number: ++inputStep.number,
      step: '',
    });

    inputStepRef.current.value = '';
  };

  useEffect(() => {
    setFormData((formData) => ({
      ...formData,
      diets: dietSelected,
    }));
  }, [dietSelected]);

  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <h1 className={styles.formTitle}>Create Recipe</h1>
        <form
          onSubmit={(e) => e.preventDefault()}
          className={styles.form}
          action=''
        >
          <div className={styles.containerInputImage}>
            <div className={styles.containerImage}>
              <img className={styles.image} src={imageRecipe} alt='' />
            </div>
            <div className={styles.containerInputData}>
              <label className={styles.labelImage} htmlFor='image'>
                Image URL:
              </label>
              <input
                className={styles.inputImageUrl}
                onChange={handleOnChange}
                ref={inputImageRef}
                type='text'
                id='image'
                name='image'
              />
              <span
                className={`${styles.errors} ${
                  errorImage ? styles.errorVisible : styles.errorNotVisible
                }`}
              >
                {errorImage}
              </span>
            </div>
            <button
              className={styles.buttonAddImage}
              onClick={() => handleValidateImage(inputImageRef.current.value)}
            >
              Add
            </button>
          </div>

          <div className={styles.formColumnGrid}>
            <div className={styles.containerInputTitle}>
              <label className={styles.labelTitle} htmlFor='title'>
                Title:{' '}
              </label>
              <input
                className={styles.inputTitle}
                type='text'
                name='title'
                id='title'
                autoComplete='off'
                onChange={handleOnChange}
              />
              <span
                className={`${styles.errors} ${
                  errorText.title ? styles.errorVisible : styles.errorNotVisible
                }`}
              >
                {errorText.title}
              </span>
            </div>
            <div className={styles.containerInputSummary}>
              <label className={styles.labelSummary} htmlFor='summary'>
                Summary:
              </label>
              <textarea
                className={styles.inputSummary}
                name='summary'
                id='summary'
                onChange={handleOnChange}
              ></textarea>
              <span
                className={`${styles.errors} ${
                  errorText.summary
                    ? styles.errorVisible
                    : styles.errorNotVisible
                }`}
              >
                {errorText.summary}
              </span>
            </div>
            <div className={styles.containerInputHighScore}>
              <label className={styles.labelHighScore} htmlFor='highScore'>
                HighScore:
              </label>
              <input
                onChange={handleOnChange}
                className={styles.inputHighScore}
                type='range'
                name='healthScore'
                id='healthScore'
                min={0}
                max={100}
              />
              <p className={styles.spanHighScore}>
                {formData.healthScore ? formData.healthScore : 0} points
              </p>
              <span
                className={`${styles.errors} ${
                  errorText.healthScore
                    ? styles.errorVisible
                    : styles.errorNotVisible
                }`}
              >
                {errorText.healthScore}
              </span>
            </div>
          </div>
          <div className={styles.formColumnGrid}>
            <div className={styles.formDiets}>
              <label htmlFor=''>Diets:</label>
              <div className={styles.formDietContainer}>
                {typeDiets?.map((d, index) => (
                  <div key={index} className={styles.formDietButtonContainer}>
                    <input
                      className={`${styles.formDietButton} ${
                        dietSelected.includes(d.id) ? styles.dietSelected : null
                      } `}
                      onClick={handleDietSelected}
                      type='image'
                      src={imgDiet[d.name]}
                      value={d.id}
                      alt={`${d.name}-icon`}
                    />
                    <span>{d.name[0].toUpperCase() + d.name.slice(1)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.containerInputSteps}>
              <label className={styles.labelStep} htmlFor=''>
                Steps:
              </label>
              <div className={styles.containerActionsSteps}>
                <span className={styles.labelIndexStep}>
                  {inputStep.number + 1}
                </span>
                <input
                  onChange={handleOnChangeStep}
                  className={styles.inputStep}
                  type='text'
                  name='step'
                  id='step'
                  autoComplete='off'
                  ref={inputStepRef}
                />
                <button onClick={handleAddStep} className={styles.buttonStep}>
                  +
                </button>
              </div>
            </div>
          </div>
        </form>
        <button
          className={styles.formButtonSubmit}
          onClick={() => handleValidateInputs(formData)}
        >
          Create
        </button>
      </div>
      {succesPost && (
        <div className={styles.succesOverlay}>
          <div className={styles.succesDetailsContainer}>
            <h2 className={styles.succesTitle}>
              The recipe was successfully created{' '}
            </h2>
            <img className={styles.succesIcon} src={imgs.checkLogo} alt='' />
            <NavLink to={'/home'}>
              <button className={styles.succesButton}>Home</button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRecipe;
