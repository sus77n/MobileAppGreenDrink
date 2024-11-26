import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colorTheme, PayInStoreTop } from '../component/store';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.grayBackground,
  },
  
  cardSection: {
    backgroundColor: colorTheme.darkGrayBackground,
    paddingVertical: 15,
    margin: 17,
    borderRadius: 10,
  },
  cardTitleWrap: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 15,
    paddingLeft: 20,
    borderColor: colorTheme.grayLine,
  },
  cardTitle: {
    color: colorTheme.orangeText,
    fontWeight: '700',
    fontSize: 20,
  },
  iconMember: {},

  cardMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },

  rewards: {
    paddingLeft: 20,
  },

  subTitle: {
    color: colorTheme.grayText,
    fontSize: 16,
    paddingBottom: 7,
  },

  rewardWrap: {
    flexDirection: 'row',
  },

  amountReward: {
    color: colorTheme.white,
    fontSize: 25,
  },

  twenty: {
    color: colorTheme.orangeText,
    fontSize: 20,
    fontWeight: '700',
  },

  star: {
    marginRight: 20,
  },

  amountStars: {
    color: colorTheme.orangeText,
    fontSize: 25,
    fontWeight: '700',
  },
  bar:{
    marginLeft: 30,
  },
  note:{
    color: colorTheme.grayText,
    fontSize: 12,
    marginLeft: 30,
    marginTop: 10,
  },
  membership:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  membershipDetailWrap:{
    width: 180,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  membershipTitle:{
    fontSize: 17,
    fontWeight: '500',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  membershipContent:{
    color: colorTheme.black,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

export default MembershipDetail;
