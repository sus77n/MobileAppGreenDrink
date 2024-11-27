import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colorTheme } from "../component/store";
const TransactionScreen = ({ navigation }) => {

    const transactions = [
        {
            id: '1',
            description: 'Order & Pick-up Purchase',
            stars: '5 star(s) earned',
            amount: '₫100,000',
            date: '01/11/2024 15:00',
            icon: 'https://img.icons8.com/ios/50/touchscreen.png', // Example icon URL
        },
        {
            id: '2',
            description: 'Order & Pick-up Purchase',
            stars: '5 star(s) earned',
            amount: '₫100,000',
            date: '01/11/2024 15:00',
            icon: 'https://img.icons8.com/ios/50/touchscreen.png', // Example icon URL
        },
    ];

    const renderTransaction = ({ item }) => (
        <TouchableOpacity style={styles.transactionContainer} onPress={() => navigation.navigate("TransactionDetail", { item })}>
            <Image source={{ uri: item.icon }} style={styles.icon} />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.white,
    },
    header: {
        backgroundColor: "#ccc",
        padding: "2%",
        fontSize: 16,
        fontWeight: 'bold',
        color: colorTheme.white,
    },
    listContainer: {
        paddingHorizontal: "5%",
    },
    transactionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: "4%",
        borderBottomWidth: 1,
        borderBottomColor: colorTheme.grayLine,
    },
    icon: {
        width: "15%",
        height: "100%",
        marginRight: 10,
    },
    left: {
        flex: 1,
    },
    right: {
        alignItems: "center",
    },
    description: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colorTheme.black,
    },
    stars: {
        fontSize: 12,
        color: '#666',
    },
    date: {
        fontSize: 12,
        color: '#aaa',
    },
    amount: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colorTheme.black,
        marginBottom: "3%"
    },
});
export default TransactionScreen;