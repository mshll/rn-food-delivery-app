import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import restaurants from '../data/restaurants';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { renderStars } from '../utils/utils';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';

const RestaurantMenu = ({ restaurant, route }) => {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MenuItemDetail', { menuItem: item, restaurant })}>
      <View style={styles.item}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
          <View style={styles.cardDetails}>
            <Text style={styles.text}>{item.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.subText}>{item.price} KWD</Text>
            </View>
          </View>
          <Icon name="chevron-right" size={14} color="#7e878a" style={{ marginHorizontal: 10 }} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurant.menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={1}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerText}>Menu</Text>
            <Text style={styles.headerSubText}>{restaurant.menuItems.length}</Text>
          </View>
        }
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingHorizontal: 16 }}
      />
    </View>
  );
};

export default RestaurantMenu;

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
    position: 'relative',
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
    objectFit: 'cover',
  },
  headerSubText: {
    backgroundColor: '#d3e8d6',
    color: '#1b1d21',
    paddingHorizontal: 8,
    paddingVertical: 1,
    fontWeight: 'bold',
    fontSize: 20,
    borderRadius: 12,
    marginLeft: 10,
  },
  cardDetails: {
    // backgroundColor: 'purple',
    padding: 10,
    paddingBottom: 10,
    width: '100%',
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
    fontSize: 16,
    fontWeight: '500',
  },
});
