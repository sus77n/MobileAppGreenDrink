import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {colorTheme} from '../component/store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

const ManageStore = () => {
  const [region, setRegion] = useState({
    latitude: 11.053818758889006,
    longitude: 106.66820561894689,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [loading, setLoading] = useState(false);
  const [locations, setLocation] = useState([]);

  const renderLocation = ({item: location}) => {
    return (
      <TouchableOpacity
        style={styles.locationCard}
        onPress={() =>
          setRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          })
        }>
        <Text style={styles.address}>{location.name}</Text>
        <Text style={styles.drinks}>{location.address}</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.contactBtn} onPress={() => {}}>
            <Text style={styles.contactText}>Phone: {location.contact}</Text>
          </TouchableOpacity>
          <Icon name="map-outline" size={50} color={'black'} />
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Fetching location...</Text>
      </View>
    );
  }

  useEffect(() => {
    const subscriber = firestore()
      .collection('storeLocations')
      .onSnapshot(querySnapshot => {
        const storeLocations = [];
        querySnapshot.forEach(documentSnapshot => {
          storeLocations.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id, // Ensure each category has a unique key
          });
        });
        setLocation(storeLocations); // Set the categories as an array
        setLoading(false);
        storeLocations.forEach((location) => {
            console.log(location);
            
        })
      });

    return () => subscriber(); // Unsubscribe when no longer in use
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
        <Text style={styles.title}>Nearby Stores</Text>
        <FlatList
          data={locations}
          renderItem={renderLocation}
        //   keyExtractor={({item}) => item.name}
          ></FlatList>
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
    color: colorTheme.black,
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
});

export default ManageStore;
