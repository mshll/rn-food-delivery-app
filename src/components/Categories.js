import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import restaurantCategories from '../data/categories';
import categoryBetterImages from '../data/categoryBetterImages';
import { SafeAreaView } from 'react-native-safe-area-context';

const Categories = () => {
  const categories = restaurantCategories;

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={categoryBetterImages[item.categoryName]} style={styles.image} />
      <Text style={styles.text}>{item.categoryName}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Cuisines</Text>
        <Text style={styles.headerSubText}>{categories.length}</Text>
      </View>
      <FlatList data={categories} renderItem={renderItem} keyExtractor={(item) => item.id} horizontal={true} stickyHeaderIndices={[0]} />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#d3e8d6',
    justifyContent: 'center',
    alignSelf: 'stretch',
    color: '#fff',
    borderEndEndRadius: 25,
    borderEndStartRadius: 25,
    paddingBottom: 10,
  },
  header: {
    backgroundColor: '#d3e8d6',
    color: '#d3e8d6',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    color: '#1b1d21',
    fontSize: 34,
    fontWeight: 'bold',
  },
  item: {
    // marginHorizontal: 10,
    margin: 5,
    alignItems: 'center',
    // backgroundColor: '#222429',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    gap: 5,
  },
  text: {
    color: '#222429',
    fontSize: 16,
    fontWeight: '500',
  },
  image: {
    width: 50,
    height: 50,
    // borderRadius: 100,
  },
  headerSubText: {
    backgroundColor: '#1b1d21',
    color: '#d3e8d6',
    fontSize: 34,
    paddingHorizontal: 8,
    paddingVertical: 1,
    fontWeight: 'bold',
    fontSize: 24,
    borderRadius: 12,
    marginLeft: 10,
  },
});
