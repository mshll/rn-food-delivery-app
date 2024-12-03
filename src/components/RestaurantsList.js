import { StyleSheet, Text, View } from 'react-native';
import CustomStatusBar from './CustomStatusBar';
import Categories from './Categories';
import Restaurants from './Restaurants';
import { useState } from 'react';

const RestaurantsList = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <CustomStatusBar statusBgColor="#d3e8d6" bgColor="#1b1d21">
      <View style={styles.container}>
        <Categories setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
        <Restaurants selectedCategory={selectedCategory} navigation={navigation} />
      </View>
    </CustomStatusBar>
  );
};
export default RestaurantsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1d21',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
