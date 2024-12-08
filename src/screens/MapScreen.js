import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

export default function MapScreen() {
  const navigation = useNavigation();
  const [region, setRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} showsUserLocation={true} followsUserLocation={true} region={region} />
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Icon name="xmark" size={20} color="#d3e8d6" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    position: 'absolute',
    top: 25,
    right: 15,
    zIndex: 1,
  },
  closeButton: {
    backgroundColor: '#222429',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
