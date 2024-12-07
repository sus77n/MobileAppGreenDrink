import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colorTheme, LoadingScreen, resetUserAfterChange, TopGoBack } from "../component/store";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getFirestore } from "@react-native-firebase/firestore";

const ProfileDetail = ({ navigation, route }) => {
    const { user } = route.params;

    const [gender, setGender] = useState(user.formOfAddress);
    const [username, setUsername] = useState(user.username);
    // const [birthday, setBirthday] = useState(new Date());
    // const [showDatePicker, setShowDatePicker] = useState(false);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [loading, setLoading] = useState(false);

    // const handleDateChange = (event, selectedDate) => {
    //     setShowDatePicker(false);
    //     if (selectedDate) {
    //         setBirthday(selectedDate);
    //     }
    // };

    const updateInformation = () => {
        setLoading(true);
        try {

            if (!username || !email || !phone) {
                throw new Error("Should fill all blanks");
            }

            getFirestore().collection("customers").doc(user.key)
                .update(
                    {
                        username: username,
                        formOfAddress: gender,
                        email: email,
                        phone: phone,
                    }
                )
                .then(() => {
                    resetUserAfterChange(user.key);
                    setLoading(false);
                    Alert.alert('Success', 'User updated successfully');
                    navigation.pop();
                })

        } catch (error) {
            setLoading(false);
            Alert.alert('Error', 'Something went wrong. Please try again.');
            console.error('Error updating user:', error.massage);
        }
    }

    return (
        <View style={styles.container}>
            <LoadingScreen visible={loading} />
            <TopGoBack text={"Edit Personal Information"} navigation={navigation} />
            <View style={styles.wrapper}>
                <Text style={styles.title}>General Information</Text>
                <View style={styles.textField}>
                    <Picker
                        selectedValue={gender}
                        onValueChange={(value) => setGender(value)}>
                        <Picker.Item label="Ms" value="Ms" />
                        <Picker.Item label="Mr" value="Mr" />
                    </Picker>
                </View>
                <Text style={styles.label}>Username:</Text>
                <TextInput style={styles.textField} value={username} onChangeText={setUsername}></TextInput>
                <Text style={styles.title}>Contact Information</Text>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.textField} inputMode="email" value={email} onChangeText={setEmail}></TextInput>
                <Text style={styles.label}>Phone</Text>
                <TextInput style={styles.textField} inputMode="tel" value={phone} onChangeText={setPhone}></TextInput>

                <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.navigate("ChangePassword", { user })}>
                    <Text style={styles.saveTextbtn}>Change password</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveBtn} onPress={updateInformation}>
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

export default ProfileDetail;