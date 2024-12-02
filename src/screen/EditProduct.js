import React, { useState, useEffect } from 'react';
import { Alert, TextInput, TouchableOpacity, Text, SafeAreaView, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { colorTheme } from '../component/store';  
import firestore from '@react-native-firebase/firestore';


const styles = StyleSheet.create({
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  previewButton: {
    backgroundColor: colorTheme.greenBackground,
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: colorTheme.greenBackground,
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'red', // You can choose a color for the cancel button
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
});

const EditProduct = ({ navigation, route }) => {
  const { drink } = route.params; 
  const [name, setName] = useState(drink.name);
  const [price, setPrice] = useState(drink.price.toString());
  const [img, setImg] = useState(drink.img);
  const [description, setDescription] = useState(drink.description);
  const [category, setCategory] = useState(drink.category);
  const [categories, setCategories] = useState([]);
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

    return () => subscriber();
  }, []);
  const handlePreview = () => {
    console.log('Preview product:', { name, price, img, description, category });
  };
  const handleSave = () => {
    if (!name || !price || !img || !description || !category) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }
    const numericPrice = parseFloat(price); 
  if (isNaN(numericPrice)) {
    Alert.alert('Error', 'Please enter a valid price');
    return;
  }
    firestore()
      .collection('drinks')
      .doc(drink.key)
      .update({
        name,
        price,
        img,
        description,
        category,
      })
      .then(() => {
        Alert.alert('Success', 'Product updated successfully');
        navigation.goBack(); 
      })
      .catch((error) => {
        Alert.alert('Error', 'Something went wrong. Please try again.');
        console.error('Error updating product:', error);
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
        style={[styles.input, {height: 100}]}
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

      {/* Bottom Buttons */}
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
    </SafeAreaView>
  );
};

export default EditProduct;
