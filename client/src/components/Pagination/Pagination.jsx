import React, { useState } from 'react';
import styles from './Pagination.module.scss';
import { imgs } from '../../assets';

const Pagination = ({ page, setPage, max }) => {
  const [input, setInput] = useState(1);

  const nextPage = () => {
    setInput(parseInt(input) + 1);
    setPage(parseInt(page) + 1);
  };

  const previousPage = () => {
    setInput(parseInt(input) - 1);
    setPage(parseInt(page) - 1);
  };

  const handleInputs = (e) => {
    setInput(parseInt(e.target.value));
    setPage(parseInt(e.target.value));
  };

  const inputs = [];
  for (let index = 1; index <= max; index++) {
    inputs.push(index);
  }

  return (
    <div className={styles.pagination}>
      <button
        disabled={page === 1 || page < 1}
        onClick={previousPage}
        className={styles.paginationButton}
      >
        <img
          className={styles.buttonIcons}
          src={imgs.previousIcon}
          alt='next-icon'
        />
      </button>
      {inputs.map((i) => (
        <button
          value={i}
          onClick={(e) => handleInputs(e)}
          className={`${styles.paginationButton} ${
            input === parseInt(i) ? styles.inputActive : null
          }`}
          key={i}
        >
          {i}
        </button>
      ))}
      <button
        disabled={page === max || page > max}
        onClick={nextPage}
        className={styles.paginationButton}
      >
        <img
          className={styles.buttonIcons}
          src={imgs.nextIcon}
          alt='previous-icon'
        />
      </button>
    </div>
  );
};

export default Pagination;
