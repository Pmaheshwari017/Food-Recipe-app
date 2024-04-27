import { FlatList } from 'react-native'
import CategoryGridTile from '../components/CategoryGridTile'
import { CATEGORIES } from '../data/dummy-data'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native';
import { ToastAndroid } from 'react-native';

// useNavigation hook can be used as alternative
function CategoriesScreen({ navigation }) {
    const [Recipe, setRecipe] = useState([]);
    const [error, setError] = useState("");
    var allgetrecipiImage = [];
    const mealDetail = async () => {
        //Not use because of in-consistant and less data in API: to get the data from API need to pay for the API key:

        // const URL = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=apple,+flour,+sugar&number=10&apiKey=e4e2db24d4eb4dd69a35be0de823318c`
        // const res = await fetch(URL, {
        // method: 'GET',
        // });
        // console.log("🚀 ~ mealDetail ~ Array data:", data[0])

        // use it dummay API to get the data:

        const URLrecipiImage = 'https://dummyjson.com/recipes'
        const recipiImage = await fetch(URLrecipiImage)
        const resRecipiImage = await recipiImage.json();
        const getrecipiImage = resRecipiImage.recipes;
        if (getrecipiImage.length > 0) {
            setRecipe(getrecipiImage)
        } else {
            setError("No data found")
            setTimeout(() => {
                ToastAndroid.show("Please reopen the app", ToastAndroid.SHORT)
            }, 1000)
        }
        allgetrecipiImage = getrecipiImage;
    }

    useEffect(() => {
        mealDetail()
    }, [])
    function renderCategoryItem(itemData) {
        function pressHandler() {
            navigation.navigate("MealsOverview", { categoryId: itemData.item.id, itemData: itemData })          // { categoryId: itemData.item.id } -  passing the parameters to MealsOverviewScreen page
        }
        return <CategoryGridTile itemData={itemData} title={itemData.item.name} color={"#f5a442"} onPress={pressHandler} />
    }
    return (
        (Recipe.length > 0) ? <FlatList data={Recipe} keyExtractor={(item) => item.id} renderItem={renderCategoryItem} numColumns={1} /> :
            <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}><Text style={{ fontSize: 20 }}>{error}</Text></View>
    )
}

export default CategoriesScreen