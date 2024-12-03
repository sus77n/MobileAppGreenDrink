import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import 'react-native-gesture-handler';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {colorTheme} from '../component/store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

const ManagerStore = ({navigation}) => {
  const [region, setRegion] = useState({
    latitude: 11.053818758889006,
    longitude: 106.66820561894689,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [locations, setLocation] = useState([]);
  const [selectionMode, setSelectionMode] = useState(false);

  const renderLocation = ({item: store}) => {
    return (
      <TouchableOpacity
        style={styles.locationCard}
        onPress={() =>
          setRegion({
            latitude: store.latitude,
            longitude: store.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          })
        }>
        <Text style={styles.address}>{store.name}</Text>
        <Text style={styles.drinks}>{store.address}</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.contactBtn} onPress={() => {}}>
            <Text style={styles.contactText}>Phone: {store.contact}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate('EditStore', {store})}>
            <Icon name="pencil" color={colorTheme.greenBackground} size={30} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      const subscriber = firestore()
        .collection('storeLocations')
        .onSnapshot(querySnapshot => {
          const storeLocations = [];

          querySnapshot.forEach(documentSnapshot => {
            storeLocations.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          storeLocations.forEach((location, index) => {
            console.log(location);
          });

          setLocation(storeLocations);
        });

      return () => subscriber();
    });

    return () => focusListener();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find a store</Text>
      <View style={styles.coverMap}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 11.053818758889006,
            longitude: 106.66820561894689,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={region}
          showsUserLocation={true}>
          {locations.map((location, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(location.latitude),
                longitude: parseFloat(location.longitude),
              }}
              title={location.name}
              description={location.address}
            />
          ))}
        </MapView>
      </View>
      <View style={styles.nearbyBlock}>
        <View style={styles.row}>
          <Text style={styles.title}>Existed Stores</Text>
          <View>
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
        </View>

        {locations.length === 0 ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator
              size="large"
              color={colorTheme.greenBackground}
            />
            <Text>Loading location...</Text>
          </View>
        ) : (
          <FlatList
            data={locations}
            renderItem={renderLocation}
            keyExtractor={item => item.name}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  coverMap: {
    height: '50%',
    width: '100%',
    marginVertical: '4%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: '5%',
    marginTop: '5%',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nearbyBlock: {
    flex: 1,
  },
  locationCard: {
    marginVertical: '3%',
    backgroundColor: colorTheme.grayBackground,
    borderRadius: 10,
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
  address: {
    fontSize: 15,
    fontWeight: '700',
    color: colorTheme.greenText,
    marginVertical: '3%',
  },
  contactBtn: {
    backgroundColor: colorTheme.grayBackground,
    paddingVertical: '4%',
    paddingHorizontal: '5%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colorTheme.greenBackground,
    alignItems: 'center',
  },
  contactText: {
    fontSize: 14,
    color: colorTheme.greenBackground,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '4%',
  },
  editBtn: {
    borderWidth: 1,
    borderColor: colorTheme.greenBackground,
    padding: '3%',
    borderRadius: 50,
  },
});

export default ManagerStore;
