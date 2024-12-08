import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,  Dimensions,
} from 'react-native';
import { colorTheme, LoadingScreen, PayInStoreTop, resetUserAfterChange } from '../component/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore, { getFirestore } from '@react-native-firebase/firestore';

const ReviewOrder = ({ navigation, route }) => {
  const { order, total, user } = route.params;
  const [drinkDetails, setDrinkDetails] = useState({});
  const [quantities, setQuantities] = useState({});
  const [listDrinks, setListDrinks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch drink details from Firestore
  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const drinkKeys = Object.keys(order.drinks); // Get all the drink keys from order.drinks
        const drinksData = []; // Array to store the drink details

        // Create a batch of async operations to fetch drinks in parallel
        const drinkFetchPromises = drinkKeys.map(async (drinkKey) => {
          const drinkData = order.drinks[drinkKey]; // Get the drink object using the key

          // Fetch the drink details from the Firestore 'drinks' collection
          const doc = await firestore().collection('drinks').doc(drinkData.key).get();

          if (doc.exists) {
            const drinkDetails = doc.data();
            drinksData.push({
              key: drinkData.key, // Use the key from order
              name: drinkDetails.name,
              price: drinkDetails.price,
              quantity: drinkData.quantity || 1, // Default to 1 if quantity is not set
              custom: drinkData.custom, // Customization details
            });
            console.log("each item: " + drinkData.key + drinkDetails.name);

          } else {
            console.warn(`Drink with key ${drinkData.key} not found in Firestore.`);
          }
        });

        // Wait for all the drink fetch promises to resolve
        await Promise.all(drinkFetchPromises);
        console.log("drinks data" + drinksData);
        // Update the state with the fetched data
        setListDrinks(drinksData);
      } catch (error) {
        console.error('Error fetching drinks from Firestore:', error);
      }
    };

    fetchDrinks(); // Call the function to fetch drinks
  }, [order.drinks]);


  // Update quantity for a specific drink
  const updateQuantity = (key, increment) => {
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.max(1, (prev[key] || 1) + increment),
    }));
  };

  useEffect(() => {
    console.log('order list:', order.drinks); // Logs the full array
  }, []);

  const renderItem = ({ item: drink }) => {
    // const details = drinkDetails[drink.key];
    // if (!details) return null;

    return (
      <View>
        <LoadingScreen visible={loading} />
        <View style={styles.itemContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.itemName}>
              {drink.name} - {drink.custom.size}
            </Text>
            <Text style={styles.itemDetails}>Sweetness: {drink.custom.sweetness}</Text>
          </View>
          <Text style={styles.itemPrice}>đ{drink.price.toLocaleString()}</Text>
        </View>
        <View style={styles.controls}>
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => { }}>
              <Icon
                name="minus-circle"
                color={colorTheme.greenBackground}
                size={25}
              />
            </TouchableOpacity>
            <Text style={styles.quantity}>{drink.quantity}</Text>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => { }}>
              <Icon
                name="plus-circle"
                color={colorTheme.greenBackground}
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.totalPrice}>
              đ{(drink.price * drink.quantity).toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const updateBalance = () => {
    try {
      getFirestore().collection("customers").doc(user.key)
        .update(
          {
            balance: user.balance - total,
            stars: user.stars + total / 20000,
            totalStars: user.totalStars + total / 20000,
          }
        )
      // .then(() => {
      //     Alert.alert('Success', 'User updated successfully');
      //     navigation.navigate('Home');
      // })
      resetUserAfterChange(user.key)
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error('Error updating user:', error.massage);
    }
  }
  const addTransaction = async () => {
    try {
      const db = firestore();

      // Create the transaction document
      const newTransaction = {
        customerID: user.key,  // Provided customerID
        createdAt: new Date(),  // Set the current timestamp
        drinks: listDrinks,  // Drink details as shown in the screenshot
        status: "Uncompleted",  // Example status, adjust as necessary
        transID: `T${new Date().getTime()}`,  // Unique transaction ID based on the timestamp
        type: "OrderPickUp",  // Example type, adjust as necessary
        price: total,  // Price from the drink details
        priceBeforePromotion: total  // Price before promotion
      };

      // Adding the new document to the transactions collection
      await db.collection('transactions').add(newTransaction);
      console.log("Transaction added successfully.");
    } catch (e) {
      console.error("Error adding transaction: ", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <PayInStoreTop navigation={navigation} text={'Review Order'} />
      <View style={styles.typeSection}>
        <View style={styles.leftTypeSection}>
          <Text style={styles.title}>Pick-up at</Text>
          <Text style={styles.subtitle}>Hikari</Text>
        </View>
        <Icon
          name="angle-down"
          style={styles.iconArrow}
          size={30}
          color={'black'}
        />
      </View>
      <View style={styles.itemSection}>
        <Text style={styles.header}>Order items</Text>

        <FlatList
          data={listDrinks}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />

        {/* Divider */}
        <View style={styles.divider} />

        {/* Order Total */}
        <View style={styles.totalContainer}>
          <Text style={styles.orderTotalLabel}>Order total:</Text>
          <Text style={styles.orderTotalValue}>
            đ{total.toLocaleString()}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.cardButton} onPress={() =>
        Alert.alert('', 'Are you sure to pay ?', [
          {
            text: "Ok",
            onPress: () => {
              updateBalance()
              addTransaction()
              Alert.alert("Enjoy your drink!")
              navigation.popToTop()
            }
          },
          {
            text: "Cancel",
            onPress: () => console.log('Cancel Pressed')
          }
        ])
      }>
        <Text style={styles.cardButtonText}>Pay</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const { width, height } = Dimensions.get('window');
const scale = size => (width / 375) * size;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorTheme.white,
    flex: 1,
  },
  typeSection: {
    backgroundColor: colorTheme.grayBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingVertical: scale(20),
    margin: scale(15),
    marginBottom: scale(0),
    borderRadius: scale(15),
  },
  title: {
    fontSize: scale(17),
    marginBottom: scale(10),
  },
  subtitle: {
    fontSize: scale(20),
    color: colorTheme.black,
    fontWeight: '600',
  },
  iconArrow: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: scale(20),
  },
  itemSection: {
    backgroundColor: '#fff',
    padding: scale(20),
  },
  header: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginBottom: scale(15),
    color: colorTheme.black,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  infoContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: scale(14),
    fontWeight: 'bold',
    color: '#333',
  },
  itemDetails: {
    fontSize: scale(12),
    color: '#666',
    marginVertical: scale(5),
  },
  itemPrice: {
    fontSize: scale(14),
    color: '#333',
  },
  totalPrice: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: scale(35),
    marginBottom: scale(15),
  },
  quantity: {
    fontSize: scale(16),
    fontWeight: 'bold',
    marginHorizontal: scale(10),
  },
  divider: {
    height: scale(1),
    backgroundColor: '#ddd',
    marginVertical: scale(15),
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderTotalLabel: {
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  orderTotalValue: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#333',
  },
  reorderButton: {
    backgroundColor: colorTheme.white,
    paddingVertical: scale(7),
    width: scale(80),
    borderRadius: scale(25),
    borderWidth: scale(1),
    borderColor: colorTheme.greenBackground,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: scale(20),
  },
  reorderButtonText: {
    fontSize: scale(14),
    color: colorTheme.greenBackground,
    fontWeight: 'bold',
  },
  cardButton: {
    position: 'absolute',
    width: scale(170),
    backgroundColor: '#7ec479',
    paddingVertical: scale(15),
    paddingHorizontal: scale(20),
    borderRadius: scale(25),
    bottom: scale(10),
    right: scale(20),
  },
  cardButtonText: {
    fontSize: scale(16),
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


export default ReviewOrder;
