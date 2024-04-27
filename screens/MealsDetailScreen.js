import { Image, StyleSheet, Text, View, ScrollView } from "react-native"
import List from "../components/MealDetail/List"
import Subtitle from "../components/MealDetail/Subtitle"
import MealDetails from "../components/MealDetails"
import IconButton from "../components/IconButton"
import { useSelector, useDispatch } from 'react-redux'
import { addFavorite, removeFavorite } from '../store/redux/favorites'
import { useState } from "react"
import { useEffect } from "react"
import { setRecipes } from "../store/redux/allRecipes"

function MealDetailScreen({ route, navigation }) {
    const [favMeal, setFavMeal] = useState(false)
    const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids)
    const dispatch = useDispatch()
    const itemData = route.params.itemData
    const mealIsFavorite = favoriteMealIds.includes(itemData.id)
    useEffect(() => {
        setFavMeal(mealIsFavorite)
    }, [mealIsFavorite])

    function changeFavoriteStatusHandler() {
        dispatch(setRecipes(itemData))
        if (mealIsFavorite) {
            dispatch(removeFavorite({ id: itemData.id }))
            setFavMeal(false)
        } else {
            dispatch(addFavorite({ id: itemData.id }))
        }
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <IconButton icon={favMeal ? 'star' : 'staro'} color="white" onPress={changeFavoriteStatusHandler} />
                )
            },
            title: 'About the Dish',
            headerTitleAlign: 'center'
        })
    }, [navigation, favMeal])
    return (
        <>
            <ScrollView style={{ marginBottom: 15 }}>
                <Image style={styles.image} source={{ uri: itemData.image }} />
                <Text style={styles.title}>{itemData.name}</Text>
                <MealDetails
                    prepTimeMinutes={itemData.prepTimeMinutes}
                    servings={itemData.servings}
                    cuisine={itemData.cuisine}
                    textStyle={styles.detailText}
                />

                <View style={{ alignItems: "center" }}>
                    <View style={styles.listContainer}>
                        <Subtitle>Ingredients</Subtitle>
                        <List data={itemData.ingredients} />

                        <Subtitle>Steps</Subtitle>
                        <List data={itemData.tags} />
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default MealDetailScreen

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 350
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white'
    },
    detailText: {
        color: 'white'
    },
    listContainer: {
        width: '80%',
    }
})