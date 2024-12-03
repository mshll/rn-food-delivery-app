import { StyleSheet, Text, View } from 'react-native';
import RestaurantMenu from './RestaurantMenu';
import RestaurantDetailHeader from './RestaurantDetailHeader';
import CustomStatusBar from './CustomStatusBar';
const RestaurantDetail = () => {
  return (
    <>
      <RestaurantDetailHeader />
      <CustomStatusBar statusBgColor="#d3e8d6" bgColor="#1b1d21">
        <RestaurantMenu />
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
