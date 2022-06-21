import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import FoodDrinkContext from '../context/FoodDrink/FoodDrinkContext';
import RecipeCard from '../components/Cards/RecipeCard';

function Foods() {
  const {
    dataFood,
    categoryFood,
    handleClickFilterCategoryFood,
    handleClickCategoryAllFood,
    listRecipes,
    btnFilter,
    category,
    setBtnFilter,
  } = useContext(FoodDrinkContext);
  console.log(dataFood);
  console.log(categoryFood);

  const maxNumber = 12;

  useEffect(() => {
    setBtnFilter(false);
  }, []);

  return (
    <div>
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ handleClickCategoryAllFood }
        >
          All
        </button>

        {categoryFood.length > 0 && btnFilter === false
        && categoryFood
          .map((food) => (
            <button
              name={ food.strCategory }
              key={ food.strCategory }
              type="button"
              data-testid={ `${food.strCategory}-category-filter` }
              onClick={ handleClickFilterCategoryFood }
            >
              { food.strCategory }
            </button>
          ))}
      </div>
      <div>
        {dataFood.length > 0 && btnFilter === false
        && dataFood
          .map((food, index) => (
            <Link key={ food.strMeal } to={ `/foods/${food.idMeal}` }>
              <div data-testid={ `${index}-recipe-card` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ food.strMealThumb }
                  alt={ food.strMeal }
                />
                <p data-testid={ `${index}-card-name` }>{ food.strMeal }</p>
              </div>
            </Link>
          ))}
      </div>
      <div>
        { category === 'foods' && btnFilter === true
        && listRecipes.slice(0, maxNumber)
          .map((foods, index) => (
            <Link key={ foods.idMeal } to={ `/foods/${foods.idMeal}` }>
              <RecipeCard
                image={ foods.strMealThumb }
                name={ foods.strMeal }
                index={ index }
              />
            </Link>
          )) }
      </div>
      <Footer />
    </div>
  );
}

export default Foods;
