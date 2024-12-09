import React from "react";
import { Dimensions,Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { colorTheme, TopGoBack } from "../../component/store";
const NewsScreen = ({navigation, route}) =>{
    const {aNews} = route.params
    console.log(aNews);
    
    return(
        <ScrollView style={styles.container}>
        <TopGoBack navigation={navigation} text={'News'}/>
        <Image source={{uri: aNews.img}} style={styles.drinkImage} />
        <Text style={styles.drinkTitle}>{aNews.title}</Text>
            <Text style={styles.content}>{aNews.content}</Text>
        </ScrollView>
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
    marginHorizontal: scale(15),  // Scaled margin
    fontSize: scale(15), // Scaled font size
  },
  drinkImage: {
    width: scale(400),
    height: scale(300),
    marginBottom: scale(20),
  },
  drinkTitle: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: '#568f56',
    textAlign: 'center',
    marginBottom: scale(20),
  },
});


export default NewsScreen;