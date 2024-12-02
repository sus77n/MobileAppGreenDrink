import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {colorTheme, TopGoBack} from '../component/store';

const ManageTransaction = ({navigation}) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('transactions')
      .orderBy('createdAt', 'desc')
      .onSnapshot(async querySnapshot => {
        const transactionsList = [];
  
        const fetchDrinksPromises = querySnapshot.docs.map(async documentSnapshot => {
          const transactionData = documentSnapshot.data();
          const drinksSnapshot = await firestore()
            .collection('transactions')
            .doc(documentSnapshot.id)
            .collection('drinks')
            .get();
  
          // Convert drinks subcollection to an array
          const drinks = drinksSnapshot.docs.map(drinkDoc => ({
            id: drinkDoc.id,
            ...drinkDoc.data(),
          }));
  
          return {
            id: documentSnapshot.id,
            ...transactionData, 
            drinks,
            amount: `₫${transactionData.price?.toLocaleString()}`,
            priceBeforePromotion: `₫${transactionData.priceBeforePromotion?.toLocaleString()}`,
            date: new Date(transactionData.createdAt.toDate()),
          };
        });
  
        // Wait for all promises to resolve
        const allTransactions = await Promise.all(fetchDrinksPromises);
  
        // Group transactions by month
        const groupedData = [];
        let currentMonth = null;
  
        allTransactions.forEach(transaction => {
          const month = transaction.date.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          });
          if (month !== currentMonth) {
            groupedData.push({type: 'header', month});
            currentMonth = month;
          }
          groupedData.push({type: 'transaction', ...transaction});
        });
  
        setTransactions(groupedData);
      });
    return () => subscriber();
  }, []);
  

  const renderItem = ({item}) => {
    if (item.type === 'header') {
      return <Text style={styles.header}>{item.month}</Text>;
    }

    return (
      <TouchableOpacity
        style={styles.transactionContainer}
        onPress={() =>
          navigation.navigate('ManageTransDetail', {transaction: item})
        }>
        <View style={styles.left}>
          <Text style={styles.description}>{item.type}</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.amount}>{item.amount}</Text>
          <Text style={styles.date}>{item.date.toLocaleString()}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TopGoBack text={'Transaction History'} navigation={navigation} />
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colorTheme.white},
  header: {
    backgroundColor: '#ccc',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colorTheme.white,
  },
  transactionContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colorTheme.grayLine,
  },
  left: {flex: 1},
  right: {alignItems: 'flex-end'},
  description: {fontSize: 14, fontWeight: 'bold', color: colorTheme.black},
  date: {fontSize: 12, color: '#aaa'},
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colorTheme.black,
    marginBottom: 5,
  },
});

export default ManageTransaction;
