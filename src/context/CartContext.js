import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { recentOrders as initialOrders } from '../data/recentOrders';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [orders, setOrders] = useState(initialOrders);

  const clearCart = () => {
    setCartItems([]);
    setRestaurant(null);
  };

  const addOrder = (newOrder) => {
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
  };

  const addToCart = (item, quantity, newRestaurant) => {
    return new Promise((resolve) => {
      if (restaurant && newRestaurant._id !== restaurant._id) {
        Alert.alert(
          'Clear Cart?',
          `Your cart contains items from ${restaurant.name}. Would you like to clear it and add items from ${newRestaurant.name}?`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => resolve(false),
            },
            {
              text: 'Clear & Add',
              onPress: () => {
                clearCart();
                setCartItems([{ ...item, quantity }]);
                setRestaurant(newRestaurant);
                resolve(true);
              },
            },
          ]
        );
        return;
      }

      if (!restaurant) setRestaurant(newRestaurant);

      setCartItems((prevItems) => {
        const existingItem = prevItems.find((i) => i._id === item._id);
        if (existingItem) {
          return prevItems.map((i) => (i._id === item._id ? { ...i, quantity: i.quantity + quantity } : i));
        }
        return [...prevItems, { ...item, quantity }];
      });
      resolve(true);
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item._id !== itemId);
      if (newItems.length === 0) setRestaurant(null);
      return newItems;
    });
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    if (quantity > 10) quantity = 10;
    setCartItems((prevItems) => prevItems.map((item) => (item._id === itemId ? { ...item, quantity } : item)));
  };

  const getCartTotal = () => {
    return Number(cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2));
  };

  const getCartRestaurant = () => {
    return restaurant;
  };

  const handleCheckout = () => {
    const newOrder = {
      id: Date.now(),
      restaurantName: restaurant.name,
      date: new Date().toISOString(),
      total: getCartTotal(),
      status: 'In Progress...',
      items: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: dishesBetterImages[item.name] || item.image,
      })),
      restaurantImage: restaurant.image,
    };

    addOrder(newOrder);
    navigation.navigate('OrderConfirmation', {
      orderTotal: getCartTotal(),
      items: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: dishesBetterImages[item.name] || item.image,
      })),
      restaurantName: restaurant.name,
      restaurantImage: restaurant.image,
      orderDate: new Date().toISOString(),
      orderId: newOrder.id,
    });
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        restaurant,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        getCartRestaurant,
        clearCart,
        addOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
