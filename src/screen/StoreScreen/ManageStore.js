import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { colorTheme, GOOGLE_MAPS_APIKEY } from '../../component/store';
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

const { width, height } = Dimensions.get('window');
const scale = size => (width / 375) * size;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  coverMap: {
    height: scale(300), 
    width: '100%',
    borderRadius: scale(5),
    shadowColor: colorTheme.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.30,
    shadowRadius: scale(4.65), 
    elevation: scale(8), 
  },
  title: {
    fontSize: scale(22), 
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: scale(15),
    marginVertical: scale(10), 
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
    marginVertical: scale(12), 
    backgroundColor: colorTheme.grayBackground,
    borderRadius: scale(10), 
    paddingHorizontal: scale(18), 
    paddingVertical: scale(18), 
  },
  address: {
    fontSize: scale(15), 
    fontWeight: '700',
    color: colorTheme.greenText,
    marginVertical: scale(12), 
  },
  contactBtn: {
    backgroundColor: colorTheme.grayBackground,
    paddingVertical: scale(12),
    paddingHorizontal: scale(18), 
    borderRadius: scale(5), 
    borderWidth: 1,
    borderColor: colorTheme.greenBackground,
    alignItems: 'center',
  },
  contactText: {
    fontSize: scale(14), 
    color: colorTheme.greenBackground,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: scale(10), 
  },
  editBtn: {
    backgroundColor: colorTheme.greenBackground,
    borderRadius: scale(25), 
    justifyContent: "center",
    paddingHorizontal: scale(9), 
    paddingVertical: scale(7), 
  },
  btnRow: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-evenly",
    width: scale(100), 
  },
});


export default ManagerStore;
