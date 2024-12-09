import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  colorTheme,
  resetUserAfterChange,
  TopGoBack,
} from '../../component/store';
import {getFirestore} from '@react-native-firebase/firestore';

const AddMoney = ({navigation, route}) => {
  const [amount, setAmount] = useState('');
  const {user} = route.params;

  const handleAdd = async () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 1000) {
      Alert.alert('Please enter a valid positive number and more than 1,000 VND');
      return;
    }

    const addedMoney = parseFloat(user.balance) + numericAmount;

    try {
      getFirestore()
        .collection('customers')
        .doc(user.key)
        .update({balance: addedMoney})
        .then(async () => {
          await resetUserAfterChange(user.key);
          Alert.alert('Successfully');
          setAmount(0)
          navigation.popToTop()
        });
    } catch (error) {
      Alert.alert('Something wrong');
      console.log('Error when add money: ' + error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TopGoBack navigation={navigation} text={'Add Money'} />
      <View style={styles.main}>
        <Text style={styles.text}>How much you want to add?</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
          inputMode="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={() => handleAdd()}>
          <Text style={styles.addButtonText}>Add money</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const {width, height} = Dimensions.get('window');
const scale = size => (width / 375) * size;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.white,
  },
  main: {
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    alignItems: 'center',
  },
  text: {
    fontSize: scale(17),
    color: colorTheme.grayText,
    fontWeight: '500',
    marginBottom: scale(20),
  },
  input: {
    borderWidth: scale(1),
    borderColor: colorTheme.greenBackground,
    paddingHorizontal: scale(10),
    width: '80%',
  },
  addButton: {
    backgroundColor: '#7ec479',
    paddingVertical: scale(13),
    width: scale(120),
    borderRadius: scale(25),
    borderWidth: scale(2),
    borderColor: 'white',
    alignItems: 'center',
    marginTop: scale(7),
  },
  addButtonText: {
    fontSize: scale(14),
    color: 'white',
    fontWeight: 'bold',
  },
});
export default AddMoney;
