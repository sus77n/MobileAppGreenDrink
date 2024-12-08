import React, {useEffect, useState} from 'react';
import {Dimensions,FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
  
          return {
            id: documentSnapshot.id,
            ...transactionData, 
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

const { width, height } = Dimensions.get('window');
const scale = size => (width / 375) * size;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.white,
  },
  header: {
    backgroundColor: '#ccc',
    padding: scale(10), // Scaled padding
    fontSize: scale(16), // Scaled font size
    fontWeight: 'bold',
    color: colorTheme.white,
  },
  transactionContainer: {
    marginHorizontal: scale(20), // Scaled margin
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(15), // Scaled vertical padding
    borderBottomWidth: 1,
    borderBottomColor: colorTheme.grayLine,
  },
  left: {
    flex: 1,
  },
  right: {
    alignItems: 'flex-end',
  },
  description: {
    fontSize: scale(14), // Scaled font size
    fontWeight: 'bold',
    color: colorTheme.black,
  },
  date: {
    fontSize: scale(12), // Scaled font size
    color: '#aaa',
  },
  amount: {
    fontSize: scale(14), // Scaled font size
    fontWeight: 'bold',
    color: colorTheme.black,
    marginBottom: scale(5), // Scaled margin
  },
});


export default ManageTransaction;
