import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { colorTheme, TopGoBack } from "../component/store";
const OrderPickUp = ({navigation}) =>{
    return(
        <SafeAreaView style={styles.container}>
            <TopGoBack navigation={navigation} text={'Order & Pick-up'}/>
            <View style={styles.searchSection}>

            </View>
            <ScrollView style={styles.main}>
                <Text style={styles.type}></Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colorTheme.white,
    },
    searchSection: {

    },
    main: {
        padding: 20
    },
    type:{
        fontSize: 20,
        color: colorTheme.greenText,
        fontWeight: "600",

    }
})

export default OrderPickUp;