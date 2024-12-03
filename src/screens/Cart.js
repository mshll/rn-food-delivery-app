import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RestaurantMenu from '../components/RestaurantMenu';
import CustomStatusBar from '../components/CustomStatusBar';
import restaurants from '../data/restaurants';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useEffect, useState } from 'react';
import Button from '../components/Button';

const Cart = () => {
  const menuItem = restaurants[0].menuItems[0];
  return (
    <>
      <CustomStatusBar statusBgColor="#1b1d21" bgColor="#1b1d21">
        <View style={styles.container}>
          <View style={{ justifyContent: 'space-between', flex: 1, width: '100%' }}>
            {/* top */}
            <View>
              <Text style={styles.heading}>Cart</Text>
              <View>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, marginHorizontal: 5, gap: 10 }}
                >
                  <Image source={{ uri: menuItem.image }} style={{ width: 60, height: 60, borderRadius: 10 }} />
                  <View style={{ color: '#d3e8d6', flex: 1, alignItems: 'flex-start', justifyContent: 'center', gap: 5 }}>
                    <Text style={{ color: '#d3e8d6', fontSize: 18, fontWeight: '600' }}>Chicken Burger</Text>
                    <Text style={{ color: '#797b89', fontSize: 14 }}>50 KWD</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 15 }}>
                    <TouchableOpacity style={styles.icon}>
                      <Icon name="minus" size={18} color="#d8e6ea" />
                    </TouchableOpacity>
                    <Text style={{ color: '#d3e8d6', fontSize: 18, fontWeight: 'bold' }}>2</Text>
                    <TouchableOpacity style={styles.icon}>
                      <Icon name="plus" size={18} color="#d8e6ea" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            {/* bottom */}
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                <View style={{ color: '#d3e8d6', flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                  <Text style={{ color: '#d3e8d6', fontSize: 18, fontWeight: '600' }}>10 KWD</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Button title="Pay" />
                </View>
              </View>
            </View>
          </View>
        </View>
      </CustomStatusBar>
    </>
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
