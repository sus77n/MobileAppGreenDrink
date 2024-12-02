import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, SafeAreaView, TextInput, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker
import firestore from '@react-native-firebase/firestore';
import { colorTheme, TopGoBack } from '../component/store';  // Assuming colorTheme is available from your existing code

const styles = StyleSheet.create({
  //can not use '%', because the avoid keyboard view
  container: {
    flex: 1,
    backgroundColor: colorTheme.white,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: colorTheme.greenBackground,
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: colorTheme.greenBackground,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: colorTheme.white,
    fontSize: 16,
    fontWeight: '600',
  },
  pickerContainer: {
    borderColor: colorTheme.greenBackground,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    height: 50,
  },
});

const AddProduct = ({ navigation }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch categories from Firestore when component mounts
  useEffect(() => {
    const subscriber = firestore()
      .collection('categories')
      .onSnapshot(querySnapshot => {
        const categoriesList = [];
        querySnapshot.forEach(documentSnapshot => {
          categoriesList.push({
            label: documentSnapshot.data().name, // Assuming 'name' is the category name
            value: documentSnapshot.data().name,
          });
        });
        setCategories(categoriesList);
      });

    // Unsubscribe on component unmount
    return () => subscriber();
  }, []);

  const handleSubmit = () => {
    if (!name || !price || !img || !description || !category) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }

    // Add product to Firestore
    firestore()
      .collection('drinks')
      .add({
        name,
        price,
        img,
        description,
        category,
      })
      .then(() => {
        Alert.alert('Success', 'Product added successfully');
        navigation.goBack();  // Navigate back after submitting
      })
      .catch((error) => {
        Alert.alert('Error', 'Something went wrong. Please try again.');
        console.error('Error adding product:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
    <TopGoBack navigation={navigation} text={'Add new drink'}/>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={img}
        onChangeText={setImg}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Category Picker */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Category" value="" />
          {categories.map((cat) => (
            <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddProduct;
