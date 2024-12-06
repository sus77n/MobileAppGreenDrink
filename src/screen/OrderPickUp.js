import React, {useEffect, useState} from 'react';
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
import {colorTheme, getUser, TopGoBack} from '../component/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore, { getFirestore } from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const OrderPickUp = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [seasonalDrink, setSeasonalDrink] = useState([]);

  //fetch order
  const [order, setOrder] = useState('');
  const [listOrder, setListOrder] = useState([]);
  const [total, setTotal] = useState(0);

  const calculateTotal = async (drinks) => {
    let newTotal = 0;

    // Fetch the base price for each drink
    const drinkKeys = Object.keys(drinks); // Assuming `drinks` is an object with drink keys
    for (const i of drinkKeys) {
      const drinkData = drinks[i];
      const { key, custom, quantity } = drinkData;

      try {
        // Fetch the drink document from Firestore
        const drinkSnapshot = await firestore().collection('drinks').doc(key).get();
        if (drinkSnapshot.exists) {
          const drinkInfo = drinkSnapshot.data();
          const basePrice = drinkInfo.price || 0; // Fallback to 0 if price isn't available

          // Add to total
          newTotal += (basePrice) * quantity;
        }
      } catch (error) {
        console.error(`Error fetching drink data for ${drinkId}:`, error);
      }
    }

    // Update the total state
    setTotal(newTotal);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser(); // Fetch the user data
      console.log('User Pickup:', userData);

      try {
        const documentSnapshot = await firestore()
          .collection('orders')
          .doc(userData.orderKey)
          .get();

        if (documentSnapshot.exists) {
          const data = documentSnapshot.data();
          console.log('Order Data:', data);
          setOrder(data);

          if (data.drinks) {
            console.log('Drinks:', data.drinks);
            setListOrder(data.drinks);

            // Calculate total for the current drinks
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
  }, []);

  // Listen for changes to listOrder and recalculate total
  useEffect(() => {
    if (listOrder) {
      calculateTotal(listOrder);
    }
  }, [listOrder]);

  useEffect(() => {
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

  const renderCategories = ({item: cate}) => {
    return (
      <TouchableOpacity
        style={[styles.drinkTag, {marginBottom: 10}]}
        onPress={() => navigation.navigate('TypeDrink', {cate})}>
        <View style={styles.imageWrapTag}>
          <Image source={{uri: cate.img}} style={styles.img} />
        </View>
        <View style={styles.nameWrapTag}>
          <Text style={styles.nameTag}>{cate.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  

  useEffect(() => {
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
  const renderDrink = ({item: drink, index}) => {
    return (
      <TouchableOpacity
        style={styles.drinkRow}
        onPress={() =>
          navigation.navigate('ProductDetail', {drink})
        }>
        <View style={styles.imageWrap}>
          <Image source={{uri: drink.img}} style={styles.img} />
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
              style={{marginRight: '8%'}}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopGoBack navigation={navigation} text={'Order & Pick-up'} />
      <View style={styles.searchSection}></View>
      <View style={styles.main}>
        <View style={styles.typeDrink}>
          <Text style={styles.type}>Seasonal Drink Menu</Text>
          <FlatList
            data={seasonalDrink}
            renderItem={renderDrink}
            keyExtractor={(item) =>item.id}
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
        <Text style={styles.total}>Total: đ{total}</Text>
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
    position:'absolute',
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

export default OrderPickUp
