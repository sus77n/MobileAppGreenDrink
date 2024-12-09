import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { colorTheme, getUser, LoadingScreen } from '../../component/store';

const OrderScreen = ({ navigation }) => {
  const [selectedType, setSelectedTye] = useState('OrderPickUp');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      const userData = await getUser(); // Correct function call
      setUser(userData);
      console.log('User order screen:', userData); // Debug log
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  useEffect(() => {
    const loadScreen = navigation.addListener('focus', () => {
      setLoading(true);
      fetchUser();
      setLoading(false);
    });
    return () => loadScreen();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <LoadingScreen visible={loading} />
      <View style={styles.greetingSection}>
        <Text style={styles.greetingText}>Welcome to Mobile Order</Text>
        <TouchableOpacity>
          <Text style={styles.mailIcon}>📩</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate('OrderPickUp', { user });
        }}>
        <Text style={styles.cardTitle}>Order & Pick-up</Text>
        <Image source={require('../../../assets/img/iconOrderPickUp.png')} />
      </TouchableOpacity>
      <TouchableOpacity
        disabled
        style={styles.card}
        onPress={() => {
          navigation.navigate('Delivery');
        }}>
        <Text style={styles.cardTitle}>Delivery</Text>
        <Image source={require('../../../assets/img/iconDelivery.png')} />
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
              <TouchableOpacity style={styles.reorderButton} onPress={() => { }}>
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
              <TouchableOpacity style={styles.reorderButton} onPress={() => { }}>
                <Text style={styles.reorderButtonText}>Reorder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const { width, height } = Dimensions.get('window');
const scale = size => (width / 375) * size;

const styles = StyleSheet.create({
  container: {
    paddingTop: scale(15),
    backgroundColor: colorTheme.white,
    flex: 1,
  },
  greetingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(20),
    marginTop: scale(10),
    paddingHorizontal: scale(20),
  },
  greetingText: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#568f56',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colorTheme.grayBackground,
    borderRadius: scale(10),
    marginHorizontal: scale(15),
    marginVertical: scale(8),
    paddingHorizontal: scale(35),
    paddingVertical: scale(35),
  },
  cardTitle: {
    fontSize: scale(18),
    color: colorTheme.black,
  },
  reorderSection: {
    flex: 1,
    padding: scale(20),
  },
  reorderTitle: {
    fontSize: scale(17),
    fontWeight: '700',
    marginBottom: scale(20),
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  reorderCard: {
    marginTop: scale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colorTheme.grayBackground,
    borderRadius: scale(10),
    paddingHorizontal: scale(20),
    paddingVertical: scale(20),
  },
  type: {
    fontSize: scale(12),
  },
  address: {
    fontSize: scale(15),
    fontWeight: '700',
    color: colorTheme.black,
    marginVertical: scale(12),
  },
  drinks: {},
  left: {
    width: '60%',
  },
  imageDrink: {
    height: scale(80),
  },
  right: {},
  price: {
    fontSize: scale(16),
    marginLeft: scale(20),
    color: colorTheme.black,
    fontWeight: '600',
  },
  reorderButton: {
    backgroundColor: colorTheme.grayBackground,
    paddingVertical: scale(10),
    paddingHorizontal: scale(40),
    borderRadius: scale(25),
    borderWidth: scale(2),
    borderColor: colorTheme.greenBackground,
    alignItems: 'center',
    bottom: scale(-60),
    marginLeft: scale(-40),
  },
  reorderButtonText: {
    fontSize: scale(14),
    color: colorTheme.greenBackground,
    fontWeight: 'bold',
  },
});


export default OrderScreen;
