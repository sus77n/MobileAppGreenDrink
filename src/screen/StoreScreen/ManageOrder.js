import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Dimensions,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox'; // Correct import for CheckBox
import { colorTheme, TopGoBack } from '../../component/store';
import { getFirestore } from '@react-native-firebase/firestore';

const ManageOrder = ({ navigation, route }) => {
  const { transaction } = route.params;

  const [drinks, setDrinks] = useState(transaction.drinks); // Get drinks list
  const [user, setUser] = useState({});

  const handleTransactionStatus = (transactionId, newStatus) => {
    const transactionRef = getFirestore()
      .collection('transactions')
      .where('transID', '==', transactionId)
      .limit(1); // Make sure the query returns only one result

    transactionRef.get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          const transactionDoc = querySnapshot.docs[0];
          transactionDoc.ref.update({
            status: newStatus,
          })
            .then(() => {
              console.log('Transaction status updated in Firestore');
            })
            .catch((error) => {
              console.error('Error updating status in Firestore: ', error);
            });
        } else {
          console.log('Transaction not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching transaction from Firestore: ', error);
      });
  };

  const renderDrinkItem = ({ item, index }) => {
    return (
      <View style={styles.drinkRow}>
        <View style={styles.drinkInfo}>
          <Text style={styles.drinkName}>
            {item.quantity} x {item.name} - {item.customization.size}
          </Text>
          <Text style={styles.drinkSweetness}>
            Sweetness: {item.customization.sweetness}
          </Text>
        </View>
        <View style={styles.priceDrinkContainer}>
          <Text style={styles.drinkPrice}>đ{item.price.toLocaleString()}</Text>
          <Text style={styles.totalPrice}>
            đ{(item.price * item.quantity).toLocaleString()}
          </Text>
        </View>
        {/* <CheckBox
        style={styles.checkbox}
        tintColors={{true: colorTheme.greenBackground, }}
          value={item.completed}
          onValueChange={() => handleDrinkCompletion(item.id)}
        /> */}
      </View>
    );
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const documentSnapshot = await getFirestore()
          .collection('customers')
          .doc(transaction.customerID)
          .get();
        if (documentSnapshot.exists) {
          const data = documentSnapshot.data();
          setUser(data);
        } else {
          console.log('No such document!');
        }
      } catch {
        console.error('Error fetching user data:', error);
      }
    };
    fetchCustomer()
  }, []);
  const formattedDate = transaction.createdAt
    ? transaction.createdAt.toDate().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    : "N/A";

  return (
    <SafeAreaView style={styles.container}>
      <TopGoBack navigation={navigation} text={transaction.id} />
      {/* Customer Info at the top */}
      <View style={styles.customerCard}>
        <Text style={styles.customerName}>Customer: {user.formOfAddress} {user.username}</Text>
        <Text style={styles.transInfor}>Phone: {user.phone}</Text>
        <Text style={styles.transInfor}>Transaction ID: {transaction.transID}</Text>
        <Text style={styles.transInfor}>Created At: {formattedDate}</Text>
        <Text>Store: {transaction.store}</Text>
      </View>

      {/* Drink List */}
      <FlatList
        data={drinks}
        renderItem={renderDrinkItem}
        // keyExtractor={({item}) => item.key}
        contentContainerStyle={styles.drinksList}
      />

      {/* Price Information at the bottom */}
      <View style={styles.priceContainer}>
        <View style={styles.rowPrice}>
          <View>
            <Text style={styles.totalText}>Price Before Promotion:</Text>
            <Text style={[styles.totalText, { color: 'black', marginTop: scale(10) }]}>Total Price:</Text>
          </View>
          <View>
            <Text style={styles.totalText}>
              đ{transaction.priceBeforePromotion.toLocaleString()}
            </Text>
            <Text style={[styles.totalText, { color: 'black', marginTop: scale(10) }]}>
              đ{transaction.price.toLocaleString()}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => {
            handleTransactionStatus(transaction.transID, 'Completed')
            Alert.alert('Transaction Completed');
            navigation.goBack();
          }}>
          <Text style={styles.completeButtonText}>Complete Transaction</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');
const scale = size => (width / 375) * size;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  customerCard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: scale(10),
    paddingBottom: scale(20),
    borderBottomWidth: scale(2),
    borderBottomColor: colorTheme.grayBackground,
  },
  customerName: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: colorTheme.greenText,
    marginBottom: scale(15),
  },
  transInfor: {
    marginBottom: scale(7)
  },
  drinksList: {
    paddingBottom: scale(20),
  },
  drinkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'top',
    paddingVertical: scale(20),
    paddingHorizontal: scale(20),
    marginBottom: scale(12),
    borderRadius: scale(8),
  },
  drinkName: {
    color: colorTheme.black,
    fontWeight: '500',
    fontSize: scale(16),
  },
  priceDrinkContainer: {
    textAlign: 'right',
  },
  drinkPrice: {
    color: colorTheme.black,
    fontWeight: '500',
    textAlign: 'right',
  },
  totalPrice: {
    textAlign: 'right',
  },
  rowPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    color: colorTheme.grayText,
    fontWeight: '600',
    fontSize: scale(17),
  },
  priceContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: scale(20),
    borderTopWidth: scale(1),
    borderTopColor: '#ddd',
  },
  completeButton: {
    backgroundColor: colorTheme.greenBackground,
    paddingVertical: scale(15),
    borderRadius: scale(8),
    marginTop: scale(15),
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ManageOrder;
