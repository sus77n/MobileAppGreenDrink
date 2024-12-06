import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { colorTheme, GOOGLE_MAPS_APIKEY } from '../component/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';


const ManagerStore = ({ navigation }) => {
  const [region, setRegion] = useState({
    latitude: 11.053818758889006,
    longitude: 106.66820561894689,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [locations, setLocation] = useState([]);
  const [userPosition, setUserPosition] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setUserPosition({ latitude, longitude });
        console.log("get user position successfully: " + userPosition);
        
      },
      error => Alert.alert('Error', 'Unable to get location: ' + error.message),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 10000 }
    );

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

  const deleteHandler = ({ store }) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this store?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            try {
              firestore().collection('storeLocations').doc(store.key).delete();
              Alert.alert("Successful", "Deleted successfully");
            } catch (error) {
              console.error("Delete error: ", error);
              Alert.alert("Delete failed", "Delete store failed!")
            }
          }
        },
      ],
    );
  };

  const renderLocation = ({ item: store }) => {
    return (
      <TouchableOpacity
        style={styles.locationCard}
        onPress={() => {
          setRegion({
            latitude: parseFloat(store.latitude),
            longitude: parseFloat(store.longitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          setSelectedMarker({
            latitude: parseFloat(store.latitude),
            longitude: parseFloat(store.longitude)
          })
        }}>
        <Text style={styles.address}>{store.name}</Text>
        <Text style={styles.drinks}>{store.address}</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.contactBtn} onPress={() => { }}>
            <Text style={styles.contactText}>Phone: {store.contact}</Text>
          </TouchableOpacity>
          <View style={styles.btnRow}>
            <TouchableOpacity
              onPress={() => deleteHandler({ store })}>
              <Icon name="trash" style={styles.editBtn} color={colorTheme.white} size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditStore', { store })}>
              <Icon name="pencil" style={styles.editBtn} color={colorTheme.white} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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
          {/* {selectedMarker && (
            <MapViewDirections
              origin={userPosition}
              destination={selectedMarker}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="blue"
              onError={error => console.log('Directions API error: ', error)}
            />
          )} */}
        </MapView>
      </View>
      <View style={styles.nearbyBlock}>
        <View style={styles.row}>
          <Text style={styles.title}>Existed Stores</Text>
          <View style={styles.btnRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Add')}>
              <Icon name="plus" style={styles.editBtn} color={colorTheme.white} size={20} />
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
    borderRadius: 5,
    shadowColor: colorTheme.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: '5%',
    marginVertical: "2%"
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
    marginVertical: "2%"
  },
  editBtn: {
    backgroundColor: colorTheme.greenBackground,
    borderRadius: 25,
    justifyContent: "center",
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  btnRow: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-evenly",
    width: 100,
  },
});

export default ManagerStore;
