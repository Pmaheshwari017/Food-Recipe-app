import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from './favorites'
import AllRecipes from '../redux/allRecipes'
export const store = configureStore({
    reducer: {
        favoriteMeals: favoriteReducer,
        recipes: AllRecipes

    }
})