import React, { useEffect, useState } from "react";
import { Dimensions,FlatList, StyleSheet, Text, View } from "react-native";
import { colorTheme, TopGoBack } from "../../component/store";
import { getFirestore } from "@react-native-firebase/firestore";
const ManageTransDetail = ({ navigation, route }) => {
    const {transaction} = route.params
    const [user, setUser] = useState({})
   
    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <View>
            <Text style={styles.itemName}>{item.quantity} x {item.name} - {item.custom.size}</Text>
            <Text style={{marginLeft: 22,}}>{item.custom.sweetness}</Text>
            </View>
            <Text style={styles.itemAmount}>{item.price}</Text>
        </View>
    );

    useEffect(() => {
      const fetchCustomer = async () => {
        try {
          const documentSnapshot = await getFirestore()
            .collection('customers')
            .doc(transaction.customerID)
            .get();
          if (documentSnapshot.exists) {
            const data = documentSnapshot.data();
            setUser(data);
          } else {
            console.log('No such document!');
          }
        } catch {
          console.error('Error fetching user data:', error);
        }
      };
      fetchCustomer()
    }, []);

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
                    <Text style={styles.text}>Customer name:</Text>
                    <Text style={styles.text}>{user.username}</Text>
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
        marginBottom: scale(18),
        color: colorTheme.greenText,
    },
    block: {
        marginBottom: scale(10), 
        borderTopWidth: 1,
        borderTopColor: colorTheme.grayLine,
        padding: scale(20), 
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
        marginBottom: scale(15), 
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

export default ManageTransDetail;