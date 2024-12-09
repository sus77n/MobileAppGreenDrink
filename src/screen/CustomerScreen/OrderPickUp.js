import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { colorTheme, getOrder, getUser, LoadingScreen, TopGoBack } from '../../component/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore, { getFirestore } from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderPickUp = ({ navigation, route }) => {
  const { user } = route.params
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [seasonalDrink, setSeasonalDrink] = useState([]);

  const [listOrder, setListOrder] = useState([]);
  const [total, setTotal] = useState(0);

  const getTotal = async () => {
    const order = await getOrder();
    if (order) {
      setTotal(order.total);
    } else {
      setTotal(0);
    }
  };

  useEffect(() => {
      const getCategories = firestore()
      .collection('categories')
      .onSnapshot(querySnapshot => {
        const categories = [];

        querySnapshot.forEach(documentSnapshot => {
          categories.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setCategories(categories);
        setLoading(false);
      });

    return async () => {
      setLoading(true)
      await getTotal();
      getCategories()
    };
  }, []);

  const renderCategories = ({ item: cate }) => {
    return (
      <TouchableOpacity
        style={[styles.drinkTag,]}
        onPress={() => navigation.navigate('TypeDrink', { cate, user, total })}>
        <View style={styles.imageWrapTag}>
          <Image source={{ uri: cate.img }} style={styles.img} />
        </View>
        <View style={styles.nameWrapTag}>
          <Text style={styles.nameTag}>{cate.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const getDrinks = firestore()
      .collection('drinks')
      .onSnapshot(querySnapshot => {
        const drinks = [];

        querySnapshot.forEach(documentSnapshot => {
          drinks.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        const filter = drinks.filter(item => item.category === 'Seasonal');
        setSeasonalDrink(filter);
        setLoading(false);
      });

    return () => {
      setLoading(true)
      getDrinks()
    };
  }, []);

  const renderDrink = ({ item: drink, index }) => {
    return (
      <TouchableOpacity
        style={styles.drinkRow}
        onPress={() => navigation.navigate('ProductDetail', { drink, listOrder })}>
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
      <TopGoBack navigation={navigation} text={'Order & Pick-up'} />
      <View style={styles.searchSection}></View>
      <View style={styles.main}>
        <View style={styles.typeDrink}>
          <Text style={styles.type}>Seasonal Drink Menu</Text>
          <FlatList
            data={seasonalDrink}
            renderItem={renderDrink}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={styles.typeDrink}>
          <Text style={styles.type}>Drink Menu</Text>
          <FlatList
            data={categories}
            renderItem={renderCategories}
            keyExtractor={item => item.key}
            numColumns={2}></FlatList>
        </View>
      </View>
      <TouchableOpacity
        style={styles.cart}
        onPress={() => {

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
    flex: 1,
    paddingHorizontal: '4%',
  },
  type: {
    fontSize: 17,
    color: colorTheme.greenText,
    fontWeight: '600',
    marginBottom: '5%',
  },

  typeDrink: {
    marginTop: '5%',
    width: '100%',
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
    backgroundColor: colorTheme.greenBackgroundDrink,
    left: '-22%',
    paddingVertical: '11%',
    // borderRadius: 10,
  },
  name: {
    width: '60%',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: colorTheme.greenText,
    left: '-3%',
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
    // borderRadius: 10,
  },
  drinkTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '2%',
    width: '48%',
    marginHorizontal: '1%',
  },
  imageWrapTag: {
    zIndex: 1,
    backgroundColor: colorTheme.white,
    paddingHorizontal: '13%',
    paddingVertical: '7%',
    left: '6%',
    borderRadius: 50,
  },
  nameWrapTag: {
    zIndex: 0,
    alignItems: 'center',
    width: '100%',
    backgroundColor: colorTheme.greenBackgroundDrink,
    left: '-42%',
    paddingVertical: '18%',
  },
  nameTag: {
    width: '70%',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    left: '19%',
    color: colorTheme.greenText,
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


export default OrderPickUp;
