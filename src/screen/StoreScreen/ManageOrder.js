import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Dimensions,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox'; // Correct import for CheckBox
import {colorTheme, TopGoBack} from '../../component/store';
import {getFirestore} from '@react-native-firebase/firestore';

const ManageOrder = ({navigation, route}) => {
  const {transaction} = route.params;

  const [drinks, setDrinks] = useState(transaction.drinks); // Get drinks list
  const [user, setUser] = useState({});
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
            {item.quantity} x {item.name} - {item.custom.size}
          </Text>
          <Text style={styles.drinkSweetness}>
            Sweetness: {item.custom.sweetness}
          </Text>
        </View>
        <View style={styles.priceDrinkContainer}>
          <Text style={styles.drinkPrice}>đ{item.price.toLocaleString()}</Text>
          <Text style={styles.totalPrice}>
            đ{(item.price * item.quantity).toLocaleString()}
          </Text>
        </View>
        {/* <CheckBox
        style={styles.checkbox}
        tintColors={{true: colorTheme.greenBackground, }}
          value={item.completed}
          onValueChange={() => handleDrinkCompletion(item.id)}
        /> */}
      </View>
    );
  };

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
  const formattedDate = transaction.createdAt
  ? transaction.createdAt.toDate().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
  })
  : "N/A";

  return (
    <SafeAreaView style={styles.container}>
      <TopGoBack navigation={navigation} text={transaction.id} />
      {/* Customer Info at the top */}
      <View style={styles.customerCard}>
        <Text style={styles.customerName}>Customer: {user.formOfAddress} {user.username}</Text>
        <Text style={styles.transInfor}>Phone: {user.phone}</Text>
        <Text style={styles.transInfor}>Transaction ID: {transaction.transID}</Text>
        <Text>Created At: {formattedDate}</Text>
      </View>

      {/* Drink List */}
      <FlatList
        data={drinks}
        renderItem={renderDrinkItem}
        // keyExtractor={({item}) => item.key}
        contentContainerStyle={styles.drinksList}
      />

      {/* Price Information at the bottom */}
      <View style={styles.priceContainer}>
        <View style={styles.rowPrice}>
          <View>
            <Text style={styles.totalText}>Price Before Promotion:</Text>
            <Text style={[styles.totalText, {color: 'black', marginTop: scale(10)}]}>Total Price:</Text>
          </View>
          <View>
            <Text style={styles.totalText}>
              đ{transaction.priceBeforePromotion.toLocaleString()}
            </Text>
            <Text style={[styles.totalText, {color: 'black', marginTop: scale(10)}]}>
              đ{transaction.price.toLocaleString()}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => {
            Alert.alert('Transaction Completed');
            navigation.goback();
          }}>
          <Text style={styles.completeButtonText}>Complete Transaction</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const {width, height} = Dimensions.get('window');
const scale = size => (width / 375) * size;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  customerCard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: scale(10),
    paddingBottom: scale(20),
    borderBottomWidth: scale(2),
    borderBottomColor: colorTheme.grayBackground,
  },
  customerName: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: colorTheme.greenText,
    marginBottom: scale(15),
  },
  transInfor:{
    marginBottom: scale(7)
  },
  drinksList: {
    paddingBottom: scale(20),
  },
  drinkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'top',
    paddingVertical: scale(20),
    paddingHorizontal: scale(20),
    marginBottom: scale(12),
    borderRadius: scale(8),
  },
  drinkName: {
    color: colorTheme.black,
    fontWeight: '500',
    fontSize: scale(16),
  },
  priceDrinkContainer: {
    textAlign: 'right',
  },
  drinkPrice: {
    color: colorTheme.black,
    fontWeight: '500',
    textAlign: 'right',
  },
  totalPrice: {
    textAlign: 'right',
  },
  rowPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    color: colorTheme.grayText,
    fontWeight: '600',
    fontSize: scale(17),
  },
  priceContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: scale(20),
    borderTopWidth: scale(1),
    borderTopColor: '#ddd',
  },
  completeButton: {
    backgroundColor: colorTheme.greenBackground,
    paddingVertical: scale(15),
    borderRadius: scale(8),
    marginTop: scale(15),
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ManageOrder;
