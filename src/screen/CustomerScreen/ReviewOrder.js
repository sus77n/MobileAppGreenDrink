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
} from '../../component/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore, { getFirestore } from '@react-native-firebase/firestore';

const ReviewOrder = ({ navigation, route }) => {
  const { user } = route.params;
  const [listDrinks, setListDrinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

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
    return () => { loadScreen() };
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
            <TouchableOpacity style={styles.controlButton} onPress={() => { }}>
              <Icon
                name="minus-circle"
                color={colorTheme.greenBackground}
                size={25}
              />
            </TouchableOpacity>
            <Text style={styles.quantity}>{drink.quantity}</Text>
            <TouchableOpacity style={styles.controlButton} onPress={() => { }}>
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
      const starOnOrder = user.stars + order.total / 25000;
      
      if (starOnOrder == 20) {
        starOnOrder = 0;
      } else if (starOnOrder > 20) {
        starOnOrder = starOnOrder - 20;
      }

      firestore()
        .collection('customers')
        .doc(user.key)
        .update({
          balance: user.balance - order.total,
          stars: starOnOrder,
          totalStars: user.totalStars + order.total / 25000,
        })
      .then(() => {
        console.log('Update successful');
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
      });

      resetUserAfterChange(user.key);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error('Error updating user:', error);
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
      };

      await db.collection('transactions').add(newTransaction);
      console.log('Transaction added successfully.');
    } catch (e) {
      console.error('Error adding transaction: ', e);
    }
  };

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingScreen visible={true} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <LoadingScreen visible={loading} />
      <TopGoBack navigation={navigation} text={'Review Order'} />
      <View style={styles.typeSection}>
        <View>
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
          keyExtractor={item => item.key}
        />

        <View style={styles.divider} />

        <View style={styles.totalContainer}>
          <Text style={styles.orderTotalLabel}>Order total:</Text>
          <Text style={styles.orderTotalValue}>đ{order.total.toLocaleString()}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.cardButton}
        onPress={() =>
          Alert.alert('', 'Are you sure to pay ?', [
            {
              text: 'Ok',
              onPress: () => {
                if (user.balance >= order.total) {
                  updateBalance();
                  addTransaction();
                  Alert.alert('Enjoy your drink!');
                  navigation.popToTop();
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
