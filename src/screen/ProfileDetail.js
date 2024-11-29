import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colorTheme, TopGoBack } from "../component/store";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileDetail = ({ navigation }) => {
    const [gender, setGender] = useState('Ms');
    const [firstName, setFirstName] = useState('Peter');
    const [lastName, setLastName] = useState('Peter');
    const [birthday, setBirthday] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [email, setEmail] = useState('peter@gmail.com');
    const [phone, setPhone] = useState('0999999999');

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setBirthday(selectedDate);
        }
    };

    return (
        <View style={styles.container}>
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
                <Text style={styles.label}>First name*</Text>
                <TextInput style={styles.textField} value={firstName} onChangeText={setFirstName}></TextInput>
                <Text style={styles.label}>Last name*</Text>
                <TextInput style={styles.textField} value={lastName} onChangeText={setLastName} ></TextInput>
                <Text style={styles.label}>Birthday</Text>
                <TouchableOpacity
                    style={styles.dateInput}
                    onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.text}>{birthday.toLocaleDateString()}</Text>
                    <Icon name='calendar-month-outline' style={styles.accountIcon} size={26} color={colorTheme.grayText} />
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={birthday}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleDateChange}
                    />
                )}
                <Text style={styles.title}>Contact Information</Text>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.textField} inputMode="email" value={email} onChangeText={setEmail}></TextInput>
                <Text style={styles.label}>Phone</Text>
                <TextInput style={styles.textField} inputMode="tel" value={phone} onChangeText={setPhone}></TextInput>

                <TouchableOpacity style={styles.saveBtn}>
                    <Text style={styles.saveTextbtn}>SAVE</Text>
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
        fontWeight:"500",
        marginBottom: "3%",
        marginTop: "-2%",
    },
    text: {
        color: colorTheme.black,
        fontWeight:"500",
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