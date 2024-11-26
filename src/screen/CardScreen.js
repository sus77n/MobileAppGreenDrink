import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colorTheme} from '../component/store';
const CardScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>Pay In Store</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            })
          }>
          <Text style={styles.iconClose}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Image
          source={require('../../assets/img/goldCard.png')}
          style={styles.goldCard}
        />
        <View style={styles.moneyWrap}>
          <Text style={styles.money}>đ20 000</Text>
          <Text style={styles.subtitle}> as of 8:50 PM, 20/11/2024</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add money</Text>
      </TouchableOpacity>
      <View style={styles.voucherSection}>
          <Text style={styles.voucherTitle}>VOUCHERS</Text>
          <View style={styles.voucherMain}>
            <View style={styles.voucherCard}>
              <Image source={require('../../assets/img/voucherIcon.png')} style={styles.voucherIcon}/>
              <View style={styles.cardTitleWrap}>
                <Text style={styles.cardTitle}>Discount on 20% on Teacher Day</Text>
                <Text style={styles.cardSubtitle}>Expires on 20/11/2024</Text>
              </View>
            </View>
          </View>
      </View>
      <View style={styles.barCode}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.grayBackground,
  },
  top: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    height: 70,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    color: '#568f56',
    paddingLeft: 20,
    paddingTop: 15,
    fontWeight: '600',
  },

  iconClose: {
    paddingRight: 20,
    paddingTop: 10,
    fontSize: 30,
    fontWeight: '400',
    color: colorTheme.greenText,
  },

  voucherIcon: {
    
  } ,  
  card: {
    backgroundColor: colorTheme.greenBackground,
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'flex-start',
  },

  moneyWrap: {
    flexDirection: 'column',
  },

  goldCard: {
    marginRight: 30,
  },

  money: {
    fontSize: 26,
    fontWeight: '600',
    color: colorTheme.white,
  },
  subtitle: {
    color: colorTheme.white,
  },

  addButton: {
    backgroundColor: colorTheme.grayBackground,
    paddingVertical: 7,
    width: 120,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colorTheme.greenBackground,
    alignItems: 'center',
    marginTop: 7,
    alignSelf: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    fontSize: 14,
    color: colorTheme.greenBackground,
    fontWeight: '600',
  },

  voucherSection: {
    paddingHorizontal: 15,
  },
  voucherTitle: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 10,
  },
  voucherMain:{
    backgroundColor: colorTheme.orangeBackground,
    flexDirection: 'row',
    padding: 10,
    borderRadius:10,
  },
  voucherCard:{
    backgroundColor: colorTheme.white,
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
    width: 240,
  },
  voucherIcon:{
    marginTop: 10,
    marginLeft: 5,
    marginRight: 10,
  },
  cardTitleWrap:{
    width: 150,
  },
  cardTitle:{
    color: colorTheme.black,
    fontWeight: '600',
  },
  cardSubtitle:{
    color: colorTheme.grayText,
  },

  barCode: {},
});

export default CardScreen;
