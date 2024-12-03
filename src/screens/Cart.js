import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import RestaurantMenu from '../components/RestaurantMenu';
import CustomStatusBar from '../components/CustomStatusBar';
import restaurants from '../data/restaurants';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';

const CartItem = ({ item, onUpdateQuantity }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, marginHorizontal: 5, gap: 10 }}>
    <Image source={{ uri: item.image }} style={{ width: 60, height: 60, borderRadius: 10 }} />
    <View style={{ color: '#d3e8d6', flex: 1, alignItems: 'flex-start', justifyContent: 'center', gap: 5 }}>
      <Text style={{ color: '#d3e8d6', fontSize: 18, fontWeight: '600' }}>{item.name}</Text>
      <Text style={{ color: '#797b89', fontSize: 14 }}>{Number((item.price * item.quantity).toFixed(2))} KWD</Text>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 15 }}>
      <TouchableOpacity style={styles.icon} onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}>
        <Icon name="minus" size={18} color="#d8e6ea" />
      </TouchableOpacity>
      <Text style={{ color: '#d3e8d6', fontSize: 18, fontWeight: 'bold' }}>{item.quantity}</Text>
      <TouchableOpacity style={styles.icon} onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}>
        <Icon name="plus" size={18} color="#d8e6ea" />
      </TouchableOpacity>
    </View>
  </View>
);

const Cart = () => {
  const { cartItems, updateQuantity, getCartTotal, restaurant } = useCart();
  const navigation = useNavigation();

  const handlePayment = () => {
    // Implement payment logic here
    console.log('Processing payment...');
  };

  if (cartItems.length === 0) {
    return (
      <CustomStatusBar statusBgColor="#1b1d21" bgColor="#1b1d21">
        <View style={styles.container}>
          <View style={{ justifyContent: 'space-between', flex: 1, width: '100%' }}>
            <View>
              <Text style={styles.heading}>Cart</Text>
              <Text style={{ color: '#d3e8d6', fontSize: 16, textAlign: 'center', marginTop: 20 }}>Your cart is empty</Text>
            </View>
            <View>
              <Button title="Go Back" onPress={() => navigation.pop()} />
            </View>
          </View>
        </View>
      </CustomStatusBar>
    );
  }

  return (
    <CustomStatusBar statusBgColor="#1b1d21" bgColor="#1b1d21">
      <View style={styles.container}>
        <View style={{ justifyContent: 'space-between', flex: 1, width: '100%' }}>
          <View>
            <Text style={styles.heading}>Cart</Text>
            {restaurant && <Text style={{ color: '#797b89', fontSize: 16, marginBottom: 16 }}>From: {restaurant.name}</Text>}
            <FlatList
              data={cartItems}
              renderItem={({ item }) => <CartItem item={item} onUpdateQuantity={updateQuantity} />}
              keyExtractor={(item) => item.id}
            />
          </View>
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
              <View style={{ color: '#d3e8d6', flex: 1, alignItems: 'flex-start', justifyContent: 'space-between', gap: 5 }}>
                <Text style={{ color: '#96a1a4', fontSize: 12, fontWeight: '300' }}>Total</Text>
                <Text style={{ color: '#d3e8d6', fontSize: 18, fontWeight: '600' }}>{getCartTotal()} KWD</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Button title="Pay" onPress={handlePayment} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </CustomStatusBar>
  );
};

export default Cart;

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
    fontSize: 38,
    fontWeight: '700',
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
