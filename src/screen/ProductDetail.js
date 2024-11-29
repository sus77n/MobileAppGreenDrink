import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colorTheme, TopGoBack} from '../component/store';
import Icon from 'react-native-vector-icons/FontAwesome';
const ProductDetail = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/img/detailBackgroun.png')}
        style={{width: '101%', height: '115%'}}>
        <TouchableOpacity
        onPress={() =>
          navigation.goBack()
        }>
        <Icon name="angle-left" color={colorTheme.greenText} size={30} style={styles.iconBack}/>
      </TouchableOpacity>
        <View style={styles.wrapWhite}>
          <View style={styles.top}>
            <View style={styles.topLeft}>
              <Text style={styles.name}>Zesty Lemonade Fizz</Text>
              <Text style={styles.descrip}>
                Bursting with the tangy zing of freshly squeezed lemons, this
                sparkling soda blends a hint of sweet wildflower.
              </Text>
            </View>
            <View style={styles.topRight}>
              <Image
                source={require('../../assets/img/tea5w130.png')}
                style={styles.img}
              />
              <Text style={styles.price}>đ50,000</Text>
            </View>
          </View>
          <View style={styles.sizeSetion}>
            <Text style={styles.titleSize}>Drink size</Text>
            <View style={styles.sizeGroup}>
              <TouchableOpacity style={styles.sizeSquareActive}>
                <Image source={require('../../assets/img/sizeS.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.sizeSquareUnactive}>
                <Image source={require('../../assets/img/sizeM.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.sizeSquareUnactive}>
                <Image source={require('../../assets/img/sizeL.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.sweetSection}>
            <Text style={styles.titleSize}>Sweetness</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text style={styles.buttonText}>Regular</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.unactiveButton}
                onPress={() => {}}>
                <Text style={styles.unactiveButtonText}>Less sweet</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.cart}>
                <Text style={styles.total}>Total: đ50,000</Text>
                <Icon name='shopping-cart' size={30} color={colorTheme.white}/>
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
    marginTop: '5%'
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
    marginTop: '-105%',
  },
  price: {
    color: colorTheme.orangeBackground,
    fontWeight: '700',
    fontSize: 23,
    marginTop: '50%',
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
  cart:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
    paddingHorizontal: '8%',
    paddingVertical:'5%',
    marginTop: '8%',
    backgroundColor: colorTheme.greenBackground,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  total:{
    color: colorTheme.white,
    fontSize: 20,
    fontWeight: '700',
  },
});

export default ProductDetail;
