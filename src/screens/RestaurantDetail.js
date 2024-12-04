import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomStatusBar from '../components/CustomStatusBar';
import RestaurantMenu from '../components/RestaurantMenu';
import RestaurantDetailHeader from '../components/RestaurantDetailHeader';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';

const RestaurantDetail = ({ route }) => {
  const navigation = useNavigation();
  const { restaurant } = route.params;
  const { cartItems, getCartTotal, getCartRestaurant } = useCart();

  const hasItemsInCart = cartItems.length > 0;
  const isSameRestaurant = getCartRestaurant() === restaurant;

  return (
    <>
      <CustomStatusBar statusBgColor="#d3e8d6" bgColor="#1b1d21" useTopPadding={false}>
        <View style={styles.container}>
          <RestaurantDetailHeader restaurant={restaurant} />
          <View style={styles.contentContainer}>
            <RestaurantMenu restaurant={restaurant} />
            {hasItemsInCart && isSameRestaurant && (
              <View style={styles.cartButton}>
                <Button onPress={() => navigation.navigate('Cart')} bgColor="#f7ffae">
                  <View style={styles.cartButtonContent}>
                    <Text style={styles.cartButtonText}>View Cart</Text>
                    <Text style={styles.cartButtonText}>{getCartTotal()} KWD</Text>
                  </View>
                </Button>
              </View>
            )}
          </View>
        </View>
      </CustomStatusBar>
    </>
  );
};

export default RestaurantDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1d21',
  },
  contentContainer: {
    flex: 1,
  },
  cartButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#1b1d21',
  },
  cartButtonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  cartButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1b1d21',
  },
});
