import React, { useEffect, useState } from "react";
import {   Dimensions,FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colorTheme, LoadingScreen, TopGoBack } from "../component/store";
import firestore from '@react-native-firebase/firestore';
const TransactionScreen = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);

    const {user} = route.params

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
      

    const renderTransaction = ({ item }) => (
        <TouchableOpacity style={styles.transactionContainer} onPress={() => navigation.navigate("TransactionDetail", { item })}>
            <View style={styles.left}>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.stars}>{item.stars}</Text>
            </View>
            <View style={styles.right}>
                <Text style={styles.amount}>{item.amount}</Text>
                <Text style={styles.date}>{item.date}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <LoadingScreen visible={loading} />
            <TopGoBack text={"Transaction History"} navigation={navigation} />

            <Text style={styles.header}>Nov 2024</Text>

            <FlatList
                data={transactions}
                renderItem={renderTransaction}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    )
}
const { width, height } = Dimensions.get('window');
const scale = size => (width / 375) * size;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.white,
    },
    header: {
        backgroundColor: "#ccc",
        padding: scale(15),
        fontSize: scale(16),
        fontWeight: 'bold',
        color: colorTheme.white,
    },
    listContainer: {
        paddingHorizontal: scale(18), 
    },
    transactionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingVertical: scale(20), 
        borderBottomWidth: 1,
        borderBottomColor: colorTheme.grayLine,
    },
    icon: {
        width: scale(width * 0.15), 
        height: "100%", 
        marginRight: scale(10),
    },
    left: {
        paddingLeft: scale(10),
    },
    right: {
        alignItems: "center",
        paddingRight: scale(10),
    },
    description: {
        fontSize: scale(14),
        fontWeight: 'bold',
        color: colorTheme.black,
        marginBottom: scale(10),
    },
    stars: {
        fontSize: scale(12),
        color: '#666',
    },
    date: {
        fontSize: scale(12),
        color: '#aaa',
    },
    amount: {
        fontSize: scale(14),
        fontWeight: 'bold',
        color: colorTheme.black,
        marginBottom: scale(10),
    },
});

export default TransactionScreen;