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
    <SafeAreaView style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerText}>Categories</Text>
            <Text style={styles.headerSubText}>{categories.length}</Text>
          </View>
        }
        stickyHeaderIndices={[0]}
      />
    </SafeAreaView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignSelf: 'stretch',
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
    margin: 10,
    alignItems: 'center',
    // backgroundColor: '#222429',
    padding: 10,
    borderRadius: 10,
    gap: 10,
  },
  text: {
    color: '#d3e8d6',
    fontSize: 20,
    fontWeight: '500',
  },
  image: {
    width: 100,
    height: 100,
    // borderRadius: 100,
  },
  headerSubText: {
    backgroundColor: '#f7ffae',
    color: '#1b1d21',
    fontSize: 34,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontWeight: 'bold',
    fontSize: 24,
    borderRadius: 10,
    marginLeft: 10,
  },
});
