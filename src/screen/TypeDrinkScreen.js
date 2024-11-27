import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colorTheme, TopGoBack } from "../component/store";
import Icon from 'react-native-vector-icons/FontAwesome';
const TypeDrinkScreen = ({navigation}) =>{
    return(
        <SafeAreaView style={styles.container}>
            <TopGoBack navigation={navigation} text={'Tea'}/>
            <View style={styles.searchSection}>

            </View>
            <ScrollView style={styles.main}>
                <View style={styles.typeDrink}>
                    <View style={styles.drinkRow}>
                        <TouchableOpacity style={styles.imageWrap}>
                            <Image source={require('../../assets/img/tea1.png')} style={styles.img}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.nameWrap}>
                            <Text style={styles.name}>Zesty Lemonade Fizz</Text>
                            <TouchableOpacity>
                                <Icon name='heart-o' color={'white'} size={20} style={{marginRight: 20}}/>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.drinkRow}>
                        <TouchableOpacity style={styles.imageWrap}>
                            <Image source={require('../../assets/img/tea2.png')} style={styles.img}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.nameWrap}>
                            <Text style={styles.name}>Zesty Lemonade Fizz</Text>
                            <TouchableOpacity>
                                <Icon name='heart-o' color={'white'} size={20} style={{marginRight: 20}}/>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.drinkRow}>
                        <TouchableOpacity style={styles.imageWrap}>
                            <Image source={require('../../assets/img/tea4.png')} style={styles.img}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.nameWrap}>
                            <Text style={styles.name}>Zesty Lemonade Fizz</Text>
                            <TouchableOpacity>
                                <Icon name='heart-o' color={'white'} size={20} style={{marginRight: 20}}/>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.drinkRow}>
                        <TouchableOpacity style={styles.imageWrap}>
                            <Image source={require('../../assets/img/tea5.png')} style={styles.img}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.nameWrap}>
                            <Text style={styles.name}>Zesty Lemonade Fizz</Text>
                            <TouchableOpacity>
                                <Icon name='heart-o' color={'white'} size={20} style={{marginRight: 20}}/>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.drinkRow}>
                        <TouchableOpacity style={styles.imageWrap}>
                            <Image source={require('../../assets/img/tea6.png')} style={styles.img}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.nameWrap}>
                            <Text style={styles.name}>Zesty Lemonade Fizz</Text>
                            <TouchableOpacity>
                                <Icon name='heart-o' color={'white'} size={20} style={{marginRight: 20}}/>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.drinkRow}>
                        <TouchableOpacity style={styles.imageWrap}>
                            <Image source={require('../../assets/img/tea7.png')} style={styles.img}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.nameWrap}>
                            <Text style={styles.name}>Zesty Lemonade Fizz</Text>
                            <TouchableOpacity>
                                <Icon name='heart-o' color={'white'} size={20} style={{marginRight: 20}}/>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.drinkRow}>
                        <TouchableOpacity style={styles.imageWrap}>
                            <Image source={require('../../assets/img/tea8.png')} style={styles.img}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.nameWrap}>
                            <Text style={styles.name}>Zesty Lemonade Fizz</Text>
                            <TouchableOpacity>
                                <Icon name='heart-o' color={'white'} size={20} style={{marginRight: 20}}/>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.drinkRow}>
                        <TouchableOpacity style={styles.imageWrap}>
                            <Image source={require('../../assets/img/tea4.png')} style={styles.img}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.nameWrap}>
                            <Text style={styles.name}>Zesty Lemonade Fizz</Text>
                            <TouchableOpacity>
                                <Icon name='heart-o' color={'white'} size={20} style={{marginRight: 20}}/>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.drinkRow}>
                        <TouchableOpacity style={styles.imageWrap}>
                            <Image source={require('../../assets/img/tea4.png')} style={styles.img}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.nameWrap}>
                            <Text style={styles.name}>Zesty Lemonade Fizz</Text>
                            <TouchableOpacity>
                                <Icon name='heart-o' color={'white'} size={20} style={{marginRight: 20}}/>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>

                </View>
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
        paddingHorizontal: '4%'
    },
    typeDrink: {
        marginTop: '3%'
    },
    drinkRow:{
        flexDirection: "row",
        alignItems: 'center',
        marginTop: '7%',
    },
    imageWrap:{
        zIndex: 1,
        backgroundColor: colorTheme.lightGreeenBackground,
        paddingHorizontal: '4%',
        borderRadius: 20,
    },
    img:{
        top: '-25%',
        height: 67,
    },
    nameWrap:{
        zIndex: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"flex-end",
        width:'85%',
        backgroundColor: colorTheme.greenBackground,
        left: '-4%',
        paddingVertical: '5%',
        borderRadius: 10,
    },
    name:{
        width: '60%',
        fontSize: 16,
        fontWeight:"600",
        textAlign: "center",
        color: colorTheme.white,
        left: '-10%'
    },
})

export default TypeDrinkScreen;