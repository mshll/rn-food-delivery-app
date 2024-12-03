import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';

const CustomHeader = ({ navigation, title, route, absolute = true, backgroundColor = 'transparent', ...props }) => {
  const insets = useSafeAreaInsets();
  const { cartItems } = useCart();

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <View style={[styles.header, { paddingTop: insets.top, backgroundColor }, absolute ? { position: 'absolute' } : { position: 'relative' }]}>
      <View>
        {navigation.canGoBack() && (
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={15} color="#d3e8d6" />
          </TouchableOpacity>
        )}
      </View>
      {/* <Text style={styles.title}>ZestZoom</Text> */}
      <View>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
          <Icon name="cart-shopping" size={15} color="#d3e8d6" />
          {cartItemsCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartItemsCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // position: 'absolute',
    top: 0,
    width: '100%',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#d3e8d6',
  },
  iconButton: {
    backgroundColor: '#222429',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  badge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: '#f9ffb7',
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#1b1d21',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CustomHeader;
