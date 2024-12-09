import React, { useEffect, useState } from 'react';
import { Dimensions, Alert, Button, Image, SafeAreaView, TextInput, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker
import firestore from '@react-native-firebase/firestore';
import { colorTheme, LoadingScreen, TopGoBack } from '../../component/store';  // Assuming colorTheme is available from your existing code

const { width, height } = Dimensions.get('window');
const scale = size => (width / 375) * size;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.white,
  },
  input: {
    height: scale(40),
    borderColor: colorTheme.greenBackground,
    borderWidth: scale(1),
    marginTop: scale(15),
    paddingLeft: scale(10),
    borderRadius: scale(5),
    marginHorizontal: scale(20),
  },
  button: {
    backgroundColor: colorTheme.greenBackground,
    paddingVertical: scale(10),
    borderRadius: scale(5),
    alignItems: 'center',
    marginVertical: scale(15),
    marginHorizontal: scale(20),
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
    marginTop: scale(15),
    marginHorizontal: scale(20),
  },
  picker: {
    height: scale(50),
  },
});


const AddProduct = ({ navigation }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscriber = firestore()
      .collection('categories')
      .onSnapshot(querySnapshot => {
        setLoading(true)
        const categoriesList = [];
        querySnapshot.forEach(documentSnapshot => {
          categoriesList.push({
            label: documentSnapshot.data().name,
            value: documentSnapshot.data().name,
          });
        });
        setCategories(categoriesList);
        setLoading(false)
      });

    return () => {
      subscriber()
    };
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    if (!name || !price || !img || !description || !category) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }

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
        setLoading(false);
        Alert.alert('Success', 'Product added successfully');
        navigation.goBack();  // Navigate back after submitting
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert('Error', 'Something went wrong. Please try again.');
        console.error('Error adding product:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoadingScreen visible={loading} />
      <TopGoBack navigation={navigation} text={'Add new drink'} />
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
