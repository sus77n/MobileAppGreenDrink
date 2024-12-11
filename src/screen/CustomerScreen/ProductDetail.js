import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, Dimensions,
  Alert,
} from 'react-native';
import { addToOrder, colorTheme, getOrder, getUser, LoadingScreen } from '../../component/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

const ProductDetail = ({ navigation, route }) => {
  const { drink, user } = route.params;

  const [selectedSize, setSelectedSize] = useState('S');
  const [sweetness, setSweetness] = useState('Regular');
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(drink.price - 10000);
  const [loading, setLoading] = useState(false);

  const updateTotal = async () => {
    try {
      const order = await getOrder();
      setTotal(order.total);
    } catch (error) {
      console.error("Error update total: ", error);
    } finally {
      setLoading(false);
    }
  };

  const addToOrderList = async ({ customization, quantity }) => {
    setLoading(true)
    try {
      await addToOrder({ drink: { ...drink, price: selectedPrice, quantity: quantity, customization: customization } });
      setLoading(false)
      await updateTotal();
    } catch (error) {
      console.error("Add productDetail error: ", error);
      Alert.alert("Error", "Something went wrong. Try again!")
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    const loadScreen = navigation.addListener("focus", async () => { await updateTotal() });
    return () => { loadScreen() };
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <LoadingScreen visible={loading} />
      <ImageBackground
        source={require('../../../assets/img/detailBackgroun.png')}
        style={{ width: '101%', height: '115%' }}>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="angle-left"
            color={colorTheme.greenText}
            size={30}
            style={styles.iconBack}
          />
        </TouchableOpacity>

        <View style={styles.wrapWhite}>
          <View style={styles.top}>
            <View style={styles.topLeft}>
              <Text style={styles.name}>{drink.name}</Text>
              <Text style={styles.descrip}>{drink.description}</Text>
            </View>
            <View style={styles.topRight}>
              <Image source={{ uri: drink.img }} style={styles.img} />
              <Text style={styles.price}>đ{selectedPrice}</Text>
            </View>
          </View>

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
                  onPress={() => {
                    setSelectedSize(size)
                    if (size === "S") {
                      setSelectedPrice(drink.price - 10000);
                    } else if (size === "M") {
                      setSelectedPrice(drink.price);
                    } else if (size === "L") {
                      setSelectedPrice(drink.price + 5000);
                    }
                  }}>
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
          <View style={styles.sweetSection}>
            <Text style={styles.titleSize}>Quantity</Text>
            <View style={styles.buttonGroup}>
              <View style={styles.controls}>
                <TouchableOpacity style={styles.controlButton} onPress={() => {
                  setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
                }}>
                  <Icon
                    name="minus-circle"
                    color={colorTheme.greenBackground}
                    size={30}
                  />
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity style={styles.controlButton} onPress={() => {
                  setQuantity(prevQuantity => prevQuantity + 1);
                }}>
                  <Icon
                    name="plus-circle"
                    color={colorTheme.greenBackground}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.addIcon}
            onPress={() =>
              addToOrderList({
                customization: { size: selectedSize, sweetness: sweetness },
                quantity: quantity,
              })
            }>
            <Icon name="plus" size={25} color={colorTheme.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cart}
            onPress={() => {
              navigation.navigate('ReviewOrder', { user });
            }}>
            <Text style={styles.total}>Total: đ{total}</Text>
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
    height: height * 0.72, // Keeping the 60% proportional height
    flex: 1,
    backgroundColor: colorTheme.white,
    marginTop: height * 0.12, // 70% of screen height
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
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: scale(15),
    width: scale(120),
    borderRadius: scale(25),
    borderWidth: scale(2),
    borderColor: colorTheme.greenBackground,
    paddingVertical: scale(5),
  },
  quantity: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginHorizontal: scale(15),
  },
});


export default ProductDetail;
