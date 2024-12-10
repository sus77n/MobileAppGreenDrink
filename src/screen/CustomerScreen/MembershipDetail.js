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
import { colorTheme, TopGoBack } from '../../component/store';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MembershipDetail = ({ navigation, route}) => {
  const {user} = route.params
  const progress = user.stars.toFixed(2) / 20;
  return (
    <SafeAreaView style={styles.container}>
      <TopGoBack navigation={navigation} text={'Membership detail'}/>
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
                <Text style={styles.amountReward}>{user.stars.toFixed(2)}/</Text>
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
                {user.totalStars.toFixed(2)}
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
            Earn {20 - user.stars} star(s) to get 1 drink free
        </Text>
      </View>
      <View style={styles.membership}>
        <View style={styles.membershipDetailWrap}>
            <Icon name='crown' size={25} color={colorTheme.silver} style={{    marginLeft: 'auto',
    marginRight: 'auto'}} />
            <Text style={[styles.membershipTitle, {color: colorTheme.silver}]}>Copper member</Text>
            <Text style={styles.membershipContent}>- Discount 5%</Text>
        </View>
        <View style={styles.membershipDetailWrap}>
            <Icon name='crown' size={25} color={colorTheme.gold} style={{    marginLeft: 'auto',
    marginRight: 'auto'}} />
            <Text style={[styles.membershipTitle, {color: colorTheme.gold}]}>Gold member</Text>
            <Text style={styles.membershipContent}>- Discount 10%</Text>
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
    paddingVertical: scale(15),  
    margin: scale(17),          
    borderRadius: scale(10),    
  },
  cardTitleWrap: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: scale(15),   
    paddingLeft: scale(20),    
    borderColor: colorTheme.grayLine,
  },
  cardTitle: {
    color: colorTheme.orangeText,
    fontWeight: '700',
    fontSize: scale(20),       
  },
  cardMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(10),       
  },

  rewards: {
    paddingLeft: scale(20),     
  },

  subTitle: {
    color: colorTheme.grayText,
    fontSize: scale(16),        
    paddingBottom: scale(7),    
  },

  rewardWrap: {
    flexDirection: 'row',
  },

  amountReward: {
    color: colorTheme.white,
    fontSize: scale(25),       
  },

  twenty: {
    color: colorTheme.orangeText,
    fontSize: scale(20),       
    fontWeight: '700',
  },

  star: {
    marginRight: scale(20),    
  },

  amountStars: {
    color: colorTheme.orangeText,
    fontSize: scale(25),       
    fontWeight: '700',
  },

  bar: {
    marginLeft: scale(30),    
  },

  note: {
    color: colorTheme.grayText,
    fontSize: scale(12),        
    marginLeft: scale(30),      
    marginTop: scale(10),       
  },

  membership: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(20),
  },

  membershipDetailWrap: {       
    borderWidth: 1,
    borderRadius: scale(20),    
    width: scale(150)
  },

  membershipTitle: {
    fontSize: scale(17),      
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
