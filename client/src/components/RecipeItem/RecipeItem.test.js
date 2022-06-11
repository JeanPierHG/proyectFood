import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import RecipeItem from './RecipeItem';

describe('RecipeItem', () => {
  const history = createMemoryHistory();
  let component;

  beforeEach(() => {
    component = render(
      <BrowserRouter history={history}>
        <RecipeItem />
      </BrowserRouter>
    );
  });

  test('To have a article', () => {
    expect(component.container.querySelector('article')).toBeDefined();
  });
  test('To have a h3', () => {
    expect(component.container.querySelector('h3')).toBeDefined();
  });
  test('To have a img', () => {
    expect(component.container.querySelector('img')).toBeDefined();
  });
});
