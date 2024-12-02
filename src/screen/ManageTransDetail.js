import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { colorTheme, TopGoBack } from "../component/store";
const ManageTransDetail = ({ navigation, route }) => {
    const {transaction} = route.params
   
    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <View>
            <Text style={styles.itemName}>{item.quantity} x {item.name} - {item.custom.size}</Text>
            <Text style={{marginLeft: 22,}}>{item.custom.sweetness}</Text>
            </View>
            <Text style={styles.itemAmount}>{item.price}</Text>
        </View>
    );

    useEffect(() =>{
        ;
    },[])

    return (
        <View style={styles.container}>
            <TopGoBack text={"Transaction Details"} navigation={navigation} />

            <View style={styles.block}>
                <Text style={styles.header}>{transaction.type}</Text>
                <View style={styles.row}>
                    <Text style={styles.text}>Transaction ID</Text>
                    <Text style={styles.text}>{transaction.transID}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Store</Text>
                    <Text style={styles.text}></Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Date & time</Text>
                    <Text style={styles.text}>{transaction.date.toLocaleString()}</Text>
                </View>
                
            </View>

            {/* Items List */}
            <View style={styles.block}>
                <Text style={styles.title}>Item(s)</Text>
                <FlatList
                    style={styles.list}
                    data={transaction.drinks}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.name}
                />
            </View>

            <View style={styles.block}>
            <View style={styles.row}>
                    <Text style={styles.text}>Price before promotion</Text>
                    <Text style={styles.text}>{transaction.priceBeforePromotion}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.title}>Total</Text>
                    <Text style={styles.totalAmount}>{transaction.amount}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Payment</Text>
                    <Text style={styles.text}>{transaction.paymentMethod}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.white,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: "4%",
        color: colorTheme.greenText,
    },
    block: {
        marginBottom: "4%",
        borderTopWidth: 1,
        borderTopColor: colorTheme.grayLine,
        padding: "4%"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "3%"
    },
    text: {
        fontSize: 14,
        color: '#666',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: "4%",
    },
    totalAmount: {
        fontSize: 16,
        color: colorTheme.black,
        fontWeight: 'bold',
    },
    list: {
        marginBottom: "5%"
    },
});
export default ManageTransDetail;