import React from "react";
import { Dimensions,Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { colorTheme, PayInStoreTop } from "../component/store";
const NewsScreen = ({navigation, route}) =>{
    return(
        <SafeAreaView style={styles.container}>
        <PayInStoreTop navigation={navigation} text={'ss'}/>
            <Image source={require('../../assets/img/news1.jpg')} style={{width:"100%", marginTop:10}}/>
            <Text style={styles.content}>Bursting with the tangy zing of freshly squeezed lemons, this sparkling soda blends a hint of sweet wildflower... aaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
        </SafeAreaView>
    )
}

const { width, height } = Dimensions.get('window');
const scale = size => (width / 375) * size;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.white,
  },
  content: {
    color: 'black',
    margin: scale(15),  // Scaled margin
    fontSize: scale(17), // Scaled font size
  }
});


export default NewsScreen;