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
} from 'react-native';
import {colorTheme} from '../component/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.white,
  },
  filter: {
    paddingVertical: '3%',
    backgroundColor: colorTheme.white,
  },
  scrollContainer: {
    flexDirection: 'row',
    paddingHorizontal: '2%',
  },
  filterButton: {
    paddingVertical: 10, //can not use %, it can not slide to
    paddingHorizontal: 20,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colorTheme.greenBackground,
  },
  filterButtonSelected: {
    backgroundColor: colorTheme.greenBackground,
  },
  filterButtonText: {
    fontSize: 14,
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
    paddingVertical: '1%',
    borderColor: colorTheme.greenBackground,
    backgroundColor: colorTheme.white,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: '4%',
    borderRadius: 25,
    backgroundColor: colorTheme.greenBackground,
  },
  main: {
    paddingHorizontal: '4%',
    paddingVertical: '3%',
  },
  drinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWrap: {
    left: '3%',
    zIndex: 1,
    backgroundColor: colorTheme.white,
    paddingHorizontal: '7%',
    paddingVertical: '4%',
    borderRadius: 100,
  },
  img: {
    width: 30,
    height: 55,
  },
  nameWrap: {
    zIndex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    left: '-22%',
    paddingVertical: '11%',
  },
  name: {
    width: '60%',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: colorTheme.greenText,
    left: '-1%',
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
          <TouchableOpacity>
            <Icon
              name="pencil"
              color={colorTheme.greenText}
              size={20}
              style={{marginRight: '8%'}}
            />
          </TouchableOpacity>
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
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  );
};

export default ManageProduct;
