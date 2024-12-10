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
        console.log("stores: ", temp);

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

  const renderItem = ({ item: drink }) => {
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
          <Text style={styles.itemPrice}>đ{drink.price.toLocaleString()}</Text>
        </View>
        <View style={styles.controls}>
          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton} onPress={() => {
              if (drink.quantity > 1) {
                updateDrinkQuantity(drink.key, drink.quantity - 1);
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
              updateDrinkQuantity(drink.key, drink.quantity + 1);
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
      </View>
    );
  };

  const updateBalance = async () => {
    try {
      let starOnOrder = user.stars + order.total / 25000;
      if (starOnOrder === 20) {
        starOnOrder = 0;
      } else if (starOnOrder > 20) {
        starOnOrder -= 20;
      }

      await firestore()
        .collection('customers')
        .doc(user.key)
        .update({
          balance: user.balance - order.total,
          stars: starOnOrder,
          totalStars: user.totalStars + order.total / 25000,
        });
  
      console.log('Update successful');
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

  const handleVoucher = () =>{
    try {
      
    } catch (error) {
      
    }
  }

  const payHandle = async () => {
    try {
      await updateBalance(); // Await ensures errors are caught here
      addTransaction();
      await cleanOrder();
  
      Alert.alert('Enjoy your drink!');
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }]
        });
      }, 1000);
    } catch (error) {
      console.error("Pay failed", error);
      Alert.alert("Pay failed", "Try again");
    }
  };

  const updateDrinkQuantity = (drinkKey, newQuantity) => {
    setListDrinks(prevDrinks => {
      const updatedDrinks = prevDrinks.map(drink =>
        drink.key === drinkKey ? { ...drink, quantity: newQuantity } : drink
      );

      const newTotal = updatedDrinks.reduce(
        (total, drink) => total + drink.quantity * drink.price,
        0
      );

      setOrder(prevOrder => ({ ...prevOrder, drinks: updatedDrinks, total: newTotal }));

      return updatedDrinks;
    });
  };

  if (!order || !stores) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingScreen visible={true} />
      </SafeAreaView>
    )
  }

  const renderVouchers = ({item: voucher}) => {
    return (
      <TouchableOpacity style={styles.voucherCard} onPress={handleVoucher()}>
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
            console.log("st: ", store);
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
            data={user.vouchers}
            renderItem={renderVouchers}
            keyExtractor={item => item.key}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.divider} />

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
  },
  cardSubtitle: {
    color: colorTheme.grayText,
  },
});

export default ReviewOrder;
