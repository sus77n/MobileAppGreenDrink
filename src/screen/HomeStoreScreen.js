import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const HomeStoreScreen = () => {
  // Mock data for transactions
  const [transactions, setTransactions] = useState([
    { id: 'T1000001', status: 'Not Received' },
    { id: 'T1000002', status: 'Completed' },
    { id: 'T1000003', status: 'Received' },
  ]);

  // Update the status of a transaction
  const handleTransactionStatus = (transactionId, newStatus) => {
    const updatedTransactions = transactions.map(transaction => {
      if (transaction.id === transactionId) {
        return { ...transaction, status: newStatus };
      }
      return transaction;
    });
    setTransactions(updatedTransactions);
    Alert.alert('Success', `Transaction ${transactionId} marked as ${newStatus}`);
  };

  const renderTransactionItem = ({ item }) => {
    return (
      <View style={styles.transactionCard}>
        <Text style={styles.transactionId}>Transaction ID: {item.id}</Text>
        <Text>Status: {item.status}</Text>
        <View style={styles.buttonContainer}>
          {item.status === 'Not Received' && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleTransactionStatus(item.id, 'Received')}
            >
              <Text style={styles.buttonText}>Mark as Received</Text>
            </TouchableOpacity>
          )}

          {item.status === 'Received' && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleTransactionStatus(item.id, 'Completed')}
            >
              <Text style={styles.buttonText}>Mark as Completed</Text>
            </TouchableOpacity>
          )}

          {item.status === 'Completed' && (
            <Text style={styles.completedText}>Completed</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    paddingHorizontal: '5%', // Percentage-based padding
  },
  transactionCard: {
    backgroundColor: '#fff',
    padding: '5%', // Percentage-based padding
    marginBottom: '3%', // Margin in percentage
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  transactionId: {
    fontSize: '5%', // Responsive font size (percentage)
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: '3%', // Percentage margin
  },
  button: {
    backgroundColor: '#7ec479',
    paddingVertical: '4%', // Vertical padding in percentage
    paddingHorizontal: '6%', // Horizontal padding in percentage
    borderRadius: 5,
    marginRight: '4%', // Right margin in percentage
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  completedText: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: '3%', // Margin in percentage
  },
});

export default HomeStoreScreen;
