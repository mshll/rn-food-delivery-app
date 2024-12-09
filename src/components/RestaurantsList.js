import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { renderStars } from '../utils/utils';
import { getRestaurants } from '../api/restaurants';
import { useQuery } from '@tanstack/react-query';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';

const RestaurantSkeleton = () => (
  <View style={styles.container}>
    <View style={{ gap: 10, paddingHorizontal: 16 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Restaurants</Text>
      </View>
      {[1, 2, 3].map((i) => (
        <View style={[styles.item, { backgroundColor: 'transparent', borderWidth: 0, marginBottom: 100 }]} key={i}>
          <Skeleton colors={['#282a2f', '#282a2f']} width={100} height={100} radius={10} />
          <View style={[styles.cardDetails, { gap: 10 }]}>
            <Skeleton colors={['#282a2f', '#282a2f']} width={150} height={24} radius={4} />
            <Skeleton colors={['#282a2f', '#282a2f']} width={100} height={20} radius={4} />
            <Skeleton colors={['#282a2f', '#282a2f']} width={120} height={20} radius={4} />
          </View>
        </View>
      ))}
    </View>
  </View>
);

const RestaurantsList = ({ selectedCategory, navigation }) => {
  const {
    data: restaurants,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['restaurants'],
    queryFn: getRestaurants,
  });

  const filteredRestaurants = selectedCategory && restaurants ? restaurants.filter((item) => item?.category?.name === selectedCategory) : restaurants;

  const renderItem = ({ item, index }) => (
    <MotiView from={{ opacity: 0, translateX: -20 }} animate={{ opacity: 1, translateX: 0 }} transition={{ delay: index * 100 }}>
      <TouchableOpacity onPress={() => navigation.navigate('RestaurantDetail', { restaurant: item })}>
        <View style={styles.item}>
          <Image source={{ uri: item?.image }} style={styles.image} />
          <View style={styles.cardDetails}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
              <Text
                style={{
                  backgroundColor: '#1b1d21',
                  color: '#d3e8d6',
                  paddingVertical: 4,
                  paddingHorizontal: 10,
                  borderRadius: 14,
                  fontSize: 10,
                  fontWeight: '600',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}
              >
                {item?.category?.name || 'Unknown'}
              </Text>
            </View>
            <Text style={styles.text}>{item?.name || 'Unknown Restaurant'}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {renderStars(item?.rating || 0)}
              <Text style={styles.subText}> {item?.rating?.toFixed(1) || '0.0'}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="clock" size={14} color="#7e878a" />
              <Text style={[styles.subText, { color: '#7e878a' }]}> {item?.deliveryTime || 'N/A'}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </MotiView>
  );

  if (isLoading) {
    return <RestaurantSkeleton />;
  }

  if (isError || !restaurants) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={[styles.text, { color: 'red' }]}>Error loading restaurants</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredRestaurants}
        renderItem={renderItem}
        keyExtractor={(item) => item?._id?.toString() || Math.random().toString()}
        numColumns={1}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerText}>Restaurants</Text>
          </View>
        }
        ListEmptyComponent={
          <MotiView from={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ padding: 20, alignItems: 'center' }}>
            <Text style={[styles.subText, { color: '#7e878a', textAlign: 'center' }]}>
              {selectedCategory ? 'No restaurants found in this category' : 'No restaurants available'}
            </Text>
          </MotiView>
        }
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingHorizontal: 16, paddingBottom: 20 }}
      />
    </View>
  );
};

export default RestaurantsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1d21',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: '100%',
    color: '#fff',
  },
  header: {
    backgroundColor: '#1b1d21',
    color: '#d3e8d6',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 5,
    zIndex: 10,
  },
  headerText: {
    backgroundColor: '#1b1d21',
    color: '#d3e8d6',
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#222429',
    padding: 10,
    borderRadius: 10,
    gap: 10,
    borderColor: '#282a2f',
    borderWidth: 1,
  },
  text: {
    color: '#d3e8d6',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
    backgroundColor: '#282a2f',
    objectFit: 'contain',
  },
  cardDetails: {
    flex: 1,
    paddingVertical: 5,
    gap: 8,
  },
  subText: {
    color: '#f7ffae',
    fontSize: 14,
    fontWeight: '500',
  },
});
