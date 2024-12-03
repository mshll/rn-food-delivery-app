import { StyleSheet, Text, View } from 'react-native';
import RestaurantMenu from './RestaurantMenu';
import RestaurantDetailHeader from './RestaurantDetailHeader';
import CustomStatusBar from './CustomStatusBar';
import { useNavigation } from '@react-navigation/native';
const RestaurantDetail = ({ route }) => {
  const navigation = useNavigation();
  const { restaurant } = route.params;

  return (
    <>
      <RestaurantDetailHeader restaurant={restaurant} />
      <CustomStatusBar statusBgColor="#d3e8d6" bgColor="#1b1d21">
        <RestaurantMenu restaurant={restaurant} />
      </CustomStatusBar>
    </>
  );
};
export default RestaurantDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1d21',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
