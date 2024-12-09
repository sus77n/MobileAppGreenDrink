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
} from 'react-native';
import { colorTheme, LoadingScreen, TopGoBack } from '../component/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
const Delivery = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [seasonalDrink, setSeasonalDrink] = useState([]);

  useEffect(() => {
    setLoading(true);
    const subscriber = firestore()
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

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const renderCategories = ({ item: cate }) => {
    return (
      <TouchableOpacity
        style={[styles.drinkTag, { marginBottom: 10 }]}
        onPress={() => navigation.navigate('TypeDrink', { cate })}>
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
    setLoading(true)
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

        const filter = drinks.filter(item => item.category === 'Seasonal');
        setSeasonalDrink(filter);
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
          navigation.navigate('ProductDetail', { drink })
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
      <TopGoBack navigation={navigation} text={'Order & Pick-up'} />
      <View style={styles.searchSection}></View>
      <View style={styles.main}>
        <View style={styles.typeDrink}>
          <Text style={styles.type}>Seasonal Drink Menu</Text>
          <FlatList
            data={seasonalDrink}
            renderItem={renderDrink}
            keyExtractor={(item) => item.id}
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
        onPress={() => navigation.navigate('ReviewOrder')}>
        <Text style={styles.total}>Total: đ50,000</Text>
        <Icon name="shopping-cart" size={30} color={colorTheme.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

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
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: colorTheme.greenText,
    left: '-5%',
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
    width: '48%', // This can be kept if space is properly managed.
    marginHorizontal: '1%', // Add horizontal margin for spacing.
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
    fontSize: 16,
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

export default Delivery;
