import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,  Dimensions,
} from 'react-native';
import { colorTheme, getUser, LoadingScreen } from '../../component/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

const ProductDetail = ({ navigation, route }) => {
  const { drink, user, order, totalCurrent, keyOrder } = route.params;
  const [selectedSize, setSelectedSize] = useState('S');
  const [sweetness, setSweetness] = useState('Regular');
  const [listOrder, setListOrder] = useState(order.drinks);
  const [total, setTotal] = useState(totalCurrent);
  const [loading, setLoading] = useState(false);

  const calculateTotal = async (drinks) => {
    let newTotal = 0;

    const drinkKeys = Object.keys(drinks);

    for (const i of drinkKeys) {
      const drinkData = drinks[i];
      const { key, quantity } = drinkData;
      try {
        const drinkSnapshot = await firestore()
          .collection('drinks')
          .doc(key)
          .get();
        if (drinkSnapshot.exists) {
          const drinkInfo = drinkSnapshot.data();
          const basePrice = drinkInfo.price || 0;
          newTotal += basePrice * quantity;
        }
      } catch (error) {
        console.error(`Error fetching drink data for ${key}:`, error);
      }
    }
    console.log('New total calculated:', newTotal);
    setTotal(newTotal);
  };
  useEffect(() => {
    console.log('Total:', total);
  }, [total]);

  useEffect(() => {
    if (listOrder) {
      calculateTotal(listOrder);
    }
    console.log(order);
    
  }, [listOrder]);

  const generateDrinkKey = (drinkId, customization) => {
    const customizationString = JSON.stringify(customization);
    const base64Key = btoa(`${drinkId}_${customizationString}`);
    return base64Key;
  };

  const addOrUpdateDrinkWithCheck = async (
    orderId,
    drinkId,
    customization,
    quantity,
  ) => {
    console.log(orderId);

    try {
      const drinkKey = generateDrinkKey(drinkId, customization);

      // Reference the specific order document
      const orderRef = firestore().collection('orders').doc(orderId);
      const orderSnapshot = await orderRef.get();

      if (orderSnapshot.exists) {
        const orderData = orderSnapshot.data();
        const existingDrink = orderData.drinks?.[drinkKey];

        if (existingDrink) {
          // If the drink already exists, update the quantity
          existingDrink.quantity += quantity;
          await orderRef.update({
            [`drinks.${drinkKey}`]: existingDrink,
          });
          console.log('Drink quantity updated!');
          // Re-fetch the updated order data to update the state
          const updatedOrderSnapshot = await orderRef.get();
          const updatedOrderData = updatedOrderSnapshot.data();

          setListOrder(updatedOrderData.drinks); // Update listOrder state
          console.log("updatedDrinks" + updatedOrderData.drinks);

          await calculateTotal(updatedOrderData.drinks);
        } else {
          // Add a new drink
          await orderRef.update({
            [`drinks.${drinkKey}`]: {
              key: drinkId,
              custom: customization,
              quantity: quantity || 1,
            },
          });
          console.log('New drink added!');

          // Re-fetch the updated order data to update the state
          const updatedOrderSnapshot = await orderRef.get();
          const updatedOrderData = updatedOrderSnapshot.data();

          setListOrder(updatedOrderData.drinks); // Update listOrder state
          console.log("updatedDrinks" + updatedOrderData.drinks);

          await calculateTotal(updatedOrderData.drinks); // Recalculate the total price
        }
      } else {
        console.log('Order not found!');
      }
    } catch (error) {
      console.error('Error adding or updating drink:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoadingScreen visible={loading} />
      <ImageBackground
        source={require('../../../assets/img/detailBackgroun.png')}
        style={{ width: '101%', height: '115%' }}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="angle-left"
            color={colorTheme.greenText}
            size={30}
            style={styles.iconBack}
          />
        </TouchableOpacity>

        {/* Content */}
        <View style={styles.wrapWhite}>
          {/* Top Section */}
          <View style={styles.top}>
            <View style={styles.topLeft}>
              <Text style={styles.name}>{drink.name}</Text>
              <Text style={styles.descrip}>{drink.description}</Text>
            </View>
            <View style={styles.topRight}>
              <Image source={{ uri: drink.img }} style={styles.img} />
              <Text style={styles.price}>đ{drink.price}</Text>
            </View>
          </View>

          {/* Drink Size Section */}
          <View style={styles.sizeSetion}>
            <Text style={styles.titleSize}>Drink size</Text>
            <View style={styles.sizeGroup}>
              {['S', 'M', 'L'].map(size => (
                <TouchableOpacity
                  key={size}
                  style={
                    selectedSize === size
                      ? styles.sizeSquareActive
                      : styles.sizeSquareUnactive
                  }
                  onPress={() => setSelectedSize(size)}>
                  <Image
                    source={
                      size === 'S'
                        ? require('../../../assets/img/sizeS.png')
                        : size === 'M'
                          ? require('../../../assets/img/sizeM.png')
                          : require('../../../assets/img/sizeL.png')
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Sweetness Section */}
          <View style={styles.sweetSection}>
            <Text style={styles.titleSize}>Sweetness</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={
                  sweetness === 'Regular'
                    ? styles.button
                    : styles.unactiveButton
                }
                onPress={() => setSweetness('Regular')}>
                <Text
                  style={
                    sweetness === 'Regular'
                      ? styles.buttonText
                      : styles.unactiveButtonText
                  }>
                  Regular
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  sweetness === 'Less sweet'
                    ? styles.button
                    : styles.unactiveButton
                }
                onPress={() => setSweetness('Less sweet')}>
                <Text
                  style={
                    sweetness === 'Less sweet'
                      ? styles.buttonText
                      : styles.unactiveButtonText
                  }>
                  Less sweet
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Add to Cart Section */}
          <TouchableOpacity
            style={styles.addIcon}
            onPress={() =>
              addOrUpdateDrinkWithCheck(
                keyOrder,
                drink.key,
                { size: selectedSize, sweetness: sweetness },
                1,
              )
            }>
            <Icon name="plus" size={25} color={colorTheme.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cart}
            onPress={() => {
              console.log('Order before navigation:', order);
              if (order) {
                navigation.navigate('ReviewOrder', { order, total, user });
              } else {
                console.warn('Order is not ready yet!');
              }
            }}>
            <Text style={styles.total}>
              Total: {total ? `đ${total}` : 'Calculating...'}
            </Text>
            <Icon name="shopping-cart" size={30} color={colorTheme.white} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
const { width, height } = Dimensions.get('window');
const scale = size => (width / 375) * size;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconBack: {
    marginLeft: scale(20),
    marginTop: scale(20),
  },
  wrapWhite: {
    width: scale(375),
    height: height * 0.72, 
    flex: 1,
    backgroundColor: colorTheme.white,
    marginTop: height * 0.25, // 70% of screen height
    borderTopLeftRadius: scale(50),
    borderTopRightRadius: scale(50),
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  topLeft: {
    width: '60%',
    alignItems: 'left',
    marginLeft: scale(10),
  },
  name: {
    color: colorTheme.greenText,
    fontSize: scale(25),
    fontWeight: '700',
    marginBottom: scale(20),
  },
  descrip: {},
  topRight: {
    width: '40%',
    alignItems: 'center',
  },
  img: {
    position: 'absolute',
    marginTop: scale(-40),
    width: scale(100),
    height: scale(180),
  },
  price: {
    color: colorTheme.orangeBackground,
    fontWeight: '700',
    fontSize: scale(23),
    marginTop: scale(160),
  },
  sizeSetion: {
    paddingHorizontal: scale(20),
  },
  titleSize: {
    fontSize: scale(20),
    fontWeight: '700',
    color: colorTheme.grayText,
  },
  sizeGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(15),
  },
  sizeSquareActive: {
    borderWidth: scale(2),
    borderColor: colorTheme.greenBackground,
    backgroundColor: colorTheme.greenBackground,
    borderRadius: scale(15),
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(110),
    height: scale(110),
  },
  sizeSquareUnactive: {
    borderWidth: scale(2),
    borderColor: colorTheme.greenBackground,
    backgroundColor: colorTheme.white,
    borderRadius: scale(15),
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(110),
    height: scale(110),
  },
  sweetSection: {
    paddingHorizontal: scale(20),
    marginTop: scale(10),
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(12),
  },
  button: {
    backgroundColor: '#7ec479',
    paddingVertical: scale(12),
    width: scale(160),
    borderRadius: scale(25),
    borderWidth: scale(2),
    borderColor: colorTheme.greenBackground,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: scale(14),
    color: '#fff',
    fontWeight: 'bold',
  },
  unactiveButton: {
    backgroundColor: colorTheme.white,
    paddingVertical: scale(12),
    width: scale(160),
    borderRadius: scale(25),
    borderWidth: scale(2),
    borderColor: colorTheme.greenBackground,
    alignItems: 'center',
  },
  unactiveButtonText: {
    fontSize: scale(14),
    color: colorTheme.greenBackground,
    fontWeight: 'bold',
  },
  cart: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(30),
    paddingVertical: scale(20),
    bottom: scale(108),
    backgroundColor: colorTheme.greenBackground,
    borderTopLeftRadius: scale(40),
    borderTopRightRadius: scale(40),
  },
  total: {
    color: colorTheme.white,
    fontSize: scale(20),
    fontWeight: '700',
  },
  addIcon: {
    position: 'absolute',
    backgroundColor: colorTheme.orangeBackground,
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
    borderRadius: scale(25),
    bottom: scale(190),
    right: scale(20),
  },
});


export default ProductDetail;
