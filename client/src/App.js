import React from 'react';
import './App.css';

import { Routes, Route } from 'react-router-dom';
import { Home, Landing, RecipeDetails, CreateRecipe } from './pages';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/home/:id' element={<RecipeDetails />} />
        <Route path='/home/createRecipe' element={<CreateRecipe />} />
      </Routes>
    </div>
  );
}

export default App;
