import { StyleSheet, Text, View, FlatList, Image, Pressable, TouchableOpacity } from 'react-native';
import restaurantCategories from '../data/categories';
import categoryBetterImages from '../data/categoryBetterImages';
import { SafeAreaView } from 'react-native-safe-area-context';

const Categories = ({ setSelectedCategory, selectedCategory }) => {
  const categories = restaurantCategories;

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedCategory(selectedCategory === item.categoryName ? null : item.categoryName)}>
      <View style={[styles.item, selectedCategory === item.categoryName && styles.selectedItem]}>
        <Image source={categoryBetterImages[item.categoryName] || { uri: item.categoryImage }} style={styles.image} />
        <Text style={[styles.text, selectedCategory === item.categoryName && { color: '#d7e7d7' }]}>{item.categoryName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Cuisines</Text>
        {/* <Text style={styles.headerSubText}>{categories.length}</Text> */}
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
    borderEndEndRadius: 20,
    borderEndStartRadius: 20,
    paddingBottom: 10,
  },
  header: {
    backgroundColor: '#d3e8d6',
    color: '#485c48',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 16,
  },
  headerText: {
    color: '#485c48',
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
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
    color: '#485c48',
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 14,
  },
  headerSubText: {
    backgroundColor: '#1b1d21',
    color: '#d3e8d6',
    paddingHorizontal: 8,
    paddingVertical: 1,
    fontWeight: 'bold',
    fontSize: 24,
    borderRadius: 14,
    marginLeft: 10,
  },
  selectedItem: {
    backgroundColor: '#485c48',
    color: '#d7e7d7',
  },
});
