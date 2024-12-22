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
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const AddMoney = ({ navigation, route }) => {
  const [amount, setAmount] = useState('');
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedUserKey, setSelectedUserKey] = useState('');
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

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [backPressCount]);

  useEffect(() => {
    setLoading(true);
    const unsubscribeUsers = getFirestore()
      .collection('customers')
      .onSnapshot(querySnapShort => {
        const list = querySnapShort.docs.map(doc => ({
          ...doc.data(),
          key: doc.id,
        }));

        const filterList = list.filter(user => user.key === selectedUserKey);
        setUsers(filterList);
        setLoading(false);
      });

    return () => unsubscribeUsers();
  }, [selectedUserKey]);

  const handleAdd = async () => {

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 1000) {
      Alert.alert(
        'Please enter a valid positive number and more than 1,000 VND',
      );
      return;
    }

    const addedMoney = parseFloat(user.balance) + numericAmount;

    try {
      setLoading(true);
      getFirestore()
        .collection('customers')
        .doc(user.key)
        .update({ balance: addedMoney })
        .then(() => {
          Alert.alert('Successfully', "Add money successfully!");
          setAmount(0);
        });
    } catch (error) {
      Alert.alert('Something wrong');
      console.log('Error when add money: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const renderUser = ({ item: user }) => {
    const isSelected = user.key === selectedUserKey;
    setUser(user)
    return (
      <View style={[styles.user, isSelected && styles.selectedUser]}>
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
      </View>
    );
  };

  onSuccess = e => {
    setLoading(true)
    try {
      setSelectedUserKey(e.data);
    } catch (error) {
      Alert.alert('error when scan' + error);
    } finally {
      setLoading(false)
    }
  };

  if (users.length > 0) {
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
          <FlatList
            data={users}
            renderItem={renderUser}
            keyExtractor={item => item.key}
          />
        </View>
        <TouchableOpacity style={styles.goBackBtn} onPress={() => {
          setUsers([])
          setUser(null)
          setSelectedUserKey("")
        }}>
          <Text style={styles.addButtonText}>Go back to scan</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <LoadingScreen visible={loading} />
      <TopGoBack navigation={navigation} text={'Add Money'} />
      <View style={styles.listWraper}>
        <Text style={styles.title}>Scan Customer QR</Text>
        <View>
          <QRCodeScanner
            onRead={this.onSuccess}
            // flashMode={RNCamera.Constants.FlashMode.torch}
            bottomContent={
              <TouchableOpacity style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>OK. Got it!</Text>
              </TouchableOpacity>
            }
            cameraStyle={styles.qrContainer}
          />
        </View>
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
    padding: scale(10),
  },
  user: {
    backgroundColor: colorTheme.grayBackground,
    padding: scale(10),
    borderRadius: scale(10),
    marginVertical: scale(2),
  },
  selectedUser: {
    backgroundColor: colorTheme.greenBackgroundDrink,
  },
  title: {
    fontSize: scale(20),
    fontWeight: '600',
    color: colorTheme.greenText,
  },
  label: {
    fontWeight: '500',
    color: colorTheme.greenText,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qrContainer: {
    marginTop: scale(40),
    marginLeft: scale(20),
    width: scale(320),
    height: scale(350),
  },
  goBackBtn: {
    backgroundColor: '#7ec479',
    paddingVertical: scale(13),
    width: scale(220),
    borderRadius: scale(25),
    borderWidth: scale(2),
    borderColor: 'white',
    alignItems: 'center',
    marginHorizontal: "auto",
    marginBottom: scale(20)
  }
});
export default AddMoney;
