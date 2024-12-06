import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colorTheme} from '../component/store';

const OrderScreen = ({navigation}) => {
  const [selectedType, setSelectedTye] = useState('OrderPickUp');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.greetingSection}>
        <Text style={styles.greetingText}>Welcome to Mobile Order</Text>
        <TouchableOpacity>
          <Text style={styles.mailIcon}>📩</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate('OrderPickUp');
        }}>
        <Text style={styles.cardTitle}>Order & Pick-up</Text>
        <Image source={require('../../assets/img/iconOrderPickUp.png')} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate('Delivery');
        }}>
        <Text style={styles.cardTitle}>Delivery</Text>
        <Image source={require('../../assets/img/iconDelivery.png')} />
      </TouchableOpacity>
      <View style={styles.reorderSection}>
        <Text style={styles.reorderTitle}>Order again</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={
                    selectedType === 'OrderPickUp'
                      ? styles.button
                      : styles.unactiveButton
                  } onPress={() => setSelectedTye('OrderPickUp')}>
            <Text style={
                    selectedType === 'OrderPickUp'
                      ? styles.buttonText
                      : styles.unactiveButtonText
                  }>Order & Pick-up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={
                    selectedType === 'Delivery'
                      ? styles.button
                      : styles.unactiveButton
                  } onPress={() => setSelectedTye('Delivery')}>
            <Text style={
                    selectedType === 'Delivery'
                      ? styles.buttonText
                      : styles.unactiveButtonText
                  }>Delivery</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.reorderCard}>
            <View style={styles.left}>
              <Text style={styles.type}>Order & Pick-up</Text>
              <Text style={styles.address}>HIKARI</Text>
              <Text style={styles.drinks}>
                2 Item(s) | x1 Green Tea Cream Frappuchino L, x1 Americano Cold
                M
              </Text>
              <View style={styles.imageDrink}></View>
            </View>
            <View style={styles.right}>
              <Text style={styles.price}>đ700,000</Text>
              <TouchableOpacity style={styles.reorderButton} onPress={() => {}}>
                <Text style={styles.reorderButtonText}>Reorder</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.reorderCard}>
            <View style={styles.left}>
              <Text style={styles.type}>Order & Pick-up</Text>
              <Text style={styles.address}>HIKARI</Text>
              <Text style={styles.drinks}>
                2 Item(s) | x1 Green Tea Cream Frappuchino L, x1 Americano Cold
                M
              </Text>
              <View style={styles.imageDrink}></View>
            </View>
            <View style={styles.right}>
              <Text style={styles.price}>đ700,000</Text>
              <TouchableOpacity style={styles.reorderButton} onPress={() => {}}>
                <Text style={styles.reorderButtonText}>Reorder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: colorTheme.white,
    flex: 1,
  },
  greetingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#568f56',
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colorTheme.grayBackground,
    borderRadius: 10,
    marginHorizontal: '4%',
    marginVertical: '2%',
    paddingHorizontal: '12%',
    paddingVertical: '5%',
  },

  cardTitle: {
    fontSize: 18,
    color: colorTheme.black,
  },

  reorderSection: {
    flex: 1,
    padding: '5%',
  },

  reorderTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: '2%',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  reorderCard: {
    marginVertical: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colorTheme.grayBackground,
    borderRadius: 10,
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
  type: {
    fontSize: 12,
  },
  address: {
    fontSize: 15,
    fontWeight: '700',
    color: colorTheme.black,
    marginVertical: '3%',
  },
  drinks: {},
  left: {
    width: '60%',
  },
  imageDrink: {
    height: 80,
  },
  right: {},
  price: {
    fontSize: 16,
    marginLeft: '20%',
    color: colorTheme.black,
    fontWeight: '600',
  },
  reorderButton: {
    backgroundColor: colorTheme.grayBackground,
    paddingVertical: '5%',
    paddingHorizontal: '10%',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colorTheme.greenBackground,
    alignItems: 'center',
    bottom: '-30%',
  },
  reorderButtonText: {
    fontSize: 14,
    color: colorTheme.greenBackground,
    fontWeight: 'bold',
  },
});

export default OrderScreen;
