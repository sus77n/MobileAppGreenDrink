import React, { useEffect, useState } from "react";
import {   Dimensions,ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colorTheme, getUser, LoadingScreen, resetUserStorage, setUserStorage, TopGoBack } from "../component/store";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchUser = async () => {
        try {
            const user = await getUser();
            setUser(user);
            console.log("User:", user);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching user:", error);
        }
    };
    useEffect(() => {
        setLoading(true);
        const loadScreen = navigation.addListener("focus", () => {
            fetchUser();
        });
        return () => loadScreen();
    }, []);

    const logoutHandler = () => {
        try {
            resetUserStorage();
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })
        } catch (error) {
            console.error("Error resetting navigation: ", error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <LoadingScreen visible={loading} />
            <View style={styles.header}>
                <Icon name='crown' style={styles.crownIcon} size={50} color={'white'} />
                <Icon name='account-circle-outline' size={100} color={'white'} />
                <Text style={[styles.whiteText, styles.name]}>{user ? user.username : "User"}</Text>
                <View style={styles.subHeader}>
                    <Icon name='star' style={styles.accountIcon} size={22} color={colorTheme.orangeText} />
                    <Text style={[styles.whiteText, styles.subHeaderText]}>{user ? user.stars : "0"}</Text>
                    <Text style={[styles.whiteText, styles.subHeaderText]}>Gold member</Text>
                </View>
            </View>

            <View style={styles.sectionBlock}>
                <Text style={styles.headerSection}>ACCOUNT DETAILS</Text>
                <View style={styles.bodySection}>
                    <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("ProfileDetail", { user })}>
                        <Text style={styles.rowText}>Personal Information</Text>
                        <Icon name='account-details-outline' style={styles.accountIcon} size={40} color={colorTheme.black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("MembershipDetail")}>
                        <Text style={styles.rowText}>Membership Details</Text>
                        <Icon name='crown-circle-outline' style={styles.accountIcon} size={40} color={colorTheme.black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("Transaction", {user})}>
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

            <TouchableOpacity style={styles.logOutBtn} onPress={logoutHandler}>
                <Text style={styles.logOutText}>LOG OUT</Text>
            </TouchableOpacity>
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
    header: {
        backgroundColor: colorTheme.greenBackground,
        borderBottomRightRadius: scale(40),
        borderBottomLeftRadius: scale(40),
        height: scale(250),
        borderColor: colorTheme.greenBackground,
        justifyContent: "center",
        alignItems: "center",
    },
    crownIcon: {
        color: colorTheme.orangeText,
        marginBottom: scale(-15),
    },
    subHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    whiteText: {
        color: colorTheme.white,
    },
    subHeaderText: {
        fontSize: scale(14),
        paddingLeft: scale(12),
    },
    name: {
        fontSize: scale(25),
        fontWeight: "bold",
        marginBottom: scale(15),
    },
    sectionBlock: {
        padding: scale(12),
    },
    headerSection: {
        fontWeight: "bold",
        fontSize: scale(18),
        color: colorTheme.grayText,
    },
    bodySection: {
        paddingHorizontal: scale(20),
        paddingVertical: scale(8),
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: colorTheme.grayLine,
        borderBottomWidth: 1,
        alignItems: "center",
        paddingVertical: scale(10),
    },
    rowText: {
        fontSize: scale(16),
        fontWeight: "500",
        color: colorTheme.black,
    },
    logOutBtn: {
        width: scale(200), 
        borderWidth: 2,
        borderRadius: scale(50),
        borderColor: colorTheme.greenBackground,
        alignSelf: "center", 
        paddingVertical: scale(10),
        marginVertical: scale(15),
    },
    logOutText: {
        color: colorTheme.greenBackground,
        width: "100%",
        textAlign: "center",
        fontWeight: "500",
    },
});

export default ProfileScreen;