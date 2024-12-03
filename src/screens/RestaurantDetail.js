import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomStatusBar from '../components/CustomStatusBar';
import RestaurantMenu from '../components/RestaurantMenu';
import RestaurantDetailHeader from '../components/RestaurantDetailHeader';

const RestaurantDetail = ({ route }) => {
  const navigation = useNavigation();
  const { restaurant } = route.params;

  return (
    <>
      <CustomStatusBar statusBgColor="#d3e8d6" bgColor="#1b1d21" useTopPadding={false}>
        <RestaurantDetailHeader restaurant={restaurant} />
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
