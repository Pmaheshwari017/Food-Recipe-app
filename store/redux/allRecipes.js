import { createSlice } from "@reduxjs/toolkit";

const allRecipes = createSlice({
    name: "recipes",
    initialState: {
        recipes: []
    },

    reducers: {
        setRecipes: (state, action) => {
            const recipces = state.recipes.some((item) => item.id == action.payload.id)
            if (!recipces) {
                state.recipes.push(action.payload)
            }
        }
    }
})
// export const addFavorite = favoritesSlice.actions.addFavorite
// export const removeFavorite = favoritesSlice.actions.removeFavorite
// export default favoritesSlice.reducer

export const setRecipes = allRecipes.actions.setRecipes
export default allRecipes.reducer