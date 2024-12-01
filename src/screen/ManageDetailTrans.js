import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox'; // Correct import for CheckBox
import {colorTheme} from '../component/store';

const ManageDetailTrans = ({route}) => {
  const transaction = {
    id: 'T1000001',
    customerName: 'John Doe',
    phoneNumber: '123456789',
    createdAt: '2024-12-01 10:30 AM',
    priceBeforePromotion: 50,
    totalPrice: 45, // after promotion
    drinks: [
      {
        id: '1',
        name: 'Coffee',
        size: 'S',
        sweetness: 'Regular',
        quantity: 2,
        price: 5,
        completed: false,
      },
      {
        id: '2',
        name: 'Tea',
        size: 'M',
        sweetness: 'Less sweet',
        quantity: 1,
        price: 4,
        completed: false,
      },
    ],
  };

  const [drinks, setDrinks] = useState(transaction.drinks); // Get drinks list
  const [totalPrice, setTotalPrice] = useState(transaction.totalPrice); // Store the total price

  const handleDrinkCompletion = drinkId => {
    const updatedDrinks = drinks.map(drink => {
      if (drink.id === drinkId) {
        return {...drink, completed: !drink.completed}; // Toggle completion status
      }
      return drink;
    });
    setDrinks(updatedDrinks);

    // Recalculate total price (if needed, e.g., for completed items or promotions)
    const updatedPrice = updatedDrinks.reduce(
      (acc, drink) => acc + drink.price * drink.quantity,
      0,
    );
    setTotalPrice(updatedPrice);
  };

  const renderDrinkItem = ({item, index}) => {
    return (
      <View style={styles.drinkRow}>
        <View style={styles.drinkInfo}>
          <Text style={styles.drinkName}>
            {item.quantity} x {item.name} - {item.size}
          </Text>
          <Text style={styles.drinkSweetness}>{item.sweetness}</Text>
        </View>
        <View style={styles.priceDrinkContainer}>
          <Text style={styles.drinkPrice}>Amount</Text>
          <Text style={styles.drinkPrice}>đ{item.price}</Text>
        </View>
        <CheckBox
        style={styles.checkbox}
        tintColors={{true: colorTheme.greenBackground, }}
          value={item.completed}
          onValueChange={() => handleDrinkCompletion(item.id)}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Customer Info at the top */}
      <View style={styles.customerCard}>
        <Text style={styles.customerName}>
          Customer: {transaction.customerName}
        </Text>
        <Text>Phone: {transaction.phoneNumber}</Text>
        <Text>Transaction ID: {transaction.id}</Text>
        <Text>Created At: {transaction.createdAt}</Text>
      </View>

      {/* Drink List */}
      <FlatList
        data={drinks}
        renderItem={renderDrinkItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.drinksList}
      />

      {/* Price Information at the bottom */}
      <View style={styles.priceContainer}>
        <View style={styles.rowPrice}>
            <View>
                <Text style={styles.totalText}>Price Before Promotion:</Text>
                <Text style={styles.totalText}>Total Price:</Text>
            </View>
            <View>
                <Text style={styles.totalText}>${transaction.priceBeforePromotion}</Text>
                 <Text style={styles.totalText}>${totalPrice}</Text>
            </View>
        </View>
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() =>
            Alert.alert(
              'Transaction Completed',
              'All drinks are marked as completed',
            )
          }>
          <Text style={styles.completeButtonText}>Complete Transaction</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  customerCard: {
    backgroundColor: '#fff',
    paddingVertical: '5%',
    alignItems: 'center',
    marginBottom: '2%',
    borderBottomWidth: 2,
    borderBottomColor: colorTheme.grayBackground,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colorTheme.greenText,
  },
  drinksList: {
    paddingBottom: '5%',
  },
  drinkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '5%',
    marginBottom: '3%',
    borderRadius: 8,
  },
  drinkInfo: {
    flex: 7
  },
  drinkName: {
    color: colorTheme.black,
    fontWeight: '500',
    fontSize: 16,
  },

  rowPrice:{
    flexDirection:'row',
    justifyContent: 'space-between'
  },
    totalText:{
        color: colorTheme.grayText,
        fontWeight: '600',
        fontSize: 17
    },
  priceDrinkContainer:{
    flex: 2
  },
  checkbox:{
    flex: 1
  },
  priceContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  completeButton: {
    backgroundColor: '#7ec479',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ManageDetailTrans;
