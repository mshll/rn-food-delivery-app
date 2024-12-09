import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import dishesBetterImages from '../data/dishesBetterImages';

const RestaurantMenu = ({ restaurant, route }) => {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MenuItemDetail', { menuItem: item, restaurant })}>
      <View style={styles.itemContainer}>
        <Image source={dishesBetterImages[item.name] || { uri: item.image }} style={styles.image} />
        <View style={styles.item}>
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
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurant.items}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={1}
        // ListHeaderComponent={
        //   <View style={styles.header}>
        //     <Text style={styles.headerText}>Menu</Text>
        //     <Text style={styles.headerSubText}>{restaurant.menuItems.length}</Text>
        //   </View>
        // }
        // stickyHeaderIndices={[0]}
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
    paddingTop: 10,
  },
  header: {
    backgroundColor: '#1b1d21',
    color: '#d3e8d6',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 5,
  },
  headerText: {
    backgroundColor: '#1b1d21',
    color: '#d3e8d6',
    fontSize: 28,
    fontWeight: 'bold',
  },
  itemContainer: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222429',
    padding: 10,
    paddingLeft: 52,
    marginLeft: -50,
    borderRadius: 10,
    borderColor: '#282a2f',
    borderWidth: 1,
    minHeight: 120,
  },
  text: {
    color: '#d3e8d6',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  image: {
    height: 100,
    width: 100,
    zIndex: 1,
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
    padding: 10,
    paddingLeft: 5,
    paddingBottom: 10,
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10,
  },
  cardSubDetails: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subText: {
    color: '#f7ffae',
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
  },
});
