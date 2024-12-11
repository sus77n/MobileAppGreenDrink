import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import {colorTheme} from '../../component/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get('window');
const scale = size => (width / 375) * size;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.white,
  },
  filter: {
    paddingVertical: scale(12), 
    backgroundColor: colorTheme.white,
  },
  scrollContainer: {
    flexDirection: 'row',
    paddingHorizontal: scale(8), 
  },
  filterButton: {
    paddingVertical: scale(10), 
    paddingHorizontal: scale(20),
    marginRight: scale(8),
    borderRadius: scale(20),
    borderWidth: scale(1),
    borderColor: colorTheme.greenBackground,
  },
  filterButtonSelected: {
    backgroundColor: colorTheme.greenBackground,
  },
  filterButtonText: {
    fontSize: scale(14), 
    color: colorTheme.greenText,
    fontWeight: '500',
  },
  filterButtonTextSelected: {
    color: colorTheme.white,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: scale(6), 
    borderColor: colorTheme.greenBackground,
    backgroundColor: colorTheme.white,
  },
  actionButton: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(12),
    marginRight: scale(16), 
    borderRadius: scale(25),
    backgroundColor: colorTheme.greenBackground,
  },
  main: {
    paddingHorizontal: scale(15), 
    paddingVertical: scale(12),
  },
  drinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWrap: {
    left: scale(9), 
    zIndex: 1,
    backgroundColor: colorTheme.white,
    paddingHorizontal: scale(28), 
    paddingVertical: scale(16), 
    borderRadius: scale(100),
  },
  img: {
    width: scale(30), 
    height: scale(55),
  },
  nameWrap: {
    zIndex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    left: scale(-85), 
    paddingVertical: scale(40), 
  },
  name: {
    width: '60%',
    fontSize: scale(14), // Scaling font size
    fontWeight: '600',
    textAlign: 'center',
    color: colorTheme.greenText,
    left: scale(-1), // Adjusted for responsiveness
  },
});


const ManageProduct = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedDrinkIds, setSelectedDrinkIds] = useState([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const [backPressCount, setBackPressCount] = useState(0);

  useEffect(() => {
    const backAction = () => {
      if (backPressCount === 0) {
        setBackPressCount(1); 
        ToastAndroid.show('Back one more time to exit', ToastAndroid.SHORT);
        setTimeout(() => setBackPressCount(0), 2000); 
        return true;
      } else {
        BackHandler.exitApp();
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [backPressCount]);
  
  useEffect(() => {
    const subscriber = firestore()
      .collection('categories')
      .onSnapshot(querySnapshot => {
        const categories = [];
        querySnapshot.forEach(documentSnapshot => {
          categories.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id, // Ensure each category has a unique key
          });
        });
        categories.unshift({name: 'All', key: 'all', img: ''});
        setCategories(categories); // Set the categories as an array
        setLoading(false);
      });

    return () => subscriber(); // Unsubscribe when no longer in use
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('drinks')
      .onSnapshot(querySnapshot => {
        const drinks = [];
        querySnapshot.forEach(documentSnapshot => {
          drinks.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setDrinks(drinks);
        setFilteredDrinks(drinks); // Initialize with all drinks
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  const filterDrinks = type => {
    setSelectedFilter(type);
    if (type === 'All') {
      setFilteredDrinks(drinks);
    } else {
      setFilteredDrinks(drinks.filter(drink => drink.category === type));
    }
  };

  const renderFilterButton = label => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === label && styles.filterButtonSelected,
      ]}
      onPress={() => filterDrinks(label)}>
      <Text
        style={[
          styles.filterButtonText,
          selectedFilter === label && styles.filterButtonTextSelected,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderDrink = ({item: drink, index}) => (
    <TouchableOpacity
      style={[
        styles.drinkRow,
        selectedDrinkIds.includes(drink.key) && {
          backgroundColor: colorTheme.greenBackground,
        },
      ]}
      onPress={() => {
        selectionMode
          ? toggleSelectDrink(drink.key)
          : navigation.navigate('Edit', {drink});
      }}>
      <View style={styles.imageWrap}>
        <Image source={{uri: drink.img}} style={styles.img} />
      </View>
      <View
        style={[
          styles.nameWrap,
          {
            backgroundColor:
              index % 2 === 0
                ? colorTheme.greenBackgroundDrink
                : colorTheme.white,
          },
        ]}>
        <Text style={styles.name}>{drink.name}</Text>
        {selectionMode ? (
          <Icon
            name={
              selectedDrinkIds.includes(drink.key)
                ? 'check-square-o'
                : 'square-o'
            }
            size={20}
            color={colorTheme.greenText}
            style={{marginRight: '8%'}}
          />
        ) : (
            <Icon
              name="pencil"
              color={colorTheme.greenText}
              size={20}
              style={{marginRight: '8%'}}
            />
        )}
      </View>
    </TouchableOpacity>
  );
  const toggleSelectDrink = drinkId => {
    if (selectionMode) {
      setSelectedDrinkIds(prevSelected =>
        prevSelected.includes(drinkId)
          ? prevSelected.filter(id => id !== drinkId)
          : [...prevSelected, drinkId],
      );
    }
  };

  const deleteSelectedDrinks = () => {
    if (selectedDrinkIds.length === 0) {
      Alert.alert('No selection', 'Please select drinks to delete.');
      return;
    }

    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete these drinks?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            selectedDrinkIds.forEach(drinkId => {
              firestore().collection('drinks').doc(drinkId).delete();
            });
            setSelectedDrinkIds([]);
          },
        },
      ],
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filter}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          {categories.map(category => renderFilterButton(category.name))}
        </ScrollView>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Add')}>
          <Icon name="plus" color={colorTheme.white} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setSelectionMode(!selectionMode)}>
          {selectionMode ? (
            <Icon name="times" color={colorTheme.white} size={20} />
          ) : (
            <Icon name="navicon" color={colorTheme.white} size={20} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={deleteSelectedDrinks}>
          <Icon name="trash" color={colorTheme.white} size={20} />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.main}
        data={filteredDrinks}
        renderItem={renderDrink}
        keyExtractor={(item) => {item.key}}
      />
    </SafeAreaView>
  );
};

export default ManageProduct;
