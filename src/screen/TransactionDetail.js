import React, { useState } from "react";
import {   Dimensions,FlatList, StyleSheet, Text, View } from "react-native";
import { colorTheme, LoadingScreen, TopGoBack } from "../component/store";
const TransactionDetail = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    

    const transaction = {
        store: 'Hikari Bình Dương',
        date: '03/11/2024 09:19:19',
        transactionId: '00000001',
        items: [
            { id: '1', name: '1x Aaaaaaaaaaaaaaaaaaa bbbbbb', amount: '₫100,000' },
        ],
        total: '₫100,000',
        paymentMethod: 'Cash',
        starsEarned: 5,
    };

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemAmount}>{item.amount}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <LoadingScreen visible={loading} />
            <TopGoBack text={"Transaction Details"} navigation={navigation} />

            <View style={styles.block}>
                <Text style={styles.header}>Order & Pick-up Purchase</Text>
                <View style={styles.row}>
                    <Text style={styles.text}>Store</Text>
                    <Text style={styles.text}>{transaction.store}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Date & time</Text>
                    <Text style={styles.text}>{transaction.date}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Transaction ID</Text>
                    <Text style={styles.text}>{transaction.transactionId}</Text>
                </View>
            </View>

            {/* Items List */}
            <View style={styles.block}>
                <Text style={styles.title}>Item(s)</Text>
                <FlatList
                    style={styles.list}
                    data={transaction.items}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>

            <View style={styles.block}>
                <View style={styles.row}>
                    <Text style={styles.title}>Total</Text>
                    <Text style={styles.totalAmount}>{transaction.total}</Text>
                </View>
                {/* <View style={styles.row}>
                    <Text style={styles.text}>Payment</Text>
                    <Text style={styles.text}>{transaction.paymentMethod}</Text>
                </View> */}
                <View style={styles.row}>
                    <Text style={styles.text}>Star(s) earned</Text>
                    <Text style={styles.text}>{transaction.starsEarned}</Text>
                </View>
            </View>
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
        fontSize: scale(18),
        fontWeight: 'bold',
        marginBottom: scale(20), 
        color: colorTheme.greenText,
    },
    block: {
        marginBottom: scale(10), 
        borderTopWidth: 1,
        borderTopColor: colorTheme.grayLine,
        paddingHorizontal:scale(20),
        paddingVertical: scale(15),
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: scale(10), 
    },
    text: {
        fontSize: scale(14),
        color: '#666',
    },
    title: {
        fontSize: scale(14),
        fontWeight: 'bold',
        color: '#333',
        marginBottom: scale(10), 
    },
    totalAmount: {
        fontSize: scale(16),
        color: colorTheme.black,
        fontWeight: 'bold',
    },
    list: {
        marginBottom: scale(10), 
    },
});

export default TransactionDetail;