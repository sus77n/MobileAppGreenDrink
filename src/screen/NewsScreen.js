import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { colorTheme } from "../component/store";
const NewsScreen = () =>{
    return(
        <SafeAreaView style={styles.container}>
            <Image/>
            <Text>sfsaa</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.white,
    }
})

export default NewsScreen;