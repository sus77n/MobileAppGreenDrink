import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colorTheme, PayInStoreTop} from '../component/store';
import Icon from 'react-native-vector-icons/FontAwesome';
const ReviewOrder = ({navigation}) => {
  const [quantity, setQuantity] = useState(2);
  const pricePerItem = 100000; // Price of one item
  const totalPrice = quantity * pricePerItem; // Calculate total price

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
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
        {/* Order Header */}
        <Text style={styles.header}>Order items</Text>

        {/* Order Item Section */}
        <View style={styles.itemContainer}>
          {/* Product Image */}
          <Image
            source={{
              uri: 'https://via.placeholder.com/60', // Replace with your actual image link
            }}
            style={styles.image}
          />

          {/* Product Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.itemName}>
              Green Tea Cream Frappuccino Blended Beverage
            </Text>
            <Text style={styles.itemDetails}>Drink size: L</Text>

          </View>

          {/* Total Price */}
          <Text style={styles.itemPrice}>
              đ{pricePerItem.toLocaleString()}
            </Text>
        </View>

        {/* Quantity Controls */}
        <View style={styles.controls}>
          <View style={styles.controls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={decrementQuantity}>
            <Icon name='minus-circle' color={colorTheme.greenBackground} size={25}/>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={incrementQuantity}>
            <Icon name='plus-circle' color={colorTheme.greenBackground} size={25}/>
          </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.totalPrice}>đ{totalPrice.toLocaleString()}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Order Total */}
        <View style={styles.totalContainer}>
          <Text style={styles.orderTotalLabel}>Order total:</Text>
          <Text style={styles.orderTotalValue}>
            đ{totalPrice.toLocaleString()}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorTheme.white,
    flex: 1,
  },
  typeSection: {
    backgroundColor: colorTheme.grayBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    margin: 15,
    borderRadius: 15,
  },
  title: {
    fontSize: 17,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: colorTheme.black,
    fontWeight: '600',
  },
  iconArrow: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 20,
  },
  itemSection: {
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colorTheme.black,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDetails: {
    fontSize: 12,
    color: '#666',
    marginVertical: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#333',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 35,
    marginBottom: 15,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 15,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderTotalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reorderButton: {
    backgroundColor: colorTheme.white,
    paddingVertical: 7,
    width: 80,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colorTheme.greenBackground,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  reorderButtonText: {
    fontSize: 14,
    color: colorTheme.greenBackground,
    fontWeight: 'bold',
  },
});

export default ReviewOrder;
