export const validateText = (input) => {
  const warnings = {};
  console.log(input);
  if (input.title.length === 0) {
    warnings.title = 'Please enter the title.';
  } else if (!/^[A-Z].*[a-z]$/.test(input.title)) {
    warnings.title = 'The title must begin with a capital letter.';
  }

  if (input.summary.length === 0) {
    warnings.summary = 'Please enter a summary of your recipe.';
  }

  if (input.healthScore === null) {
    warnings.healthScore = 'Please enter your score.';
  }

  return warnings;
};

export const validateImage = (input) => {
  let error = null;
  console.log(input);
  const inputImage = input.slice(0, 8);

  console.log(inputImage);
  if (inputImage !== 'https://') error = 'Please enter a correct url';

  return error;
};
