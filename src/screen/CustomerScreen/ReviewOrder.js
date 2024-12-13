import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {
  colorTheme,
  LoadingScreen,
  TopGoBack,
  resetUserAfterChange,
  getOrder,
  cleanOrder,
} from '../../component/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore, { getFirestore } from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';

const ReviewOrder = ({ navigation, route }) => {
  const { user } = route.params;
  const [listDrinks, setListDrinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [stores, setStores] = useState([]);
  const [selectedStores, setSelectedStores] = useState("Chose a store");
  const [vouchers, setVouchers] = useState(user.vouchers); 
  const fetchOrder = async () => {
    setLoading(true);
    try {
      const order = await getOrder();
      setOrder(order);
      setListDrinks(order.drinks);
    } catch (error) {
      console.error("Error fetch order: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadScreen = navigation.addListener("focus", () => { fetchOrder() });

    const unsubscribeStores = getFirestore()
      .collection("storeLocations")
      .onSnapshot((response) => {
        const temp = response.docs.map((doc) => ({
          ...doc.data(),
          key: doc.id
        }));
        setStores(temp);
        setLoading(false);
      }, (error) => {
        console.error("Error fetching stores: ", error);
        setLoading(false);
      });

    return () => {
      loadScreen()
      unsubscribeStores()
    };
  }, []);

  const renderItem = ({ item: drink, index }) => {
    return (
      <View>
        <View style={styles.itemContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.itemName}>
              {drink.name} - {drink.customization.size}
            </Text>
            <Text style={styles.itemDetails}>
              Sweetness: {drink.customization.sweetness}
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.itemPrice}>đ{drink.price.toLocaleString()}</Text>
            {drink.isFree && (
            <Text style={styles.originalPrice}>
              đ{drink.originalPrice.toLocaleString()}
            </Text>
          )}
          </View>
        </View>
        {!drink.isFree && (
          <View style={styles.controls}>
          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton} onPress={() => {
              if (drink.quantity > 1) {
                updateDrinkQuantity(index, drink.quantity - 1);
              } else {
                Alert.alert("Cancel this order", "Do you want to remove this drink from the order",
                  [
                    { text: 'No', style: 'cancel', onPress: () => { } },
                    {
                      text: 'Yes',
                      style: 'destructive',
                      onPress: () => {
                        deleteDrinkHandle(index)
                      }
                    },
                  ])
              }
            }}>
              <Icon
                name="minus-circle"
                color={colorTheme.greenBackground}
                size={scale(30)}
              />
            </TouchableOpacity>
            <Text style={styles.quantity}>{drink.quantity}</Text>
            <TouchableOpacity style={styles.controlButton} onPress={() => {
              updateDrinkQuantity(index, drink.quantity + 1);
            }}>
              <Icon
                name="plus-circle"
                color={colorTheme.greenBackground}
                size={scale(30)}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.totalPrice}>
              đ{(drink.price * drink.quantity).toLocaleString()}
            </Text>
          </View>
        </View>
          )}
      </View>
    );
  };

  const updateBalance = async () => {
    try {
      let starOnOrder = user.stars + order.total / 25000;
      let addVoucher = false;
      
      console.log("star on order: " + starOnOrder);
      
      if (starOnOrder >= 20) {
        starOnOrder -= 20; // Reset stars after reaching 20
        addVoucher = true; // Indicate that a new voucher should be added
      }
  
      const updatedData = {
        balance: user.balance - order.total,
        stars: starOnOrder,
        totalStars: user.totalStars + order.total / 25000,
      };
  
      const customerRef = firestore().collection('customers').doc(user.key);
      
      // Fetch the existing customer data to get the vouchers array
      const doc = await customerRef.get();
      const customerData = doc.data();
      const existingVouchers = customerData.vouchers || []; // Ensure vouchers is an array, defaulting to an empty array
  
      // Add a new voucher if addVoucher is true
      if (addVoucher) {
        console.log('Running add voucher...');
        
        const newVoucher = {
          id: 'FreeDrink',
          content: 'You have 1 drink free',
          isApplied: false,
        };
  
        // Push the new voucher into the existing vouchers array
        existingVouchers.push(newVoucher);
  
        // Update the customer document with the new vouchers array and other updated data
        await customerRef.update({
          ...updatedData,
          vouchers: existingVouchers, // Update the vouchers array with the new voucher
        });
  
        console.log('Voucher added successfully');
      } else {
        // Just update user data without adding a voucher
        await customerRef.update(updatedData);
        console.log('Updated without adding voucher');
      }
  
      // Proceed with any other actions (like resetting user data, etc.)
      await resetUserAfterChange(user.key);
    } catch (error) {
      console.error('Error updating user:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
      throw error;
    }
  };
  
  
  
  

  const addTransaction = async () => {
    try {
      const db = firestore();
      const newTransaction = {
        customerID: user.key,
        createdAt: new Date(),
        drinks: listDrinks,
        status: 'Uncompleted',
        transID: `T${new Date().getTime()}`,
        type: order.type,
        price: order.total,
        priceBeforePromotion: order.total,
        store: selectedStores
      };

      await db.collection('transactions').add(newTransaction);
      console.log('Transaction added successfully.');
    } catch (e) {
      console.error('Error adding transaction: ', e);
    }
  };

  const handleVoucher = async (voucherID) => {
    try {
      const updatedVouchers = [...vouchers].flat();
      
      for (let i = 0; i < updatedVouchers.length; i++) {
        console.log("voucher [i]", i, JSON.stringify(updatedVouchers[i]));
      }
      let foundVoucher = false;
      for (let i = 0; i < updatedVouchers.length; i++) {
        console.log("voucher [i]"+ JSON.stringify(updatedVouchers[i]) + i);
        
        if (updatedVouchers[i].id === voucherID && !updatedVouchers[i].isApplied) {
          updatedVouchers[i] = {
            ...updatedVouchers[i],
            isApplied: true,
          };
          foundVoucher = true;
          break; 
        }
      }
  
      if (!foundVoucher) {
        Alert.alert("Voucher Error", "Voucher already applied or not found.");
        return;
      }
  
      // Apply the voucher logic (e.g., FreeDrink)
      if (voucherID === "FreeDrink") {
        const updatedDrinks = [...listDrinks];
        let isApplied = false;
  
        for (let i = 0; i < updatedDrinks.length; i++) {
          if (!updatedDrinks[i].isFree && !isApplied) {
            updatedDrinks[i] = {
              ...updatedDrinks[i],
              originalPrice: updatedDrinks[i].price,
              price: 0,
              isFree: true,
            };
            isApplied = true;
          }
        }
  
        if (isApplied) {
          const totalBeforePromotion = updatedDrinks.reduce(
            (total, drink) =>
              total + (drink.originalPrice || drink.price) * drink.quantity,
            0
          );
  
          const newTotal = updatedDrinks.reduce(
            (total, drink) => total + drink.price * drink.quantity,
            0
          );
  
          // Update local drinks and order
          setListDrinks(updatedDrinks);
          setOrder((prevOrder) => ({
            ...prevOrder,
            drinks: updatedDrinks,
            total: newTotal,
            totalBeforePromotion: totalBeforePromotion,
          }));
  
          // Update local vouchers
          setVouchers(updatedVouchers);
  
          console.log("Voucher applied locally:", updatedVouchers);
          Alert.alert("Voucher Applied", "One drink is free!");
        } else {
          Alert.alert(
            "No eligible drinks",
            "All drinks already have a voucher applied."
          );
        }
      } else {
        Alert.alert("Invalid Voucher", "This voucher is not supported yet.");
      }
    } catch (error) {
      console.error("Error applying voucher: ", error);
      Alert.alert("Error", "Something went wrong while applying the voucher.");
    }
  };
  
  

  const payHandle = async () => {
    try {
      await updateBalance();
      await addTransaction();
  
      const updatedVouchers = vouchers.filter(voucher => !voucher.isApplied);

      await firestore()
        .collection("customers")
        .doc(user.key)
         .update({ vouchers: updatedVouchers });
  
      console.log("Vouchers updated in Firestore:", vouchers);
  
      // Clean the order
      await cleanOrder();
  
      Alert.alert("Enjoy your drink!");
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }, 1000);
      resetUserAfterChange();
    } catch (error) {
      console.error("Pay failed", error);
      Alert.alert("Pay failed", "Try again");
    }
  };
  
  
  
  const updateDrinkQuantity = (drinkIndex, newQuantity) => {
    setListDrinks(prevDrinks => {
      const updatedDrinks = prevDrinks.map((drink, index) =>
        index === drinkIndex ? { ...drink, quantity: newQuantity } : drink
      );

      const newTotal = updatedDrinks.reduce(
        (total, drink) => total + drink.quantity * drink.price,
        0
      );

      setOrder(prevOrder => ({ ...prevOrder, drinks: updatedDrinks, total: newTotal }));

      return updatedDrinks;
    });
  };

  const deleteDrinkHandle = (removeIndex) => {
    const newList = listDrinks.filter((drink, index) => index !== removeIndex);
    const newTotal = newList.reduce(
      (total, drink) => total + drink.quantity * drink.price,
      0
    );
    setOrder(prevOrder => ({ ...prevOrder, drinks: newList, total: newTotal }));
    setListDrinks(newList);
  };

  if (!order || !stores) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingScreen visible={true} />
      </SafeAreaView>
    )
  }

  const renderVouchers = ({ item: voucher }) => {
    if (!voucher.isApplied) {
      return (
        <TouchableOpacity
          style={styles.voucherCard}
          onPress={() => handleVoucher(voucher.id)}
        >
          <Image
            source={require('../../../assets/img/voucherIcon.png')}
            style={styles.voucherIcon}
          />
          <View style={styles.cardTitleWrap}>
            <Text style={styles.cardTitle}>{voucher.content}</Text>
            <Text style={styles.cardSubtitle}>Add it before pay</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return null; // Do not render anything if `isApplied` is true
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <LoadingScreen visible={loading} />
      <TopGoBack navigation={navigation} text={'Review Order'} />
      <View style={styles.typeSection}>
        <Text style={styles.title}>Pick-up at</Text>
        <Picker style={styles.picker}
          selectedValue={selectedStores}
          onValueChange={(value) => setSelectedStores(value)}>
          {stores.map(store => {
            return (
              <Picker.Item label={store.name} value={store.name} />
            )
          })}
        </Picker>
      </View>
      <View style={styles.itemSection}>
        <Text style={styles.header}>Order items</Text>
        <FlatList
          data={listDrinks}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.divider} />
        <View style={styles.voucherMain}>
          <FlatList
            data={vouchers}
            renderItem={renderVouchers}
            keyExtractor={item => item.key}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.divider} />

        <View style={styles.totalContainer}>
          <Text style={styles.itemDetails}>Total before promotion:</Text>
          <Text style={styles.originalPrice}>{order.totalBeforePromotion ? order.totalBeforePromotion.toLocaleString() : order.total.toLocaleString()} VND</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.orderTotalLabel}>Order total:</Text>
          <Text style={styles.orderTotalValue}>{order.total.toLocaleString()} VND</Text>
        </View>

        <TouchableOpacity
          style={styles.cardButton}
          onPress={() =>
            Alert.alert('', 'Are you sure to pay ?', [
              {
                text: 'Ok',
                onPress: () => {
                  if (user.balance >= order.total) {
                    payHandle();
                  } else {
                    Alert.alert('Not enough money');
                  }
                },
              },
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
              },
            ])
          }>
          <Text style={styles.cardButtonText}>Pay</Text>
        </TouchableOpacity>
      </View>


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
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
    margin: scale(15),
    marginBottom: scale(0),
    borderRadius: scale(15),
  },
  title: {
    fontSize: scale(17),
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
    flex: 1,
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
  priceContainer:{
    alignItems: 'flex-end'
  },
  originalPrice:{
    textDecorationLine:'line-through',
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
    fontSize: scale(18),
    fontWeight: 'bold',
    marginHorizontal: scale(10),
  },
  divider: {
    height: scale(1),
    backgroundColor: '#ddd',
    marginVertical: scale(8),
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
  cardButton: {
    width: scale(170),
    backgroundColor: '#7ec479',
    paddingVertical: scale(15),
    paddingHorizontal: scale(20),
    borderRadius: scale(25),
    top: scale(10),
    alignSelf: 'flex-end'
  },
  cardButtonText: {
    fontSize: scale(16),
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    backgroundColor: colorTheme.white,
    marginVertical: scale(10),
    borderRadius: scale(50)
  },

  voucherMain: {
    backgroundColor: colorTheme.greenBackgroundDrink,
    flexDirection: 'row',
    padding: scale(10),
    borderRadius: scale(10),
  },

  voucherCard: {
    backgroundColor: colorTheme.white,
    padding: scale(5),
    borderRadius: scale(10),
    flexDirection: 'row',
    width: scale(240),
    alignItems: 'center',
    marginRight: scale(15),
  },

  voucherSection: {
    paddingHorizontal: scale(15),
  },

  voucherTitle: {
    fontWeight: '700',
    fontSize: scale(20),
    marginBottom: scale(10),
  },


  voucherIcon: {
    marginTop: scale(10),
    marginLeft: scale(5),
    marginRight: scale(10),
  },

  cardTitleWrap: {
    width: scale(150),
  },

  cardTitle: {
    color: colorTheme.black,
    fontWeight: '600',
    fontSize: scale(13)
  },
  cardSubtitle: {
    color: colorTheme.grayText,
    fontSize: scale(10)
  },
});

export default ReviewOrder;
