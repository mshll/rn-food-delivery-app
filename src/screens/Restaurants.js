import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomStatusBar from '../components/CustomStatusBar';
import Categories from '../components/Categories';
import { useState } from 'react';
import RestaurantsList from '../components/RestaurantsList';

const RestaurantsPage = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <CustomStatusBar statusBgColor="#d3e8d6" bgColor="#1b1d21" useTopPadding={false}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Categories setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
          <RestaurantsList selectedCategory={selectedCategory} navigation={navigation} />
        </ScrollView>
      </View>
    </CustomStatusBar>
  );
};
export default RestaurantsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1d21',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
