import React, { useState, useEffect } from 'react';
import { Dimensions,Alert, TextInput, TouchableOpacity, Text, SafeAreaView, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { colorTheme, LoadingScreen } from '../../component/store';
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get('window');
const scale = size => (width / 375) * size;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.white,
    padding: scale(20), // 20px adjusted for scale
  },

  input: {
    height: scale(40), // 40px adjusted for scale
    borderColor: colorTheme.greenBackground,
    borderWidth: scale(1), // 1px adjusted for scale
    marginBottom: scale(15), // 15px adjusted for scale
    paddingLeft: scale(10), // 10px adjusted for scale
    borderRadius: scale(5), // 5px adjusted for scale
  },

  button: {
    backgroundColor: colorTheme.greenBackground,
    paddingVertical: scale(10), // 10px adjusted for scale
    borderRadius: scale(5), // 5px adjusted for scale
    alignItems: 'center',
    marginVertical: scale(10), // 10px adjusted for scale
  },

  buttonText: {
    color: colorTheme.white,
    fontSize: scale(16), // 16px adjusted for scale
    fontWeight: '600',
  },

  pickerContainer: {
    borderColor: colorTheme.greenBackground,
    borderWidth: scale(1), // 1px adjusted for scale
    borderRadius: scale(5), // 5px adjusted for scale
    marginBottom: scale(15), // 15px adjusted for scale
  },

  picker: {
    height: scale(50), // 50px adjusted for scale
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(20), // 20px adjusted for scale
  },

  previewButton: {
    backgroundColor: colorTheme.greenBackground,
    paddingVertical: scale(10), // 10px adjusted for scale
    borderRadius: scale(5), // 5px adjusted for scale
    flex: 1,
    alignItems: 'center',
  },

  saveButton: {
    backgroundColor: colorTheme.greenBackground,
    paddingVertical: scale(10), // 10px adjusted for scale
    borderRadius: scale(5), // 5px adjusted for scale
    flex: 1,
    marginLeft: scale(10), // 10px adjusted for scale
    alignItems: 'center',
  },

  cancelButton: {
    backgroundColor: 'red',
    paddingVertical: scale(10), // 10px adjusted for scale
    borderRadius: scale(5), // 5px adjusted for scale
    flex: 1,
    marginLeft: scale(10), // 10px adjusted for scale
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
  const [hasEdit, setHasEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscriber = firestore()
      .collection('categories')
      .onSnapshot(querySnapshot => {
        const categoriesList = [];
        querySnapshot.forEach(documentSnapshot => {
          categoriesList.push({
            label: documentSnapshot.data().name,
            value: documentSnapshot.data().name,
          });
        });
        setCategories(categoriesList);
        setLoading(false);
      });

    return () => {
      setLoading(true)
      subscriber()
    };
  }, []);

  useEffect(() => {
    const original = {
      name: name,
      price: price,
      img: img,
      description: description,
      category: category,
    };

    const current = { name, price, img, description, category };

    const isEdited = Object.keys(original).some(
      (key) => original[key] !== current[key]
    );

    setHasEdit(isEdited);
  }, [name, price, img, description, category]);

  const handlePreview = () => {
    console.log('Preview product:', { name, price, img, description, category });
  };

  const handleSave = () => {
    setLoading(true);
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
        setLoading(false);
        Alert.alert('Success', 'Product updated successfully');
        navigation.goBack();
      })
      .catch((error) => {
        setLoading(false);
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
        style={[styles.input, { height: 100 }]}
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
