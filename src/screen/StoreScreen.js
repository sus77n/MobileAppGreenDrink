import React, { useEffect, useState } from "react";
import { PermissionsAndroid, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { colorTheme } from "../component/store";
import Geolocation from "@react-native-community/geolocation";

const StoreScreen = () => {

    const [region, setRegion] = useState(null);

    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    console.warn('Location permission denied');
                    return;
                }
            }
            Geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });
                },
                (error) => console.error(error),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        };

        requestLocationPermission();
    }, []);

    if (!region) {
        return null; // You can replace this with a loading indicator
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Find a store</Text>
            <View style={styles.coverMap}>
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsUserLocation={true}
                    onUserLocationChange={true}
                >
                    <Marker
                        coordinate={region}
                        title="Event Marker"
                        description="Press me!"
                        onPress={(e) => alert("Marker pressed!")}
                    />
                </MapView>
            </View>
            <View style={styles.nearbyBlock}>
                <Text style={styles.title}>Near By</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.white
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    coverMap: {
        height: "50%",
        width: "100%",
        marginVertical: "4%",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: colorTheme.greenText,
        marginLeft: "5%",
        marginTop: "5%"
    },
    nearbyBlock: {

    },
})

export default StoreScreen;