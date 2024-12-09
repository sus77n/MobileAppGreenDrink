import React, { useEffect, useState } from 'react';
import { Alert, TextInput, TouchableOpacity, Text, SafeAreaView, View, StyleSheet, Dimensions } from 'react-native';
import { colorTheme, LoadingScreen } from '../component/store';
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get('window');
const scale = size => (width / 375) * size;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.white,
    padding: scale(20), // Adjusted for scale
  },

  input: {
    height: scale(40), // Adjusted for scale
    borderColor: colorTheme.greenBackground,
    borderWidth: scale(1), // Adjusted for scale
    marginBottom: scale(15), // Adjusted for scale
    paddingLeft: scale(10), // Adjusted for scale
    borderRadius: scale(5), // Adjusted for scale
  },

  button: {
    backgroundColor: colorTheme.greenBackground,
    paddingVertical: scale(10), // Adjusted for scale
    borderRadius: scale(5), // Adjusted for scale
    alignItems: 'center',
    marginVertical: scale(10), // Adjusted for scale
  },

  buttonText: {
    color: colorTheme.white,
    fontSize: scale(16), // Adjusted for scale
    fontWeight: '600',
  },

  pickerContainer: {
    borderColor: colorTheme.greenBackground,
    borderWidth: scale(1), // Adjusted for scale
    borderRadius: scale(5), // Adjusted for scale
    marginBottom: scale(15), // Adjusted for scale
  },

  picker: {
    height: scale(50), // Adjusted for scale
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(20), // Adjusted for scale
  },

  previewButton: {
    backgroundColor: colorTheme.greenBackground,
    paddingVertical: scale(10), // Adjusted for scale
    borderRadius: scale(5), // Adjusted for scale
    flex: 1,
    alignItems: 'center',
  },

  saveButton: {
    backgroundColor: colorTheme.greenBackground,
    paddingVertical: scale(10), // Adjusted for scale
    borderRadius: scale(5), // Adjusted for scale
    flex: 1,
    marginLeft: scale(10), // Adjusted for scale
    alignItems: 'center',
  },

  cancelButton: {
    backgroundColor: 'red',
    paddingVertical: scale(10), // Adjusted for scale
    borderRadius: scale(5), // Adjusted for scale
    flex: 1,
    marginLeft: scale(10), // Adjusted for scale
    alignItems: 'center',
  },
});


const EditStoreScreen = ({ navigation, route }) => {
    const { store } = route.params;
    const [name, setName] = useState(store.name);
    const [address, setAddress] = useState(store.address);
    const [contact, setContact] = useState(store.contact);
    const [latitude, setLatitude] = useState(store.latitude.toString());
    const [longitude, setLongitude] = useState(store.longitude.toString());
    const [hasEdit, setHasEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const original = {
            name: store.name,
            address: store.address,
            contact: store.contact,
            latitude: store.latitude,
            longitude: store.longitude,
        };

        const current = { name, address, contact, latitude, longitude };

        const isEdited = Object.keys(original).some(
            (key) => original[key] !== current[key]
        );

        setHasEdit(isEdited);
    }, [name, address, contact, latitude, longitude]);

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
            .doc(store.key)
            .update({
                name: name,
                address: address,
                contact: contact,
                latitude: latitude,
                longitude: longitude,
            })
            .then(() => {
                setLoading(false)
                Alert.alert('Success', 'Store updated successfully');
                navigation.goBack();
            })
            .catch((error) => {
                setLoading(false)
                Alert.alert('Error', 'Something went wrong. Please try again.');
                console.error('Error updating product:', error);
            });
    };


    const handleCancel = () => {
        if (hasEdit) {
            Alert.alert('Cancel', 'Are you sure you want to discard changes?', [
                { text: 'Yes', onPress: () => navigation.goBack() },
                { text: 'No' },
            ]);
        } else {
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
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
                placeholder="Longitude"
                value={longitude}
                onChangeText={setLongitude}
            />
            <TextInput
                style={styles.input}
                placeholder="Latitude"
                value={latitude}
                onChangeText={setLatitude}
            />


            <View style={styles.row}>
                <TouchableOpacity style={styles.previewButton} onPress={handlePreview}>
                    <Text style={styles.buttonText}>Preview</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default EditStoreScreen;
