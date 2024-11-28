import React from "react";
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { colorTheme } from "../component/store";
const ProductDetail = () =>{
    return(
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../../assets/img/detailBackgroun.png')} style={{width: '101%', height: '115%'}} >
                <View style={styles.wrapWhite}>
                    <View style={styles.top}>
                        <View style={styles.topLeft}>
                            <Text style={styles.name}>Zesty Lemonade Fizz</Text>
                            <Text style={styles.descrip}>Bursting with the tangy zing of freshly squeezed lemons, this sparkling soda blends a hint of sweet wildflower.</Text>
                        </View>
                        <View style={styles.topRight}>
                            <Image source={require('../../assets/img/tea5w130.png')} style={styles.img}/>
                            <Text style={styles.price}>đ50,000</Text>
                        </View>
                    </View>
                    <View style={styles.sizeSetion}>
                        <Text style={styles.titleSize}>Drink size</Text>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    wrapWhite:{
        position: "absolute",
        width: '99%',
        flex: 1,
        backgroundColor: colorTheme.white,
        marginTop: '70%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    top:{
        flexDirection:'row',
        alignItems:"center",
        paddingHorizontal: '5%',
        paddingVertical: '10%'
    },
    topLeft:{
        width: '60%',
        alignItems: "center"
    },
    name:{
        color: colorTheme.greenText,
        fontSize: 24,
        fontWeight: "700",
        marginBottom: '10%'
    },
    descrip:{

    },
    topRight:{
        width: '40%',
        alignItems: "center"
    },
    img: {
        position: "absolute",
        marginTop: '-105%',
    },
    price: {
        color: colorTheme.orangeBackground,
        fontWeight: "700",
        fontSize: 23,
        marginTop: '50%'
    },
    sizeSetion: {

    },
    titleSize:{

    },
})

export default ProductDetail;