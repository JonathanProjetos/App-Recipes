import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import IngredientCard from '../components/Explore/IngredientCard';
import Header from '../components/Header/Header';
import ProductDetailsContext from '../context/FoodDetails/ProductDetailsContext';
import './pagesCss/Explore.css';

const NUMBER_TWELVE = 12;

function ExploreFoodsNationalities() {
  const history = useHistory();
  const { setDetailFood } = useContext(ProductDetailsContext);
  const [state, setState] = useState('All');
  const [listNation, setListNation] = useState([]);
  const [mealsPerNation, setMealsPerNation] = useState([]);
  useEffect(() => {
    const searchNatinalities = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        const { meals } = await response.json();
        const natinalities = meals.map((nationality) => nationality.strArea);
        setListNation(['All', ...natinalities]);
      } catch (e) {
        console.log(e);
      }
    };
    searchNatinalities();
  }, []);

  const handleNation = ({ target: { value } }) => {
    setState(value);
  };

  useEffect(() => {
    const foodNatinality = async () => {
      if (state === 'All') {
        try {
          const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
          const { meals } = await response.json();
          const mealsNationality = meals.filter((meal, index) => index < NUMBER_TWELVE);
          setMealsPerNation([...mealsNationality]);
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${state}`);
          const { meals } = await response.json();
          const mealsNationality = meals.filter((meal, index) => index < NUMBER_TWELVE);
          setMealsPerNation([...mealsNationality]);
        } catch (e) {
          console.log(e);
        }
      }
    };
    foodNatinality();
  }, [state]);

  const clickRecipe = async (id) => {
    history.push(`/foods/${id}`);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { meals } = await response.json();
      setDetailFood(meals[0]);
      setIdUrl(idUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="divHeader">
        <Header namePage="Explore Nationalities" />
      </div>
      <main className="mainNational">
        <select
          className="selectNational"
          data-testid="explore-by-nationality-dropdown"
          onChange={ handleNation }
        >
          {
            listNation.map((nation) => (
              <option key={ nation } data-testid={ `${nation}-option` }>{nation}</option>
            ))
          }
        </select>
        <div className="divNational">
          {
            mealsPerNation.map((food, index) => (
              <IngredientCard
                key={ food.idMeal }
                testId={ `${index}-recipe-card` }
                name={ food.strMeal }
                image={ food.strMealThumb }
                testImage={ `${index}-card-img` }
                testName={ `${index}-card-name` }
                handleClick={ () => clickRecipe(food.idMeal) }
              />
            ))
          }
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ExploreFoodsNationalities;
