import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RestaurantMenu from '../components/RestaurantMenu';
import CustomStatusBar from '../components/CustomStatusBar';
import MenuItemDetailHeader from '../components/MenuItemDetailHeader';
import restaurants from '../data/restaurants';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

const MenuItemDetail = ({ route }) => {
  const { menuItem, restaurant } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(menuItem.price);
  const navigation = useNavigation();
  const { addToCart } = useCart();

  const handleQuantity = (val) => {
    setQuantity(val);
    if (val < 1) setQuantity(1);
    if (val > 10) setQuantity(10);
  };

  const handleAddToCart = async () => {
    const success = await addToCart(menuItem, quantity, restaurant);
    if (success) {
      navigation.goBack();
    }
  };

  useEffect(() => {
    setTotal(Number((menuItem.price * quantity).toFixed(2)));
  }, [quantity]);

  return (
    <>
      <CustomStatusBar statusBgColor="#d3e8d6" bgColor="#1b1d21" useTopPadding={false}>
        <MenuItemDetailHeader menuItem={menuItem} />
        <View style={styles.container}>
          <View style={{ justifyContent: 'space-between', flex: 1, width: '100%' }}>
            {/* top */}
            <View>
              <Text style={styles.heading}>{menuItem.name}</Text>
              <Text style={{ color: '#d3e8d6', fontSize: 14, marginTop: 16 }}>{menuItem.description}</Text>
            </View>
            {/* bottom */}
            <View style={{ width: '100%' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, marginHorizontal: 5 }}>
                <View style={{ color: '#d3e8d6', flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                  <Text style={{ color: '#d3e8d6', fontSize: 18, fontWeight: '600' }}>{total} KWD</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 0, gap: 15 }}>
                  <TouchableOpacity style={styles.icon} onPress={() => handleQuantity(quantity - 1)}>
                    <Icon name="minus" size={18} color="#d8e6ea" />
                  </TouchableOpacity>
                  <Text style={{ color: '#d3e8d6', fontSize: 18, fontFamily: 'Poppins_600SemiBold' }}>{quantity}</Text>
                  <TouchableOpacity style={styles.icon} onPress={() => handleQuantity(quantity + 1)}>
                    <Icon name="plus" size={18} color="#d8e6ea" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                <View style={{ flex: 1 }}>
                  <Button title="Add to Cart" onPress={handleAddToCart} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </CustomStatusBar>
    </>
  );
};
export default MenuItemDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1d21',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    marginTop: 16,
  },
  heading: {
    color: '#f9ffb7',
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 10,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222429',
    padding: 8,
    borderRadius: 100,
    width: 40,
    height: 40,
  },
});
