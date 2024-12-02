import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import restaurants from '../data/restaurants';
import Icon from 'react-native-vector-icons/FontAwesome';
import { renderStars } from '../utils/utils';

const Restaurants = () => {
  const renderItem = ({ item, index }) => {
    const lastItem = index === restaurants.length - 1;
    return (
      <View style={[{ maxWidth: lastItem ? '50%' : '100%' }, styles.item]}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.cardDetails}>
          <Text style={styles.text}>{item.name}</Text>
          <View style={styles.cardSubDetails}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>{renderStars(item.rating)}</View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'flex-start', flex: 1, margin: 10, gap: 10 }}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerText}>Restaurants</Text>
            <Text style={styles.headerSubText}>{restaurants.length}</Text>
          </View>
        }
        stickyHeaderIndices={[0]}
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
    padding: 16,
  },
  headerText: {
    backgroundColor: '#1b1d21',
    color: '#d3e8d6',
    fontSize: 34,
    fontWeight: 'bold',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#222429',
    // padding: 10,
    borderRadius: 10,
    // gap: 10,
  },
  text: {
    // backgroundColor: 'blue',
    color: '#d3e8d6',
    fontSize: 20,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerSubText: {
    backgroundColor: '#d3e8d6',
    color: '#1b1d21',
    fontSize: 34,
    paddingHorizontal: 8,
    paddingVertical: 1,
    fontWeight: 'bold',
    fontSize: 24,
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
    gap: 5,
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
    color: '#d3e8d6',
    fontSize: 16,
    fontWeight: '500',
  },
});
