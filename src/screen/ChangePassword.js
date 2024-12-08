import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colorTheme, LoadingScreen, TopGoBack } from "../component/store";
import { getFirestore } from "@react-native-firebase/firestore";

const ChangePassword = ({ navigation, route }) => {
    const { user } = route.params;

    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const updatePassword = async () => {
        setLoading(true)
        try {

            if (!currentPassword || !password) {
                throw new Error("Should fill all blanks");
            }

            if (!(currentPassword === user.password)) {
                throw new Error("Wrong current password");
            }


            await getFirestore().collection("customers").doc(user.key)
                .update(
                    {
                        password: password
                    }
                )
                .then(() => {
                    setLoading(false)
                    Alert.alert('Success', 'User updated successfully');
                    navigation.goBack();
                })

        } catch (error) {
            setLoading(false)
            Alert.alert("Error", error.toString())
            console.error(error);
        }

    }

    return (
        <View style={styles.container}>
            <LoadingScreen visible={loading} />
            <TopGoBack text={"Edit Password"} navigation={navigation} />
            <View style={styles.wrapper}>
                <Text style={styles.title}>Change password</Text>
                <Text style={styles.label}>Current password:</Text>
                <TextInput style={styles.textField} secureTextEntry value={currentPassword} onChangeText={setCurrentPassword}></TextInput>
                <Text style={styles.label}>New Password</Text>
                <TextInput style={styles.textField} secureTextEntry value={password} onChangeText={setPassword}></TextInput>

                <TouchableOpacity style={styles.saveBtn} onPress={updatePassword}>
                    <Text style={styles.saveTextbtn}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.white,
    },
    wrapper: {
        paddingHorizontal: "6%",
    },
    label: {
        fontSize: 12,
        color: colorTheme.grayText,
        marginTop: 8,
    },
    textField: {
        borderBottomColor: colorTheme.grayLine,
        borderBottomWidth: 1,
        paddingHorizontal: "2%",
        fontSize: 16,
        fontWeight: "500",
        marginBottom: "3%",
        marginTop: "-2%",
    },
    text: {
        color: colorTheme.black,
        fontWeight: "500",
        fontSize: 16,
    },
    dateInput: {
        borderBottomWidth: 1,
        borderBlockColor: colorTheme.grayLine,
        paddingHorizontal: "2%",
        paddingVertical: "2%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        color: colorTheme.greenText,
        marginTop: "6%",
        fontSize: 16,
    },
    saveBtn: {
        width: "60%",
        borderWidth: 2,
        borderRadius: 20,
        borderColor: colorTheme.greenBackground,
        marginHorizontal: "auto",
        paddingVertical: '2%',
        marginTop: "5%"
    },
    saveTextbtn: {
        color: colorTheme.greenBackground,
        width: "100%",
        textAlign: "center",
        fontWeight: "500",
    },
})

export default ChangePassword;