import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getRestaurants } from '../api/restaurants';

const RestaurantSkeleton = () => (
  <View style={{ gap: 16, paddingHorizontal: 16 }}>
    {[1, 2, 3].map((i) => (
      <View key={i} style={[styles.card, { backgroundColor: 'transparent', borderWidth: 0 }]}>
        <Skeleton colorMode="dark" width={100} height={100} radius={12} />
        <View style={[styles.content, { gap: 8 }]}>
          <Skeleton colorMode="dark" width={150} height={24} radius={4} />
          <Skeleton colorMode="dark" width={100} height={20} radius={4} />
          <Skeleton colorMode="dark" width={120} height={20} radius={4} />
        </View>
      </View>
    ))}
  </View>
);

const RestaurantCard = ({ restaurant, onPress, index }) => {
  const ratingColor = restaurant.rating >= 4.5 ? '#4CAF50' : restaurant.rating >= 4.0 ? '#f9ffb7' : '#797b89';
  const deliveryFee = Math.floor(Math.random() * 3) + 1;
  const deliveryTime = Math.floor(Math.random() * 20) + 20;

  return (
    <MotiView
      from={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{
        type: 'timing',
        duration: 500,
        delay: index * 100,
      }}
    >
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: restaurant.image }} style={styles.image} />
          {restaurant.isPromoted && (
            <View style={styles.promotedBadge}>
              <Icon name="star" size={10} color="#1b1d21" solid style={{ marginRight: 4 }} />
              <Text style={styles.promotedText}>Featured</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={12} color={ratingColor} solid style={{ marginRight: 4 }} />
              <Text style={[styles.rating, { color: ratingColor }]}>{restaurant.rating.toFixed(1)}</Text>
            </View>
          </View>

          <Text style={styles.category}>{restaurant.category?.name}</Text>

          <View style={styles.tagsRow}>
            {restaurant.categories?.slice(0, 2).map((category, idx) => (
              <View key={idx} style={styles.tag}>
                <Text style={styles.tagText}>{category}</Text>
              </View>
            ))}
          </View>

          <View style={styles.footer}>
            <View style={styles.infoItem}>
              <Icon name="clock" size={12} color="#797b89" style={{ marginRight: 4 }} />
              <Text style={styles.infoText}>{deliveryTime} mins</Text>
            </View>
            <View style={styles.dot} />
            <View style={styles.infoItem}>
              <Icon name="truck" size={12} color="#797b89" style={{ marginRight: 4 }} />
              <Text style={styles.infoText}>{deliveryFee === 1 ? 'Free' : `${deliveryFee.toFixed(1)} KWD`}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </MotiView>
  );
};

const RestaurantsList = ({ selectedCategory }) => {
  const navigation = useNavigation();
  const {
    data: restaurants,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['restaurants'],
    queryFn: getRestaurants,
  });

  if (isLoading) {
    return <RestaurantSkeleton />;
  }

  if (isError || !restaurants) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading restaurants</Text>
      </View>
    );
  }

  const filteredRestaurants = selectedCategory ? restaurants.filter((item) => item?.category?.name === selectedCategory) : restaurants;

  // Add isPromoted flag to some restaurants randomly
  const restaurantsWithPromo = filteredRestaurants.map((restaurant) => ({
    ...restaurant,
    isPromoted: Math.random() > 0.7,
  }));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {restaurantsWithPromo.map((restaurant, index) => (
        <RestaurantCard
          key={restaurant._id}
          restaurant={restaurant}
          onPress={() => navigation.navigate('RestaurantDetail', { restaurant })}
          index={index}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    padding: 16,
    gap: 16,
    width: '100%',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    color: '#f44336',
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#222429',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#282a2f',
    overflow: 'hidden',
    width: '100%',
  },
  imageContainer: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  promotedBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#f9ffb7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  promotedText: {
    color: '#1b1d21',
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
  },
  content: {
    flex: 1,
    padding: 12,
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  name: {
    fontSize: 18,
    color: '#d3e8d6',
    fontFamily: 'Poppins_600SemiBold',
    flex: 1,
    marginRight: 8,
    lineHeight: 24,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1b1d21',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 2,
  },
  rating: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 2,
  },
  tag: {
    backgroundColor: '#1b1d21',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tagText: {
    color: '#797b89',
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    color: '#797b89',
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#797b89',
    marginHorizontal: 8,
  },
  category: {
    fontSize: 14,
    color: '#797b89',
    fontFamily: 'Poppins_500Medium',
    marginBottom: 2,
    lineHeight: 20,
  },
});

export default RestaurantsList;
