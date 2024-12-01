import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { colorTheme } from '../component/store';

const HomeStoreScreen = ({navigation}) => {
  const [transactions, setTransactions] = useState([
    { id: 'T1000001', status: 'Received' },
    { id: 'T1000002', status: 'Completed' },
    { id: 'T1000003', status: 'Received' },
  ]);

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
      <TouchableOpacity style={styles.transactionCard} onPress={() => navigation.navigate('ManageDetailTrans')}>
        <Text style={styles.transactionId}>Transaction ID: {item.id}</Text>
        <Text style={styles.statusText}>Status: {item.status}</Text>
        <View style={styles.buttonContainer}>
          {item.status === 'Received' && (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.grayBackground,
  },
  listContainer: {
    paddingHorizontal: '5%',
  },
  greetingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: colorTheme.white,
    paddingVertical: '4%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colorTheme.greenText,
  },
  transactionCard: {
    backgroundColor: '#fff',
    padding: '5%',
    marginBottom: '3%',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  transactionId: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusText:{
    color: colorTheme.black,
    fontWeight: '600',
    marginTop: '3%',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: '3%',
  },
  button: {
    backgroundColor: '#7ec479',
    paddingVertical: '4%',
    paddingHorizontal: '6%',
    borderRadius: 5,
    marginRight: '4%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  completedText: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: '3%',
  },
});

export default HomeStoreScreen;
