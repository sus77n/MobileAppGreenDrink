import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colorTheme, TopGoBack } from "../component/store";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView from 'react-native-maps';

const ProfileScreen = ({ navigation }) => {

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Icon name='crown' style={styles.crownIcon} size={50} color={'white'} />
                <Icon name='account-circle-outline' size={100} color={'white'} />
                <Text style={[styles.whiteText, styles.name]}>Peter</Text>
                <View style={styles.subHeader}>
                    <Icon name='star' style={styles.accountIcon} size={22} color={colorTheme.orangeText} />
                    <Text style={[styles.whiteText, styles.subHeaderText]}>56</Text>
                    <Text style={[styles.whiteText, styles.subHeaderText]}>Gold member</Text>
                </View>
            </View>

            <View style={styles.sectionBlock}>
                <Text style={styles.headerSection}>ACCOUNT DETAILS</Text>
                <View style={styles.bodySection}>
                    <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("ProfileDetail")}>
                        <Text style={styles.rowText}>Personal Information</Text>
                        <Icon name='account-details-outline' style={styles.accountIcon} size={40} color={colorTheme.black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>Membership Details</Text>
                        <Icon name='crown-circle-outline' style={styles.accountIcon} size={40} color={colorTheme.black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("Transaction")}>
                        <Text style={styles.rowText}>Transaction History</Text>
                        <Icon name='history' style={styles.accountIcon} size={40} color={colorTheme.black} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.sectionBlock}>
                <Text style={styles.headerSection}>SUPPORT</Text>
                <View style={styles.bodySection}>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>FAQS</Text>
                        <Icon name='chevron-right' style={styles.accountIcon} size={40} color={colorTheme.black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>Feedback</Text>
                        <Icon name='chevron-right' style={styles.accountIcon} size={40} color={colorTheme.black} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.sectionBlock}>
                <Text style={styles.headerSection}>LEGAL</Text>
                <View style={styles.bodySection}>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>Term of Use</Text>
                        <Icon name='chevron-right' style={styles.accountIcon} size={40} color={colorTheme.black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>Privacy Policy</Text>
                        <Icon name='chevron-right' style={styles.accountIcon} size={40} color={colorTheme.black} />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.logOutBtn}>
                <Text style={styles.logOutText}>LOG OUT</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.white,
    },
    header: {
        backgroundColor: colorTheme.greenBackground,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        height: 250,
        borderColor: colorTheme.greenBackground,
        justifyContent: "center",
        alignItems: "center",
    },
    crownIcon: {
        color: colorTheme.orangeText,
        marginBottom: -15,
    },
    subHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    whiteText: {
        color: colorTheme.white,
    },
    subHeaderText: {
        fontSize: 14,
        paddingLeft: 12,
    },
    name: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 15,
    },
    sectionBlock: {
        padding: 12,
    },
    headerSection: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#000",
    },
    bodySection: {
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        alignItems: "center",
        paddingVertical: 10,
    },
    rowText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#000",
    },
    logOutBtn: {
        width: "75%",
        borderWidth: 2,
        borderRadius: 20,
        borderColor: colorTheme.greenBackground,
        marginHorizontal: "auto",
        paddingVertical: 5,
        marginVertical: 15,
    },
    logOutText: {
        color: colorTheme.greenBackground,
        width: "100%",
        textAlign: "center",
        fontWeight: "500",
    },
})
export default ProfileScreen;