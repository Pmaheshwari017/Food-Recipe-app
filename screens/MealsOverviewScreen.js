import { StyleSheet, FlatList, View, Image, Text } from 'react-native'
import { MEALS, CATEGORIES } from '../data/dummy-data'
import MealItem from '../components/MealItem'
import { useLayoutEffect } from 'react'
import { useState } from 'react'
import IconButton from '../components/IconButton'
import { TouchableOpacity } from 'react-native'

// useRoute is alternative to route used here

function MealsOverviewScreen({ route, navigation }) {                // route and navigation are two properties we get when we register a js file as screen in App.js
    const [seeMore, setSeeMore] = useState(false)
    const catId = route.params.categoryId
    const itemData = route.params.itemData.item
    const renderMealItem = (itemData) => {
        return (
            <View Style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 15, color: "black" }}>{itemData.index + 1}.{itemData.item}</Text>
            </View>
        )
    }
    const moreDetailHandleer = () => {
        return navigation.navigate('MealDetail', { itemData: itemData })
    }
    const iconHandler = () => {
        setSeeMore(!seeMore)
    }
    return (
        <View style={styles.container}>
            <Image source={{ uri: itemData.image }} style={{ width: "100%", height: 200 }} />
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
                <View>
                    <Text style={{ fontSize: 25, color: "white" }}>{itemData.name}</Text>
                </View>
                <View style={{ marginTop: 2, borderColor: "#C6C2AC", borderWidth: 2, borderRadius: 10, padding: 2 }} >
                    <IconButton onPress={() => iconHandler()} icon={seeMore ? "down" : "up"} color={"white"} />
                </View>
            </View>
            <>
                {seeMore ? <View style={{ borderColor: "black", borderWidth: 2, borderRadius: 10, backgroundColor: '#f4f3ef', padding: 10, marginTop: 5 }}>
                    <Text style={{ fontSize: 20, alignSelf: "center", color: "black", textDecorationStyle: "dotted" }}>
                        Instruction
                    </Text>

                    <FlatList data={itemData.instructions} renderItem={renderMealItem} style={{ width: "100%" }} />
                    <TouchableOpacity onPress={() => moreDetailHandleer()}>
                        <View style={{ borderColor: "#C6C2AC", borderWidth: 2, width: "30%", borderRadius: 10, backgroundColor: '#e5e3d9', alignSelf: "center", marginTop: 12 }}><Text style={{ alignSelf: "center" }}>See More</Text></View>
                    </TouchableOpacity>
                </View> : null}
            </>
        </View >
    )

}

export default MealsOverviewScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    }
})