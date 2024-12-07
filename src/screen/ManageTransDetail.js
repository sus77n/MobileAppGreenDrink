import React, { useEffect } from "react";
import {Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
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

const { width, height } = Dimensions.get('window');
const scale = size => (width / 375) * size;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.grayBackground,
  },

  cardSection: {
    backgroundColor: colorTheme.darkGrayBackground,
    paddingVertical: scale(15),  // Scaled padding
    margin: scale(17),          // Scaled margin
    borderRadius: scale(10),    // Scaled border radius
  },
  cardTitleWrap: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: scale(15),   // Scaled padding bottom
    paddingLeft: scale(20),     // Scaled padding left
    borderColor: colorTheme.grayLine,
  },
  cardTitle: {
    color: colorTheme.orangeText,
    fontWeight: '700',
    fontSize: scale(20),        // Scaled font size
  },
  iconMember: {},

  cardMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(10),         // Scaled padding
  },

  rewards: {
    paddingLeft: scale(20),     // Scaled padding left
  },

  subTitle: {
    color: colorTheme.grayText,
    fontSize: scale(16),        // Scaled font size
    paddingBottom: scale(7),    // Scaled padding bottom
  },

  rewardWrap: {
    flexDirection: 'row',
  },

  amountReward: {
    color: colorTheme.white,
    fontSize: scale(25),        // Scaled font size
  },

  twenty: {
    color: colorTheme.orangeText,
    fontSize: scale(20),        // Scaled font size
    fontWeight: '700',
  },

  star: {
    marginRight: scale(20),     // Scaled margin right
  },

  amountStars: {
    color: colorTheme.orangeText,
    fontSize: scale(25),        // Scaled font size
    fontWeight: '700',
  },
  
  bar: {
    marginLeft: scale(30),      // Scaled margin left
  },

  note: {
    color: colorTheme.grayText,
    fontSize: scale(12),        // Scaled font size
    marginLeft: scale(30),      // Scaled margin left
    marginTop: scale(10),       // Scaled margin top
  },

  membership: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(20),// Scaled margin horizontal
  },
  membershipDetailWrap: {
    width: scale(180),          // Scaled width
    borderWidth: 1,
    borderRadius: scale(20),    // Scaled border radius
    paddingHorizontal: scale(20), // Scaled padding horizontal
  },
  membershipTitle: {
    fontSize: scale(17),        // Scaled font size
    fontWeight: '500',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  membershipContent: {
    color: colorTheme.black,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default ManageTransDetail;