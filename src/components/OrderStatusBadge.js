import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'preparing':
      return '#f9ffb7';
    case 'ready':
      return '#4CAF50';
    case 'on the way':
      return '#2196F3';
    case 'delivered':
      return '#4CAF50';
    case 'cancelled':
      return '#f44336';
    default:
      return '#797b89';
  }
};

const getStatusText = (status) => {
  switch (status.toLowerCase()) {
    case 'preparing':
      return 'Preparing';
    case 'ready':
      return 'Ready';
    case 'on the way':
      return 'On the way';
    case 'delivered':
      return 'Delivered';
    case 'cancelled':
      return 'Cancelled';
    default:
      return status;
  }
};

const OrderStatusBadge = ({ status }) => {
  const color = getStatusColor(status);
  const text = getStatusText(status);

  return (
    <View style={[styles.badge, { backgroundColor: color + '15' }]}>
      <Text style={[styles.text, { color }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default OrderStatusBadge;
