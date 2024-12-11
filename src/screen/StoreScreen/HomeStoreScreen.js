import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { colorTheme, LoadingScreen, resetUserStorage } from '../../component/store';
import { getFirestore } from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';


const HomeStoreScreen = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    subscriber()
  }, [])

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

  const subscriber = () => {
    getFirestore()
      .collection('transactions')
      .orderBy('transID')
      .onSnapshot(querySnapshot => {
        const transactions = [];

        querySnapshot.forEach(documentSnapshot => {
          transactions.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        const filter = transactions.filter(item => item.status === 'Uncompleted');
        setTransactions(filter);
      });
  }

  const handleTransactionStatus = (transactionId, newStatus) => {
    // Step 1: Update the local state
    setLoading(true)
    const updatedTransactions = transactions.map(transaction => {
      if (transaction.transId === transactionId) {
        return { ...transaction, status: newStatus };
      }
      return transaction;
    });

    setTransactions(updatedTransactions);

    // Step 2: Find and update Firestore using the 'transId' field
    const transactionRef = getFirestore()
      .collection('transactions')
      .where('transID', '==', transactionId)
      .limit(1); // Make sure the query returns only one result

    transactionRef.get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          const transactionDoc = querySnapshot.docs[0];
          transactionDoc.ref.update({
            status: newStatus,
          })
            .then(() => {
              console.log('Transaction status updated in Firestore');
            })
            .catch((error) => {
              console.error('Error updating status in Firestore: ', error);
            });
        } else {
          console.log('Transaction not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching transaction from Firestore: ', error);
      });
    setLoading(false)
  };

  const logoutHandler = () => {
    try {
      resetUserStorage();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    } catch (error) {
      console.error("Error resetting navigation: ", error);
    }
  };
  const renderTransactionItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.transactionCard} onPress={() => navigation.navigate('ManageOrder', { transaction: item })}>
        <Text style={styles.transactionId}>Transaction ID: {item.transID}</Text>
        <Text style={styles.statusText}>Status: {item.status}</Text>
        <View style={styles.buttonContainer}>
          {item.status === 'Uncompleted' && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleTransactionStatus(item.transID, 'Completed')}
              disabled={item.status === 'Completed'} // Disable after status change
            >
              <Text style={styles.buttonText}>Mark as Completed</Text>
            </TouchableOpacity>
          )}

          {item.status === 'Completed' && (
            <Text style={styles.completedText}>Completed</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoadingScreen visible={loading} />
      <View style={styles.greetingSection}>
        <Text style={styles.greetingText}>Green Drink Store</Text>
        <TouchableOpacity onPress={() => logoutHandler()}>
          <Icon
            name="sign-out"
            style={styles.icon}
            size={30}
            color={colorTheme.greenText}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={transactions}
        renderItem={renderTransactionItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');
const scale = size => (width / 375) * size;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.grayBackground,
  },
  listContainer: {
    paddingHorizontal: scale(20),
  },
  greetingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(20),
    paddingHorizontal: scale(20),
    backgroundColor: colorTheme.white,
    paddingVertical: scale(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(1) },
    shadowOpacity: 0.8,
    shadowRadius: scale(2),
    elevation: 5,
  },
  greetingText: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: colorTheme.greenText,
  },
  transactionCard: {
    backgroundColor: '#fff',
    padding: scale(20),
    marginBottom: scale(10),
    borderRadius: scale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(1) },
    shadowOpacity: 0.8,
    shadowRadius: scale(2),
    elevation: 5,
  },
  transactionId: {
    fontSize: scale(12),
    fontWeight: 'bold',
  },
  statusText: {
    color: colorTheme.black,
    fontWeight: '600',
    marginTop: scale(10),
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: scale(10),
  },
  button: {
    backgroundColor: colorTheme.greenBackground,
    paddingVertical: scale(15),
    paddingHorizontal: scale(25),
    borderRadius: scale(5),
    marginRight: scale(15),
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  completedText: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: scale(10),
  },
});


export default HomeStoreScreen;
