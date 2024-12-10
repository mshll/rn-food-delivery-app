import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Alert, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useQuery } from '@tanstack/react-query';
import { getRestaurants } from '../api/restaurants';

const MIN_DISTANCE = 0.005;
const RADIUS = 0.05;

const getRandomCoordinate = (baseLocation) => {
  const r = RADIUS * Math.sqrt(Math.random());
  const theta = Math.random() * 2 * Math.PI;

  return {
    latitude: baseLocation.latitude + r * Math.cos(theta),
    longitude: baseLocation.longitude + r * Math.sin(theta),
  };
};

const calculateDistance = (coord1, coord2) => {
  const latDiff = coord1.latitude - coord2.latitude;
  const lonDiff = coord1.longitude - coord2.longitude;
  return Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
};

const generateNonOverlappingLocations = (restaurants, baseLocation) => {
  const locations = [];

  for (const restaurant of restaurants) {
    let attempts = 0;
    let newLocation;
    let isValidLocation = false;

    while (!isValidLocation && attempts < 50) {
      newLocation = getRandomCoordinate(baseLocation);
      isValidLocation = true;

      // Check distance from all existing locations
      for (const existingLocation of locations) {
        if (calculateDistance(newLocation, existingLocation.coordinate) < MIN_DISTANCE) {
          isValidLocation = false;
          break;
        }
      }

      attempts++;
    }

    locations.push({
      ...restaurant,
      coordinate: newLocation,
    });
  }

  return locations;
};

export default function MapScreen() {
  const navigation = useNavigation();
  const [region, setRegion] = useState(null);
  const [restaurantLocations, setRestaurantLocations] = useState([]);

  const { data: restaurants } = useQuery({
    queryKey: ['restaurants'],
    queryFn: getRestaurants,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      };
      setRegion(newRegion);

      if (restaurants) {
        const locations = generateNonOverlappingLocations(restaurants, location.coords);
        setRestaurantLocations(locations);
      }
    })();
  }, [restaurants]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} showsUserLocation={true} followsUserLocation={true} region={region} initialRegion={region}>
        {restaurantLocations.map((restaurant) => (
          <Marker key={restaurant._id} coordinate={restaurant.coordinate} onPress={() => navigation.navigate('RestaurantDetail', { restaurant })}>
            <View style={styles.markerContainer}>
              <View style={styles.marker}>
                <Image source={{ uri: restaurant.image }} style={styles.markerImage} />
              </View>
              <View style={styles.markerLabelContainer}>
                <Text style={styles.markerLabel} numberOfLines={1}>
                  {restaurant.name}
                </Text>
              </View>
            </View>
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{restaurant.name}</Text>
                <Text style={styles.calloutCategory}>{restaurant.category?.name}</Text>
                <View style={styles.ratingContainer}>
                  <Icon name="star" size={12} color="#f9ffb7" solid />
                  <Text style={styles.rating}> {restaurant.rating.toFixed(1)}</Text>
                </View>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
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
  markerContainer: {
    alignItems: 'center',
    width: 120,
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#222429',
    borderWidth: 2,
    borderColor: '#d3e8d6',
    overflow: 'hidden',
  },
  markerImage: {
    width: '100%',
    height: '100%',
  },
  markerLabelContainer: {
    backgroundColor: '#222429',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#282a2f',
  },
  markerLabel: {
    color: '#d3e8d6',
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',
  },
  calloutContainer: {
    backgroundColor: '#222429',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#282a2f',
    minWidth: 150,
  },
  calloutTitle: {
    color: '#d3e8d6',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 4,
  },
  calloutCategory: {
    color: '#797b89',
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: '#f9ffb7',
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },
});
