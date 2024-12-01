import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const colorTheme = {
  lightGreeenBackground: '#87e281',
  greenBackground: '#7ec479',
  greenText: '#568f56',
  greenBackgroundDrink: '#e1ead4',
  orangeBackground: '#f79814',
  orangeText: '#fabe11',
  grayBackground: '#f5f5f5',
  grayText: '#9d9d9d',
  darkGrayBackground: '#333333',
  white: '#ffffff',
  black: '#000000',
  grayLine: '#9d9d9d',
  copper: '#e08d59',
  silver: '#9d9d9d',
  gold: '#fabe11',
  diamond: '#3ea8ff',

};

export const PayInStoreTop = ({navigation, text}) => {
  const styles = StyleSheet.create({
    top: {
      flexDirection: 'row',
      backgroundColor: 'white',
      justifyContent: 'space-between',
      height: 70,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {width: 2, height: 5},
      shadowOpacity: 0.25,
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
  });

  return (
    <View style={styles.top}>
      <Text style={styles.title}>{text}</Text>
      <TouchableOpacity onPress={() => {
        navigation.popToTop();
      }}>
        <Text style={styles.iconClose}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

export const TopGoBack = ({navigation, text}) => {
  const styles = StyleSheet.create({
    top: {
      flexDirection: 'row',
      backgroundColor: 'white',
      height: 70,
      elevation: 5,
      paddingLeft: 20,
      shadowColor: '#000',
      shadowOffset: {width: 2, height: 5},
      shadowOpacity: 0.25,
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      color: '#568f56',
      paddingRight: 20,
      fontWeight: 'bold',
    },
    iconBack: {
      marginRight: 30,
    },
  });

  return (
    <View style={styles.top}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          name="angle-left"
          color={colorTheme.greenText}
          size={30}
          style={styles.iconBack}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
};

export const getUser = async () => {
  try {
    const storedUser = await AsyncStorage.getItem('User');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.log('Error when getting user:', error);
    return null;
  }
};

