import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native';
import restaurantCategories from '../data/categories';
import categoryBetterImages from '../data/categoryBetterImages';
import { SafeAreaView } from 'react-native-safe-area-context';

const Categories = ({ setSelectedCategory, selectedCategory }) => {
  const categories = restaurantCategories;

  const renderItem = ({ item }) => (
    <Pressable onPress={() => setSelectedCategory(selectedCategory === item.categoryName ? null : item.categoryName)}>
      <View style={[styles.item, selectedCategory === item.categoryName && styles.selectedItem]}>
        <Image source={categoryBetterImages[item.categoryName] || { uri: item.categoryImage }} style={styles.image} />
        <Text style={[styles.text, selectedCategory === item.categoryName && { color: '#d7e7d7' }]}>{item.categoryName}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Cuisines</Text>
        <Text style={styles.headerSubText}>{categories.length}</Text>
      </View>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        stickyHeaderIndices={[0]}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#d3e8d6',
    justifyContent: 'center',
    alignSelf: 'stretch',
    color: '#fff',
    borderEndEndRadius: 20,
    borderEndStartRadius: 20,
    paddingBottom: 10,
  },
  header: {
    backgroundColor: '#d3e8d6',
    color: '#d3e8d6',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerText: {
    color: '#1b1d21',
    fontSize: 28,
    fontWeight: 'bold',
  },
  item: {
    // marginHorizontal: 10,
    margin: 5,
    alignItems: 'center',
    // backgroundColor: '#222429',
    paddingVertical: 10,
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
    paddingHorizontal: 8,
    paddingVertical: 1,
    fontWeight: 'bold',
    fontSize: 24,
    borderRadius: 12,
    marginLeft: 10,
  },
  selectedItem: {
    backgroundColor: '#222429',
    color: '#d7e7d7',
  },
});
