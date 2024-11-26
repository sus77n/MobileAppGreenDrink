import React from "react";
import { StyleSheet, View } from "react-native";
import { colorTheme } from "../component/store";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name='crown' style={styles.crownIcon} size={50} color={'white'} />
                <Icon name='account-circle-outline' style={styles.accountIcon} size={100} color={'white'} />
                <View>
                    
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: colorTheme.greenBackground,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        height: 200,
        borderColor: colorTheme.greenBackground,
        justifyContent: "center",
        alignItems: "center",
    },
    crownIcon: {
        color: colorTheme.orangeText,
    },
    accountIcon: {

    },
    subtitle: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
})
export default ProfileScreen;