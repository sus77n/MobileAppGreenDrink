import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colorTheme} from '../component/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressBarAndroid from 'react-native-community'

const MembershipDetail = ({navigation}) => {
    const progress = 7/20;
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
      <View style={styles.cardSection}>
        <View style={styles.cardTitleWrap}>
          <Text style={styles.cardTitle}>Gold member</Text>
          <Image style={styles.iconMember} />
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
                style={{marginLeft: 5, marginTop: 8}}
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
                style={{marginLeft: 5, marginTop: 8}}
              />
            </View>
          </View>
        </View>
        <ProgressBarAndroid 
        styleAttr="Horizontal"
        indeterminate={false}
        progress={progress}
        color="#FFD700"
        style={styles.progressBar}
      />
      </View>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#568f56',
    paddingLeft: 20,
    fontWeight: 'bold',
  },

  iconClose: {
    paddingRight: 20,
    fontSize: 20,
    fontWeight: '400',
    color: colorTheme.greenText,
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
  }
});

export default MembershipDetail;
