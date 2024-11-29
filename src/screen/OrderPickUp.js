import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colorTheme, TopGoBack} from '../component/store';
import Icon from 'react-native-vector-icons/FontAwesome';
const OrderPickUp = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <TopGoBack navigation={navigation} text={'Order & Pick-up'} />
      <View style={styles.searchSection}></View>
      <ScrollView style={styles.main}>
        <View style={styles.typeDrink}>
          <Text style={styles.type}>Seasonal Drink Menu</Text>
          <View style={styles.drinkRow}>
            <TouchableOpacity
              style={styles.imageWrap}
              onPress={() => navigation.navigate('ProductDetail')}>
              <Image
                source={require('../../assets/img/blended1.png')}
                style={styles.img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nameWrap}
              onPress={() => navigation.navigate('ProductDetail')}>
              <Text style={styles.name}>Zesty Lemonade Fizz</Text>
              <TouchableOpacity>
                <Icon
                  name="heart"
                  color={'white'}
                  size={20}
                  style={{marginRight: 20}}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <View style={styles.drinkRow}>
            <TouchableOpacity
              style={styles.imageWrap}
              onPress={() => navigation.navigate('ProductDetail')}>
              <Image
                source={require('../../assets/img/tea3.png')}
                style={styles.img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nameWrap}
              onPress={() => navigation.navigate('ProductDetail')}>
              <Text style={styles.name}>Zesty Lemonade Fizz</Text>
              <TouchableOpacity>
                <Icon
                  name="heart-o"
                  color={'white'}
                  size={20}
                  style={{marginRight: 20}}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <View style={styles.drinkRow}>
            <TouchableOpacity
              style={styles.imageWrap}
              onPress={() => navigation.navigate('ProductDetail')}>
              <Image
                source={require('../../assets/img/coffee5.png')}
                style={styles.img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nameWrap}
              onPress={() => navigation.navigate('ProductDetail')}>
              <Text style={styles.name}>Zesty Lemonade Fizz</Text>
              <TouchableOpacity>
                <Icon
                  name="heart-o"
                  color={'white'}
                  size={20}
                  style={{marginRight: 20}}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.typeDrink}>
          <Text style={styles.type}>Drink Menu</Text>
          <View style={styles.typeWrap}>
            <TouchableOpacity
              style={[styles.drinkTag, {marginBottom: 10}]}
              onPress={() => navigation.navigate('TypeDrink')}>
              <View style={styles.imageWrapTag}>
                <Image
                  source={require('../../assets/img/coffee2.png')}
                  style={styles.img}
                />
              </View>
              <View style={styles.nameWrapTag}>
                <Text style={styles.nameTag}>Coffee</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.drinkTag, {marginBottom: 10}]}
              onPress={() => navigation.navigate('TypeDrink')}>
              <View style={styles.imageWrapTag}>
                <Image
                  source={require('../../assets/img/tea1.png')}
                  style={styles.img}
                />
              </View>
              <View style={styles.nameWrapTag}>
                <Text style={styles.nameTag}>Tea</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.drinkTag, {marginBottom: 10}]}
              onPress={() => navigation.navigate('TypeDrink')}>
              <View style={styles.imageWrapTag}>
                <Image
                  source={require('../../assets/img/blended4.png')}
                  style={styles.img}
                  onPress={() => navigation.navigate('TypeDrink')}
                />
              </View>
              <View style={styles.nameWrapTag}>
                <Text style={styles.nameTag}>Blended</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.drinkTag, {marginBottom: 10}]}
              onPress={() => navigation.navigate('TypeDrink')}>
              <View style={styles.imageWrapTag}>
                <Image
                  source={require('../../assets/img/coffee5.png')}
                  style={styles.img}
                />
              </View>
              <View style={styles.nameWrapTag}>
                <Text style={styles.nameTag}>Others</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.cart} onPress={() => navigation.navigate('ReviewOrder')}>
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
  },

  typeDrink: {
    marginTop: '5%',
  },
  drinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '7%',
  },
  imageWrap: {
    zIndex: 1,
    backgroundColor: colorTheme.lightGreeenBackground,
    paddingHorizontal: '4%',
    borderRadius: 20,
  },
  img: {
    top: '-25%',
    height: 67,
  },
  nameWrap: {
    zIndex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '85%',
    backgroundColor: colorTheme.greenBackground,
    left: '-4%',
    paddingVertical: '5%',
    borderRadius: 10,
  },
  name: {
    width: '60%',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: colorTheme.white,
    left: '-10%',
  },
  typeWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  drinkTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '6%',
    width: '48%',
  },
  imageWrapTag: {
    zIndex: 1,
    backgroundColor: colorTheme.lightGreeenBackground,
    paddingHorizontal: '9%',
    borderRadius: 20,
  },
  nameWrapTag: {
    zIndex: 0,
    alignItems: 'center',
    width: '65%',
    backgroundColor: colorTheme.greenBackground,
    left: '-8%',
    paddingVertical: '9%',
    borderRadius: 10,
  },
  nameTag: {
    width: '100%',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: colorTheme.white,
  },
  cart: {
    position:'absolute',
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '8%',
    paddingVertical: '5%',
    bottom:0,
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
