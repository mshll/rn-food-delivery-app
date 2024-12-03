import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import restaurants from '../data/restaurants';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { renderStars } from '../utils/utils';

const Restaurants = ({ selectedCategory, navigation }) => {
  const filteredRestaurants = selectedCategory ? restaurants.filter((item) => item.category === selectedCategory) : restaurants;

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => navigation.navigate('RestaurantDetail', { restaurant: item })}>
      <View style={styles.item}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.cardDetails}>
          <Text
            style={{
              backgroundColor: '#d3e8d6',
              color: '#1b1d21',
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 500,
              fontSize: 10,
              fontWeight: '600',
            }}
          >
            {item.category}
          </Text>
          <Text style={styles.text}>{item.name}</Text>
          {/* <View style={styles.cardSubDetails}> */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {renderStars(item.rating)}
            <Text style={styles.subText}> {item.rating}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="truck-fast" size={11} color="#7e878a" />
            <Text style={[styles.subText, { color: '#7e878a' }]}>
              {'  '}
              {item.deliveryTime}
            </Text>
          </View>
          {/* </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredRestaurants}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={1}
        // columnWrapperStyle={{ justifyContent: 'flex-start', flex: 1, margin: 10, gap: 10 }}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerText}>Restaurants</Text>
            <Text style={styles.headerSubText}>{filteredRestaurants.length}</Text>
          </View>
        }
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingHorizontal: 16 }}
      />
    </View>
  );
};

export default Restaurants;

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
    paddingVertical: 16,
  },
  headerText: {
    backgroundColor: '#1b1d21',
    color: '#d3e8d6',
    fontSize: 28,
    fontWeight: 'bold',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222429',
    padding: 10,
    borderRadius: 10,
    // gap: 10,
    borderColor: '#282a2f',
    borderWidth: 1,
  },
  text: {
    // backgroundColor: 'blue',
    color: '#d3e8d6',
    fontSize: 20,
    fontWeight: '700',
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 10,
    backgroundColor: '#282a2f',
    objectFit: 'contain',
  },
  headerSubText: {
    backgroundColor: '#d3e8d6',
    color: '#1b1d21',
    fontSize: 24,
    paddingHorizontal: 8,
    paddingVertical: 1,
    fontWeight: 'bold',
    borderRadius: 12,
    marginLeft: 10,
  },
  cardDetails: {
    // backgroundColor: 'purple',
    padding: 10,
    paddingBottom: 10,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 7,
  },
  cardSubDetails: {
    // backgroundColor: 'blue',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 5,
  },
  subText: {
    color: '#f7ffae',
    fontSize: 14,
    fontWeight: '500',
  },
});
