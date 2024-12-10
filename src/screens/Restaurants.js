import { StyleSheet, View, Text } from 'react-native';
import CustomStatusBar from '../components/CustomStatusBar';
import Categories from '../components/Categories';
import { useState } from 'react';
import RestaurantsList from '../components/RestaurantsList';

const RestaurantsPage = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <CustomStatusBar statusBgColor="#d3e8d6" bgColor="#1b1d21" useTopPadding={false}>
      <View style={styles.container}>
        <Categories setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
        <View style={styles.listContainer}>
          <Text style={styles.heading}>Restaurants</Text>
          <RestaurantsList selectedCategory={selectedCategory} navigation={navigation} />
        </View>
      </View>
    </CustomStatusBar>
  );
};
export default RestaurantsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1d21',
  },
  listContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: '#d3e8d6',
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 5,
  },
});
