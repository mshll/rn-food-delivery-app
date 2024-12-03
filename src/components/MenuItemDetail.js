import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RestaurantMenu from './RestaurantMenu';
import CustomStatusBar from './CustomStatusBar';
import MenuItemDetailHeader from './MenuItemDetailHeader';
import restaurants from '../data/restaurants';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useEffect, useState } from 'react';
import Button from './Button';

const MenuItemDetail = ({ route }) => {
  const { menuItem } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(menuItem.price);

  const handleQuantity = (val) => {
    setQuantity(val);
    if (val < 0) setQuantity(0);
    if (val > 10) setQuantity(10);
  };

  useEffect(() => {
    setTotal(menuItem.price * quantity);
  }, [quantity]);

  return (
    <>
      <MenuItemDetailHeader menuItem={menuItem} />
      <CustomStatusBar statusBgColor="#d3e8d6" bgColor="#1b1d21">
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                  <TouchableOpacity style={styles.icon} onPress={() => handleQuantity(quantity - 1)}>
                    <Icon name="minus" size={18} color="#d8e6ea" />
                  </TouchableOpacity>
                  <Text style={{ color: '#d3e8d6', fontSize: 18, fontWeight: 'bold' }}>{quantity}</Text>
                  <TouchableOpacity style={styles.icon} onPress={() => handleQuantity(quantity + 1)}>
                    <Icon name="plus" size={18} color="#d8e6ea" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                <View style={{ flex: 1 }}>
                  <Button title="Add to Cart" />
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
    fontWeight: 'bold',
    marginBottom: 16,
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
