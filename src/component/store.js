import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from '@react-native-firebase/firestore';
import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

export const PayInStoreTop = ({ navigation, text }) => {
  const styles = StyleSheet.create({
    top: {
      flexDirection: 'row',
      backgroundColor: 'white',
      justifyContent: 'space-between',
      height: 70,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 5 },
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

export const TopGoBack = ({ navigation, text }) => {
  const styles = StyleSheet.create({
    top: {
      flexDirection: 'row',
      backgroundColor: 'white',
      height: 70,
      elevation: 5,
      paddingLeft: 20,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 5 },
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

export const setUserStorage = async (user) => {
  try {
    await AsyncStorage.setItem('User', JSON.stringify(user));
  } catch (error) {
    console.log('Error when store user: ' + error);
  }
}

export const getTimeNow = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  const formattedDate = `${now.getDate()}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
  return `as of ${formattedTime}, ${formattedDate}`;
}

export const resetUserAfterChange = async (userKey) => {
  try {
    const userDoc = await getFirestore().collection("customers").doc(userKey).get();
    if (userDoc.exists) {
      const userData = userDoc.data(); // Get user data
      setUserStorage({ ...userData, key: userKey }); // Add key if needed
    } else {
      console.error("No user found with the given key.");
    }
  } catch (error) {
    console.error("Error resetting user data:", error);
  }

}

export const adminId = "6d0GeGvHvqdWu7wylZ72K1EiE9o2";
export const webClientId = "1046745299175-5b64vsicc0k21kck5c2ctpr607v39270.apps.googleusercontent.com";
export const GOOGLE_MAPS_APIKEY = 'AIzaSyCKRP7vSTDKCWUu9DYYyBtkcUPpVOBkTYk';

export const calculateTotal = async (drinks) => {
  let newTotal = 0;

  // Fetch the base price for each drink
  const drinkKeys = Object.keys(drinks); // Assuming `drinks` is an object with drink keys
  for (const i of drinkKeys) {
    const drinkData = drinks[i];
    const { key, custom, quantity } = drinkData;

    try {
      // Fetch the drink document from Firestore
      const drinkSnapshot = await getFirestore().collection('drinks').doc(key).get();
      if (drinkSnapshot.exists) {
        const drinkInfo = drinkSnapshot.data();
        const basePrice = drinkInfo.price || 0; // Fallback to 0 if price isn't available

        // Add to total
        newTotal += (basePrice) * quantity;
      }
    } catch (error) {
      console.error(`Error fetching drink data for ${drinkId}:`, error);
    }
  }

  // Update the total state
  setTotal(newTotal);
};

export const LoadingScreen = ({ visible }) => {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    load: {
      width: 80,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colorTheme.grayBackground,
      borderRadius: 10,
    },
  })

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType='fade'
      statusBarTranslucent
    >
      <View style={styles.container}>
        <View style={styles.load}>
          <ActivityIndicator size="large" color={colorTheme.greenBackground}></ActivityIndicator>
        </View>
      </View>
    </Modal>
  )
}