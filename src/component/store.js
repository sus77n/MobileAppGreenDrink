import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export const colorTheme = {
  greenBackground: '#7ec479',
  greenText: '#568f56',
  orangeBackground: '#f79814',
  orangeText: '#fabe11',
  grayBackground: '#f5f5f5',
  grayText: '#9d9d9d',
  white: '#ffffff',
  black: '#000000',
  darkGrayBackground: '#333333',
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
  );
};
