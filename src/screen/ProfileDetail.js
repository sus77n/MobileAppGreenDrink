import React, { useState } from "react";
import {  Dimensions, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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
const { width, height } = Dimensions.get('window');
const scale = size => (width / 375) * size;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.white,
    },
    wrapper: {
        paddingHorizontal: scale(22), // 6% of 375px
    },
    label: {
        fontSize: scale(15),
        color: colorTheme.grayText,
        marginTop: scale(5),
        fontWeight:"500"
    },
    textField: {
        borderBottomColor: colorTheme.grayLine,
        borderBottomWidth: 1,
        paddingHorizontal: scale(8), 
        fontSize: scale(16),
        fontWeight: "500",
        marginBottom: scale(12), 
        marginTop: scale(0), 
    },
    text: {
        color: colorTheme.black,
        fontWeight: "500",
        fontSize: scale(16),
    },
    dateInput: {
        borderBottomWidth: 1,
        borderBlockColor: colorTheme.grayLine,
        paddingHorizontal: scale(8), 
        paddingVertical: scale(8), 
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        color: colorTheme.greenText,
        marginTop: scale(12),
        fontSize: scale(16),
        fontWeight: "700",
    },
    saveBtn: {
        borderWidth: 2,
        borderRadius: scale(50),
        borderColor: colorTheme.greenBackground,
        alignSelf: 'center', 
        paddingVertical: scale(15), 
        width: scale(200),
        marginTop: scale(20), 
    },
    saveTextbtn: {
        color: colorTheme.greenBackground,
        width: "100%",
        textAlign: "center",
        fontWeight: "500",
    },
});


export default ProfileDetail;