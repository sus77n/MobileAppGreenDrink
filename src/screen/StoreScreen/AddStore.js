import React, { useState } from 'react';
import "react-native-gesture-handler"
import { Dimensions, Alert, TextInput, TouchableOpacity, Text, SafeAreaView, View, StyleSheet } from 'react-native';
import { colorTheme, LoadingScreen, TopGoBack } from '../../component/store';
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get('window');
const scale = size => (width / 375) * size;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        flex: 1,
        backgroundColor: colorTheme.white,
        padding: scale(20),
    },
    input: {
        height: scale(40),
        borderColor: colorTheme.greenBackground,
        borderWidth: scale(1),
        marginBottom: scale(15),
        paddingLeft: scale(10),
        borderRadius: scale(5),
    },
    button: {
        backgroundColor: colorTheme.greenBackground,
        paddingVertical: scale(10),
        borderRadius: scale(5),
        alignItems: 'center',
        marginVertical: scale(10),
    },
    buttonText: {
        color: colorTheme.white,
        fontSize: scale(16),
        fontWeight: '600',
    },
    pickerContainer: {
        borderColor: colorTheme.greenBackground,
        borderWidth: scale(1),
        borderRadius: scale(5),
        marginBottom: scale(15),
    },
    picker: {
        height: scale(50),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: scale(20),
    },
    previewButton: {
        backgroundColor: colorTheme.greenBackground,
        paddingVertical: scale(10),
        borderRadius: scale(5),
        flex: 1,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: colorTheme.greenBackground,
        paddingVertical: scale(10),
        borderRadius: scale(5),
        flex: 1,
        marginLeft: scale(10),
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: 'red',
        paddingVertical: scale(10),
        borderRadius: scale(5),
        flex: 1,
        marginLeft: scale(10),
        alignItems: 'center',
    },
});


const AddStore = ({ navigation, }) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [loading, setLoading] = useState(false);

    const handlePreview = () => {
        console.log('Preview product:', { name, address, contact, latitude, longitude });
    };

    const handleSave = () => {
        setLoading(true);
        if (!name || !address || !contact || !latitude || !longitude) {
            Alert.alert('Error', 'Please fill in all the fields');
            return;
        }
        const toNumberLatitude = parseFloat(latitude);
        const toNumberLongitude = parseFloat(latitude);

        if (isNaN(toNumberLongitude) || isNaN(toNumberLatitude)) {
            Alert.alert('Error', 'Please enter a valid location');
            return;
        }

        firestore()
            .collection('storeLocations')
            .add({
                name: name,
                address: address,
                contact: contact,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
            })
            .then(() => {
                setLoading(false)
                Alert.alert('Success', 'Store saved successfully');
                navigation.goBack();
            })
            .catch((error) => {
                setLoading(false)
                Alert.alert('Error', 'Something went wrong. Please try again.');
                console.error('Error adding product:', error);
            });
    };


    const handleCancel = () => {
        Alert.alert('Cancel', 'Are you sure you want to discard changes?', [
            { text: 'Yes', onPress: () => navigation.goBack() },
            { text: 'No' },
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <TopGoBack text={"Add store"} navigation={navigation} />
            <View style={styles.form}>
                <LoadingScreen visible={loading} />
                <TextInput
                    style={styles.input}
                    placeholder="Store Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={address}
                    onChangeText={setAddress}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone number"
                    value={contact}
                    onChangeText={setContact}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Latitude"
                    value={latitude}
                    onChangeText={setLatitude}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Longitude"
                    value={longitude}
                    onChangeText={setLongitude}
                />


                <View style={styles.row}>
                    <TouchableOpacity style={styles.previewButton} onPress={handlePreview}>
                        <Text style={styles.buttonText}>Preview</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AddStore;
