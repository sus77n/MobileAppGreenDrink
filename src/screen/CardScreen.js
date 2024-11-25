import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
const CardScreen = () =>{
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.title}>Pay In Store</Text>
                <TouchableOpacity>
                    <Icon name='times' style={styles.iconClose} size={50} color={'black'}/>
                </TouchableOpacity>
            </View>
            <View style={styles.card}>

            </View>
            <View style={styles.barCode}>

            </View>
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    top: {
        flex:  1,
        flexDirection: 'row',
        
    },
    title: {

    },

    card: {

    },
    barCode: {

    },
})

export default CardScreen;