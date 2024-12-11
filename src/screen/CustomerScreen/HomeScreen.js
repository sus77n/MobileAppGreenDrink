import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  colorTheme,
  getUser,
  LoadingScreen,
  resetUserAfterChange,
} from '../../component/store';

const HomeScreen = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);

  const fetchUser = async () => {
    setLoading(true);
    const userData = await getUser();
    setUser(userData);
    console.log('User home screen:', userData);
    setLoading(false);
  };

  const fetchNews = async () => {
    firestore()
      .collection('newsList')
      .onSnapshot(querySnapshot => {
        const news = [];
        querySnapshot.forEach(documentSnapshot => {
          news.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setNews(news);
        setLoading(false);
      });
  };

  const renderNews = ({item: aNews}) => {
    const truncateContent = (content, limit) => {
      const words = content.split(' ');
      if (words.length > limit) {
        return words.slice(0, limit).join(' ') + '...';
      }
      return content;
    };

    return (
      <TouchableOpacity
        style={styles.drinksSection}
        onPress={() => navigation.navigate('NewsScreen',{aNews})}>
        <View style={styles.drinkCard}>
          <Image source={{uri: aNews.img}} style={styles.drinkImage} />
          <Text style={styles.drinkTitle}>{aNews.title}</Text>
          <Text style={styles.drinkDescription}>
            {truncateContent(aNews.content, 15)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const loadScreen = navigation.addListener('focus', () => {
      fetchUser();
      fetchNews();
    });
    return () => {
      loadScreen();
    };
  }, [navigation]);

  if (user === null) {
    return <LoadingScreen visible={loading} />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {/* Greeting Section */}
          <View style={styles.greetingSection}>
            <Text style={styles.greetingText}>
              Good morning, {user.formOfAddress}.{user.username}! 🌞
            </Text>
            <TouchableOpacity>
              <Text style={styles.mailIcon}>📩</Text>
            </TouchableOpacity>
          </View>

          {/* Balance and Stars Section */}
          <View style={styles.balanceStarsSection}>
            <TouchableOpacity
              style={styles.balanceCardWrapper}
              onPress={() => navigation.navigate('Card', {user})}>
              <View style={styles.balanceCard}>
                <Text style={styles.balanceTitle}>BALANCE</Text>
                <Text style={styles.balanceAmount}>
                  {user.balance.toLocaleString()} VND
                </Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => navigation.navigate('AddMoney', {user})}>
                  <Text style={styles.addButtonText}>Add money</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Icon
                  name="angle-right"
                  style={styles.iconArrow}
                  size={30}
                  color={'white'}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.starsCardWrapper}
              onPress={() => navigation.navigate('MembershipDetail', {user})}>
              <View style={styles.starsCard}>
                <Text style={styles.starsTitle}>STARS</Text>
                <Text style={styles.starsAmount}>{user.stars.toFixed(2)}</Text>
                <Text style={styles.starsSubtitle}>
                  {20 - user.stars.toFixed(2)} star(s) until next reward
                </Text>
              </View>
              <View>
                <Icon
                  name="angle-right"
                  style={styles.iconArrow}
                  size={30}
                  color={'white'}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Vouchers Section */}
          <View style={styles.voucherSection}>
            <Image
              style={styles.iconGift}
              source={require('../../../assets/img/iconGift.png')}
              resizeMode="contain"
            />
            <Text style={styles.voucherText}>
              You have {user.vouchers.length} available voucher(s)
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Card', {user})}>
              <Icon
                name="angle-right"
                style={styles.iconArrow}
                size={30}
                color={'white'}
              />
            </TouchableOpacity>
          </View>

          {/* Order Again Section */}
          <View style={styles.orderAgainSection}>
            <Text style={styles.orderAgainTitle}>ORDER AGAIN?</Text>
            <Text
              style={styles.orderAgainDetails}
              numberOfLines={1}
              ellipsizeMode="tail">
              2 Item(s) | x1 Green Tea Cream Frappuccino L, x1 Americano Cold M
            </Text>
            <TouchableOpacity
              style={styles.reorderButton}
              onPress={() => navigation.navigate('ReviewOrderScreen')}>
              <Text style={styles.reorderButtonText}>Reorder</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={news}
            renderItem={renderNews}
            keyExtractor={item => item.key}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.drinksSection}
          />

          {/* Card Section */}
        </ScrollView>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={() => navigation.navigate('Card')}>
          <Text style={styles.cardButtonText}>
            {user.balance.toLocaleString()} VND{'\n'}on card
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
};
const {width, height} = Dimensions.get('window');
const scale = size => (width / 375) * size;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    paddingVertical: scale(20),
  },
  loading: {
    justifyContent: 'center',
    verticalAlign: 'middle',
  },
  greetingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(20),
    paddingHorizontal: scale(20),
  },
  greetingText: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: colorTheme.greenText,
  },
  balanceStarsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(10),
  },
  balanceCardWrapper: {
    flex: 1,
    backgroundColor: '#7ec479',
    padding: scale(15),
    marginRight: scale(5),
    flexDirection: 'row',
  },
  balanceCard: {},
  iconArrow: {
    marginLeft: scale(10),
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  balanceTitle: {
    fontSize: scale(17),
    fontWeight: 'bold',
    color: '#eeefab',
  },
  balanceAmount: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: scale(5),
  },
  addButton: {
    backgroundColor: '#7ec479',
    paddingVertical: scale(7),
    width: scale(120),
    borderRadius: scale(25),
    borderWidth: scale(2),
    borderColor: 'white',
    alignItems: 'center',
    marginTop: scale(7),
  },
  addButtonText: {
    fontSize: scale(14),
    color: 'white',
    fontWeight: 'bold',
  },
  starsCardWrapper: {
    flex: 1,
    backgroundColor: '#7ec479',
    padding: scale(15),
    marginLeft: scale(10),
    flexDirection: 'row',
  },
  starsCard: {},
  starsTitle: {
    fontSize: scale(17),
    fontWeight: 'bold',
    color: '#eeefab',
  },
  starsAmount: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: scale(5),
  },
  starsSubtitle: {
    fontSize: scale(12),
    width: scale(120),
    color: '#eeefab',
  },
  voucherSection: {
    backgroundColor: '#f79814',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingVertical: scale(13),
    marginBottom: scale(10),
    flexDirection: 'row',
  },
  iconGift: {
    width: scale(50),
    height: scale(50),
    marginTop: scale(8),
  },
  voucherText: {
    fontSize: scale(14),
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#fff',
    marginVertical: 'auto',
  },
  orderAgainSection: {
    backgroundColor: '#7ec479',
    padding: scale(15),
    marginBottom: scale(10),
  },
  orderAgainTitle: {
    fontSize: scale(14),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: scale(10),
  },
  orderAgainDetails: {
    fontSize: scale(12),
    color: '#fff',
    marginBottom: scale(10),
  },
  orderImages: {
    flexDirection: 'row',
    marginBottom: scale(10),
  },
  orderImage: {
    width: scale(50),
    height: scale(50),
    marginRight: scale(10),
    borderRadius: scale(25),
  },
  reorderButton: {
    backgroundColor: '#7ec479',
    paddingVertical: scale(7),
    width: scale(120),
    borderRadius: scale(25),
    borderWidth: scale(1),
    borderColor: 'white',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  reorderButtonText: {
    fontSize: scale(14),
    color: '#fff',
    fontWeight: 'bold',
  },
  drinksSection: {
    // paddingRight: scale(10),
  },
  drinkCard: {
    backgroundColor: '#fff',
    borderRadius: scale(10),
    width: scale(210),
    height: scale(220),
    alignItems: 'center',
    marginHorizontal: scale(10),
  },
  drinkImage: {
    width: scale(210),
    height: scale(120),
    borderRadius: scale(10),
    marginBottom: scale(10),
  },
  drinkTitle: {
    fontSize: scale(14),
    fontWeight: 'bold',
    color: '#568f56',
    textAlign: 'center',
    marginBottom: scale(5),
  },
  drinkDescription: {
    fontSize: scale(12),
    color: '#888',
    textAlign: 'center',
    marginBottom: scale(10),
  },
  cardButton: {
    position: 'absolute',
    width: scale(170),
    backgroundColor: '#7ec479',
    paddingVertical: scale(15),
    paddingHorizontal: scale(20),
    borderRadius: scale(25),
    bottom: scale(10),
    right: scale(20),
  },
  cardButtonText: {
    fontSize: scale(16),
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
