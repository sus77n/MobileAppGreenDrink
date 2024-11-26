import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingText}>Good morning, Peter! 🌞</Text>
          <TouchableOpacity>
            <Text style={styles.mailIcon}>📩</Text>
          </TouchableOpacity>
        </View>

        {/* Balance and Stars Section */}
        <View style={styles.balanceStarsSection}>
          <View style={styles.balanceCardWrapper}>
            <View style={styles.balanceCard}>
              <Text style={styles.balanceTitle}>BALANCE</Text>
              <Text style={styles.balanceAmount}>₫20,000</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add money</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Card')}>
              <Icon name='angle-right' style={styles.iconArrow} size={30} color={'white'} />
            </TouchableOpacity>
          </View>

          <View style={styles.starsCardWrapper}>
            <View style={styles.starsCard}>
              <Text style={styles.starsTitle}>STARS</Text>
              <Text style={styles.starsAmount}>7</Text>
              <Text style={styles.starsSubtitle}>
                13 star(s) until next reward
              </Text>
            </View>
            <TouchableOpacity>
              <Icon name='angle-right' style={styles.iconArrow} size={30} color={'white'} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Vouchers Section */}
        <View style={styles.voucherSection}>
          <Image
            style={styles.iconGift}
            source={require('../../assets/img/iconGift.png')}
            resizeMode='contain'
          />
          <Text style={styles.voucherText}>
            You have 1 available voucher(s)
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Card')}>
            <Icon name='angle-right' style={styles.iconArrow} size={30} color={'white'} />
          </TouchableOpacity>
        </View>

        {/* Order Again Section */}
        <View style={styles.orderAgainSection}>
          <Text style={styles.orderAgainTitle}>ORDER AGAIN?</Text>
          <Text style={styles.orderAgainDetails} numberOfLines={1} ellipsizeMode='tail'>
            2 Item(s) | x1 Green Tea Cream Frappuccino L, x1 Americano Cold M
          </Text>
          <TouchableOpacity style={styles.reorderButton}>
            <Text style={styles.reorderButtonText}>Reorder</Text>
          </TouchableOpacity>
        </View>

        {/* Suggested Drinks Section */}
        <View style={styles.drinksSection}>
          <View style={styles.drinkCard}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }}
              style={styles.drinkImage}
            />
            <Text style={styles.drinkTitle}>Zesty Lemonade Fizz</Text>
            <Text style={styles.drinkDescription}>
              Bursting with the tang of freshly squeezed lemons, paired with a
              fizzing soda base.
            </Text>
          </View>
        </View>
        {/* Card Section */}
        <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('Card')}>
          <Text style={styles.cardButtonText}>₫20,000 on card</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    paddingVertical: 20,
  },
  greetingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#568f56',
  },

  balanceStarsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  balanceCardWrapper: {
    flex: 1,
    backgroundColor: '#7ec479',
    padding: 15,
    marginRight: 5,
    flexDirection: 'row',
  },
  balanceCard: {

  },

  iconArrow: {
    marginLeft: 10,
    marginTop: 'auto',
    marginBottom: 'auto',
  },

  balanceTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#eeefab',
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: '#7ec479',
    paddingVertical: 7,
    width: 120,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    marginTop: 7,
  },
  addButtonText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  starsCardWrapper: {
    flex: 1,
    backgroundColor: '#7ec479',
    padding: 15,
    marginLeft: 10,
    flexDirection: 'row',
  },
  starsCard: {

  },
  starsTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#eeefab',
  },
  starsAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 5,
  },
  starsSubtitle: {
    fontSize: 12,
    width: 120,
    color: '#eeefab',
  },
  voucherSection: {
    backgroundColor: '#f79814',
    justifyContent: "center",
    paddingHorizontal: "auto",
    paddingVertical: 8,
    marginBottom: 10,
    flexDirection: 'row',
  },
  iconGift: {
    marginRight: 10,
    width: 50,
    height: 50,
    marginTop: 8,
  },
  voucherText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#fff',
    marginRight: 10,
    marginVertical: "auto",
  },
  orderAgainSection: {
    backgroundColor: '#7ec479',
    padding: 15,
    marginBottom: 10,
  },
  orderAgainTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  orderAgainDetails: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 10,
  },
  orderImages: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  orderImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  reorderButton: {
    backgroundColor: '#7ec479',
    paddingVertical: 7,
    width: 120,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  reorderButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  drinksSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  drinkCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '60%',
    alignItems: 'center',
  },
  drinkImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  drinkTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#568f56',
    textAlign: 'center',
    marginBottom: 5,
  },
  drinkDescription: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardButton: {
    position: 'absolute',
    width: 170,
    backgroundColor: '#7ec479',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    bottom: 10,
    right: 20,
  },
  cardButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
