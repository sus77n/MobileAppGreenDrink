import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colorTheme, getUser} from '../component/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

const ProductDetail = ({navigation, route}) => {
  const {drink} = route.params;
  const [selectedSize, setSelectedSize] = useState('S');
  const [sweetness, setSweetness] = useState('Regular');

  const [order, setOrder] = useState({});
  const [listOrder, setListOrder] = useState([]);
  const [total, setTotal] = useState(0);

  const calculateTotal = async drinks => {
    let newTotal = 0;

    const drinkKeys = Object.keys(drinks); 
    for (const i of drinkKeys) {
      const drinkData = drinks[i];
      const {key, quantity} = drinkData;
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
        console.error(`Error fetching drink data for ${drinkId}:`, error);
      }
    }
    setTotal(newTotal);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser(); 
      console.log('User Pickup:', userData);
      try {
        const documentSnapshot = await firestore()
          .collection('orders')
          .doc(userData.orderKey)
          .get();

        if (documentSnapshot.exists) {
          const data = documentSnapshot.data();
          const key = documentSnapshot.id; 
          console.log('Order Data:', data);

          // Combine the data with the document key
          const dataWithKey = {...data, key};
          setOrder(dataWithKey);
          if (data.drinks) {
            setListOrder(data.drinks);
            await calculateTotal(data.drinks);
          } else {
            console.log('Drinks field is undefined or does not exist.');
          }
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };
    fetchUser();
  }, [listOrder]);

  useEffect(() => {
    if (listOrder) {
      calculateTotal(listOrder);
    }
  }, [listOrder]);

  const generateDrinkKey = (drinkId, customization) => {
    const customizationString = JSON.stringify(customization);
    const base64Key = btoa(`${drinkId}_${customizationString}`);
    return base64Key;
  };

  const addOrUpdateDrinkWithCheck = async (orderId, drinkId, customization, quantity) => {
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

      if (updatedOrderData && updatedOrderData.drinks) {
        setListOrder(updatedOrderData.drinks); // Update listOrder state
        await calculateTotal(updatedOrderData.drinks); // Recalculate the total price
      }
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
      <ImageBackground
        source={require('../../assets/img/detailBackgroun.png')}
        style={{width: '101%', height: '115%'}}>
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
              <Image source={{uri: drink.img}} style={styles.img} />
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
                        ? require('../../assets/img/sizeS.png')
                        : size === 'M'
                        ? require('../../assets/img/sizeM.png')
                        : require('../../assets/img/sizeL.png')
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
            onPress={() => addOrUpdateDrinkWithCheck(order.key, drink.key, {size: selectedSize,sweetness: sweetness}, 1)}>
            <Icon name="plus" size={25} color={colorTheme.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cart} onPress={() => navigation.navigate('ReviewOrder',{order})}>
            <Text style={styles.total}>Total: đ{total}</Text>
            <Icon name="shopping-cart" size={30} color={colorTheme.white} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconBack: {
    marginLeft: '5%',
    marginTop: '5%',
  },
  wrapWhite: {
    position: 'absolute',
    width: '99%',
    height: '60%',
    flex: 1,
    backgroundColor: colorTheme.white,
    marginTop: '70%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingTop: '10%',
    paddingBottom: '5%',
  },
  topLeft: {
    width: '60%',
    alignItems: 'center',
  },
  name: {
    color: colorTheme.greenText,
    fontSize: 25,
    fontWeight: '700',
    marginBottom: '10%',
  },
  descrip: {},
  topRight: {
    width: '40%',
    alignItems: 'center',
  },
  img: {
    position: 'absolute',
    marginTop: '-120%',
    width: '90%',
    height: '160%',
  },
  price: {
    color: colorTheme.orangeBackground,
    fontWeight: '700',
    fontSize: 23,
    marginTop: '60%',
  },
  sizeSetion: {
    paddingHorizontal: '8%',
  },
  titleSize: {
    fontSize: 20,
    fontWeight: '700',
    color: colorTheme.grayText,
  },
  sizeGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '3%',
  },
  sizeSquareActive: {
    borderWidth: 2,
    borderColor: colorTheme.greenBackground,
    backgroundColor: colorTheme.greenBackground,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    height: '75%',
  },
  sizeSquareUnactive: {
    borderWidth: 2,
    borderColor: colorTheme.greenBackground,
    backgroundColor: colorTheme.white,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    height: '75%',
  },
  sweetSection: {
    paddingHorizontal: '8%',
    marginTop: '-30%',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '3%',
  },
  button: {
    backgroundColor: '#7ec479',
    paddingVertical: '3%',
    width: '45%',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colorTheme.greenBackground,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  unactiveButton: {
    backgroundColor: colorTheme.white,
    paddingVertical: '3%',
    width: '45%',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colorTheme.greenBackground,
    alignItems: 'center',
  },
  unactiveButtonText: {
    fontSize: 14,
    color: colorTheme.greenBackground,
    fontWeight: 'bold',
  },
  cart: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '8%',
    paddingVertical: '5%',
    bottom: '4%',
    backgroundColor: colorTheme.greenBackground,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  total: {
    color: colorTheme.white,
    fontSize: 20,
    fontWeight: '700',
  },

  addIcon: {
    position: 'absolute',
    backgroundColor: colorTheme.orangeBackground,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 25,
    bottom: '19%',
    right: '5%',
  },
});

export default ProductDetail;
