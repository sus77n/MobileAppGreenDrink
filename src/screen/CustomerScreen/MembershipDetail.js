import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { colorTheme, PayInStoreTop } from '../../component/store';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MembershipDetail = ({ navigation }) => {
  const progress = 7 / 20;
  return (
    <SafeAreaView style={styles.container}>
      <PayInStoreTop navigation={navigation} text={'Membership detail'}/>
      <View style={styles.cardSection}>
        <View style={styles.cardTitleWrap}>
          <Text style={styles.cardTitle}>Gold member</Text>
          <Icon name='crown' size={25} color={colorTheme.orangeText} style={{marginLeft: 10}} />
        </View>
        <View style={styles.cardMain}>
          <View style={styles.rewards}>
            <Text style={styles.subTitle}>Rewards</Text>
            <View style={styles.rewardWrap}>
              <Text style={styles.twenty}>
                <Text style={styles.amountReward}>7/</Text>
                20
              </Text>
              <Icon
                name="star"
                color={colorTheme.orangeText}
                size={20}
                style={{ marginLeft: 5, marginTop: 8 }}
              />
            </View>
          </View>
          <View style={styles.star}>
            <Text style={styles.subTitle}>Total stars</Text>
            <View style={styles.rewardWrap}>
              <Text style={styles.amountStars}>
                50
              </Text>
              <Icon
                name="star"
                color={colorTheme.orangeText}
                size={20}
                style={{ marginLeft: 5, marginTop: 8 }}
              />
            </View>
          </View>
        </View>
        <Progress.Bar progress={progress} borderRadius={20} width={320} height={20} color={colorTheme.orangeText} style={styles.bar}/>
        <Text style={styles.note}>
            Earn 13 star(s) to get 1 drink S size FREE
        </Text>
      </View>
      <View style={styles.membership}>
        <View style={styles.membershipDetailWrap}>
            <Icon name='crown' size={25} color={colorTheme.copper} style={{    marginLeft: 'auto',
    marginRight: 'auto'}} />
            <Text style={[styles.membershipTitle, {color: colorTheme.copper}]}>Copper member</Text>
            <Text style={styles.membershipContent}>- Discount 5%</Text>
        </View>
        <View style={styles.membershipDetailWrap}>
            <Icon name='crown' size={25} color={colorTheme.silver} style={{    marginLeft: 'auto',
    marginRight: 'auto'}} />
            <Text style={[styles.membershipTitle, {color: colorTheme.silver}]}>Silver member</Text>
            <Text style={styles.membershipContent}>- Discount 5%</Text>
        </View>
      </View>
      <View style={[styles.membership, {marginTop: 20}]}>
        <View style={styles.membershipDetailWrap}>
            <Icon name='crown' size={25} color={colorTheme.gold} style={{    marginLeft: 'auto',
    marginRight: 'auto'}} />
            <Text style={[styles.membershipTitle, {color: colorTheme.gold}]}>Copper member</Text>
            <Text style={styles.membershipContent}>- Discount 5%</Text>
        </View>
        <View style={styles.membershipDetailWrap}>
            <Icon name='crown' size={25} color={colorTheme.diamond} style={{    marginLeft: 'auto',
    marginRight: 'auto'}} />
            <Text style={[styles.membershipTitle, {color: colorTheme.diamond}]}>Silver member</Text>
            <Text style={styles.membershipContent}>- Discount 5%</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');
const scale = size => (width / 375) * size;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.grayBackground,
  },

  cardSection: {
    backgroundColor: colorTheme.darkGrayBackground,
    paddingVertical: scale(15),  // Scaled padding
    margin: scale(17),          // Scaled margin
    borderRadius: scale(10),    // Scaled border radius
  },
  cardTitleWrap: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: scale(15),   // Scaled padding bottom
    paddingLeft: scale(20),     // Scaled padding left
    borderColor: colorTheme.grayLine,
  },
  cardTitle: {
    color: colorTheme.orangeText,
    fontWeight: '700',
    fontSize: scale(20),        // Scaled font size
  },
  iconMember: {},

  cardMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(10),         // Scaled padding
  },

  rewards: {
    paddingLeft: scale(20),     // Scaled padding left
  },

  subTitle: {
    color: colorTheme.grayText,
    fontSize: scale(16),        // Scaled font size
    paddingBottom: scale(7),    // Scaled padding bottom
  },

  rewardWrap: {
    flexDirection: 'row',
  },

  amountReward: {
    color: colorTheme.white,
    fontSize: scale(25),        // Scaled font size
  },

  twenty: {
    color: colorTheme.orangeText,
    fontSize: scale(20),        // Scaled font size
    fontWeight: '700',
  },

  star: {
    marginRight: scale(20),     // Scaled margin right
  },

  amountStars: {
    color: colorTheme.orangeText,
    fontSize: scale(25),        // Scaled font size
    fontWeight: '700',
  },

  bar: {
    marginLeft: scale(30),      // Scaled margin left
  },

  note: {
    color: colorTheme.grayText,
    fontSize: scale(12),        // Scaled font size
    marginLeft: scale(30),      // Scaled margin left
    marginTop: scale(10),       // Scaled margin top
  },

  membership: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(20),// Scaled margin horizontal
  },

  membershipDetailWrap: {
    width: scale(180),          // Scaled width
    borderWidth: 1,
    borderRadius: scale(20),    // Scaled border radius
    paddingHorizontal: scale(20), // Scaled padding horizontal
  },

  membershipTitle: {
    fontSize: scale(17),        // Scaled font size
    fontWeight: '500',
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  membershipContent: {
    color: colorTheme.black,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});


export default MembershipDetail;
