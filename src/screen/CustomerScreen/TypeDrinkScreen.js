import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,  Dimensions,
} from 'react-native';
import { colorTheme, getUser, LoadingScreen, TopGoBack } from '../../component/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
const TypeDrinkScreen = ({ navigation, route }) => {
  const { cate, user, order, total, keyOrder } = route.params;
  const [loading, setLoading] = useState(false);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    console.log(keyOrder);

    const subscriber = firestore()
      .collection('drinks')
      .onSnapshot(querySnapshot => {
        const drinks = [];

        querySnapshot.forEach(documentSnapshot => {
          drinks.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        const filter = drinks.filter(item => item.category === cate.name);
        setDrinks(filter);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const renderDrink = ({ item: drink, index }) => {
    return (
      <TouchableOpacity
        style={styles.drinkRow}
        onPress={() =>
          navigation.navigate('ProductDetail', { drink, user, order, totalCurrent: total, keyOrder })
        }>
        <View style={styles.imageWrap}>
          <Image source={{ uri: drink.img }} style={styles.img} />
        </View>
        <View
          style={[
            styles.nameWrap,
            {
              backgroundColor:
                index % 2 === 0
                  ? colorTheme.greenBackgroundDrink
                  : colorTheme.white,
            },
          ]}>
          <Text style={styles.name}>{drink.name}</Text>
          <TouchableOpacity>
            <Icon
              name="heart-o"
              color={colorTheme.greenText}
              size={20}
              style={{ marginRight: '8%' }}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoadingScreen visible={loading} />
      <TopGoBack navigation={navigation} text={cate.name} />
      <View style={styles.searchSection}></View>
      <FlatList
        style={styles.main}
        data={drinks}
        renderItem={renderDrink}
        keyExtractor={item => item.key}
      />
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
        <Text style={styles.total}>Total: đ{total}</Text>
        <Icon name="shopping-cart" size={30} color={colorTheme.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const { width, height } = Dimensions.get('window');
const scale = size => (width / 375) * size;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.white,
  },
  searchSection: {},
  main: {
    paddingHorizontal: '4%',
    paddingVertical: '3%',
  },
  typeDrink: {
    marginTop: '3%',
  },
  drinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: '3%',
  },
  imageWrap: {
    left: '3%',
    zIndex: 1,
    backgroundColor: colorTheme.white,
    paddingHorizontal: '7%',
    paddingVertical: '4%',
    borderRadius: 100,
  },
  img: {
    width: 30,
    height: 50,
  },
  nameWrap: {
    zIndex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    left: '-22%',
    paddingVertical: '11%',
  },
  name: {
    width: '60%',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: colorTheme.greenText,
    left: '-1%',
  },
  nameWrapEven: {
    zIndex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: colorTheme.white,
    left: '-22%',
    paddingVertical: '11%',
  },
  cart: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '8%',
    paddingVertical: '5%',
    bottom: 0,
    backgroundColor: colorTheme.greenBackground,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  total: {
    color: colorTheme.white,
    fontSize: 20,
    fontWeight: '700',
  },
});

export default TypeDrinkScreen;