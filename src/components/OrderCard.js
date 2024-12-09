import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import OrderStatusBadge from './OrderStatusBadge';
import { format } from 'date-fns';

const OrderCard = ({ order, onPress }) => {
  const itemCount = order.items.reduce((acc, item) => acc + item.quantity, 0);

  const formatDate = (date) => {
    return format(new Date(date), 'MMM d, h:mm a');
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500 }}
        style={styles.container}
      >
        <Image source={{ uri: order.restaurantImage }} style={styles.image} />
        <View style={styles.rightContent}>
          <View style={styles.header}>
            <Text style={styles.restaurantName}>{order.restaurantName}</Text>
            <OrderStatusBadge status={order.status} />
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.date}>
              {formatDate(order.date)} • {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </Text>
            <Text style={styles.total}>{order.total.toFixed(2)} KWD</Text>
          </View>
        </View>
      </MotiView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#222429',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#282a2f',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  rightContent: {
    flex: 1,
    gap: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantName: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#d3e8d6',
    flex: 1,
    marginRight: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: '#797b89',
    fontFamily: 'Poppins_400Regular',
  },
  total: {
    fontSize: 14,
    color: '#d3e8d6',
    fontFamily: 'Poppins_600SemiBold',
  },
});

export default OrderCard;
