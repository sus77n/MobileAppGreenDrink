import React, { useEffect, useState } from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  adminId,
  colorTheme,
  LoadingScreen,
  resetUserAfterChange,
  TopGoBack,
} from '../../component/store';
import { getFirestore } from '@react-native-firebase/firestore';

const AddMoney = ({ navigation, route }) => {
  const [amount, setAmount] = useState('');
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedUserKey, setSelectedUserKey] = useState(null);
  const [backPressCount, setBackPressCount] = useState(0);

  useEffect(() => {
    const backAction = () => {
      if (backPressCount === 0) {
        setBackPressCount(1);
        ToastAndroid.show('Back one more time to exit', ToastAndroid.SHORT);
        setTimeout(() => setBackPressCount(0), 2000);
        return true;
      } else {
        BackHandler.exitApp();
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [backPressCount]);
  
  useEffect(() => {
    setLoading(true);
    const unsubscribeUsers = getFirestore()
      .collection("customers")
      .onSnapshot((querySnapShort) => {
        const list = querySnapShort.docs.map((doc) => ({
          ...doc.data(),
          key: doc.id
        }));

        const filterList = list.filter((user) => user.key !== adminId);
        setUsers(filterList);
        setLoading(false)

        console.log("users: ", users);

      })

    return () => unsubscribeUsers();
  }, [])

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
        .update({ balance: addedMoney })
        .then(() => {
          Alert.alert('Successfully');
          setAmount(0);
        });
    } catch (error) {
      Alert.alert('Something wrong');
      console.log('Error when add money: ' + error);
    }
  };

  const renderUser = ({ item: user }) => {
    const isSelected = user.key === selectedUserKey;
    return (
      <TouchableOpacity style={[styles.user, isSelected && styles.selectedUser]} onPress={() => {
        setSelectedUserKey(user.key);
        setUser(user);
      }}>
        <View style={styles.row}>
          <Text style={styles.label}>User id:</Text>
          <Text>{user.key}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Username:</Text>
          <Text>{user.username}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Balance:</Text>
          <Text>{user.balance}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoadingScreen visible={loading} />
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
      <View style={styles.listWraper}>
        <Text style={styles.title}>List of account:</Text>
        <FlatList
          data={users}
          renderItem={renderUser}
          keyExtractor={(item) => item.key}>
        </FlatList>
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');
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
  listWraper: {
    flex: 1,
    padding: scale(10)
  },
  user: {
    backgroundColor: colorTheme.grayBackground,
    padding: scale(10),
    borderRadius: scale(10),
    marginVertical: scale(2),
  },
  selectedUser: {
    backgroundColor: colorTheme.greenBackgroundDrink
  },
  title: {
    fontSize: scale(20),
    fontWeight: "600",
    color: colorTheme.greenText
  },
  label: {
    fontWeight: "500",
    color: colorTheme.greenText
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
export default AddMoney;
