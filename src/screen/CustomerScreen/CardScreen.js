import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
} from 'react-native';
import {
  colorTheme,
  getTimeNow,
  getUser,
  LoadingScreen,
  TopGoBack,
} from '../../component/store';
import {getFirestore} from '@react-native-firebase/firestore';
const CardScreen = ({navigation, route}) => {
  const {user} = route.params;
  const [loading, setLoading] = useState(false);

  const renderVouchers = ({item: voucher}) => {
    return (
      <View style={styles.voucherCard}>
        <Image
          source={require('../../../assets/img/voucherIcon.png')}
          style={styles.voucherIcon}
        />
        <View style={styles.cardTitleWrap}>
          <Text style={styles.cardTitle}>{voucher.content}</Text>
          <Text style={styles.cardSubtitle}>Add it before pay</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoadingScreen visible={loading} />
      <TopGoBack navigation={navigation} text={'Pay In Store'} />
      <View style={styles.card}>
        <Image
          source={require('../../../assets/img/goldCard.png')}
          style={styles.goldCard}
          resizeMode="contain"
        />
        <View style={styles.moneyWrap}>
          <Text style={styles.money}>{user.balance.toLocaleString()} VND</Text>
          <Text style={styles.subtitle}>{getTimeNow()}</Text>
        </View>
      </View>
      {/* <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddMoney', {user})}>
        <Text style={styles.addButtonText}>Add money</Text>
      </TouchableOpacity> */}
      <View style={styles.voucherSection}>
        <Text style={styles.voucherTitle}>VOUCHERS</Text>
        <View style={styles.voucherMain}>
          <FlatList
            data={user.vouchers}
            renderItem={renderVouchers}
            keyExtractor={item => item.key}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
      <View style={styles.barCode}></View>
    </SafeAreaView>
  );
};
const {width, height} = Dimensions.get('window');
const scale = size => (width / 375) * size;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.grayBackground,
  },

  voucherIcon: {},
  card: {
    backgroundColor: colorTheme.greenBackground,
    marginRight: scale(15),
    marginLeft: scale(15),
    marginTop: scale(15),
    borderRadius: scale(10),
    flexDirection: 'row',
    padding: scale(20),
    justifyContent: 'flex-start',
  },

  moneyWrap: {
    flexDirection: 'column',
  },

  goldCard: {
    marginRight: scale(30),
  },

  money: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: colorTheme.white,
  },

  subtitle: {
    fontSize: scale(12),
    color: colorTheme.white,
  },

  addButton: {
    backgroundColor: colorTheme.grayBackground,
    paddingVertical: scale(7),
    width: scale(120),
    borderRadius: scale(25),
    borderWidth: scale(2),
    borderColor: colorTheme.greenBackground,
    alignItems: 'center',
    marginTop: scale(15),
    alignSelf: 'center',
    marginBottom: scale(10),
  },

  addButtonText: {
    fontSize: scale(14),
    color: colorTheme.greenBackground,
    fontWeight: '600',
  },

  voucherCard: {
    backgroundColor: colorTheme.white,
    padding: scale(5),
    borderRadius: scale(10),
    flexDirection: 'row',
    width: scale(240),
    alignItems: 'center',
    marginRight: scale(15),

  },

  voucherSection: {
    marginTop: scale(20),
    paddingHorizontal: scale(15),
  },

  voucherTitle: {
    fontWeight: '700',
    fontSize: scale(20),
    marginBottom: scale(10),
  },

  voucherMain: {
    backgroundColor: colorTheme.orangeBackground,
    flexDirection: 'row',
    padding: scale(10),
    borderRadius: scale(10),
  },

  voucherIcon: {
    marginTop: scale(10),
    marginLeft: scale(5),
    marginRight: scale(10),
  },

  cardTitleWrap: {
    width: scale(150),
  },

  cardTitle: {
    color: colorTheme.black,
    fontWeight: '600',
  },
  cardSubtitle: {
    color: colorTheme.grayText,
  },

  barCode: {
    // No specific styles defined, so leaving empty
  },
});

export default CardScreen;
