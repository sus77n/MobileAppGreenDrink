import React, { useEffect, useState } from 'react';
import {Dimensions, SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { colorTheme } from '../component/store';
import { getFirestore } from '@react-native-firebase/firestore';


const HomeStoreScreen = ({navigation}) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const subscriber = getFirestore()
      .collection('transactions')
      .onSnapshot(querySnapshot => {
        const transactions = [];

        querySnapshot.forEach(documentSnapshot => {
          transactions.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setTransactions(transactions);
      });
      console.log(transactions);
      

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const handleTransactionStatus = (transactionId, newStatus) => {
    const updatedTransactions = transactions.map(transaction => {
      if (transaction.id === transactionId) {
        return { ...transaction, status: newStatus };
      }
      return transaction;
    });
    setTransactions(updatedTransactions);
  };

  const renderTransactionItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.transactionCard} onPress={() => navigation.navigate('ManageDetailTrans', {transaction: item})}>
        <Text style={styles.transactionId}>Transaction ID: {item.transID}</Text>
        <Text style={styles.statusText}>Status: {item.status}</Text>
        <View style={styles.buttonContainer}>
          {item.status === 'Uncompleted' && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleTransactionStatus(item.id, 'Completed')}
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
         <View style={styles.greetingSection}>
          <Text style={styles.greetingText}>Green Drink Store</Text>
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
