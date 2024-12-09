import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import CustomStatusBar from '../components/CustomStatusBar';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { MotiView } from 'moti';
import { format } from 'date-fns';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import dishesBetterImages from '../data/dishesBetterImages';

const OrderItem = ({ item }) => (
  <MotiView from={{ opacity: 0, translateX: -20 }} animate={{ opacity: 1, translateX: 0 }} style={styles.itemContainer}>
    <Image source={dishesBetterImages[item.name] || { uri: item.image }} style={styles.itemImage} />
    <View style={styles.itemDetails}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{(item.price * item.quantity).toFixed(2)} KWD</Text>
    </View>
    <View style={styles.quantityContainer}>
      <Text style={styles.quantity}>x{item.quantity}</Text>
    </View>
  </MotiView>
);

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

const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case 'preparing':
      return 'kitchen-set';
    case 'ready':
      return 'bell-concierge';
    case 'on the way':
      return 'motorcycle';
    case 'delivered':
      return 'circle-check';
    case 'cancelled':
      return 'circle-xmark';
    default:
      return 'circle-question';
  }
};

const getStatusDescription = (status) => {
  switch (status.toLowerCase()) {
    case 'preparing':
      return 'The restaurant is preparing your order';
    case 'ready':
      return 'Your order is ready for pickup';
    case 'on the way':
      return 'Your order is on its way to you';
    case 'delivered':
      return 'Your order has been delivered';
    case 'cancelled':
      return 'This order has been cancelled';
    default:
      return 'Order status unknown';
  }
};

const OrderStatus = ({ status }) => (
  <MotiView
    from={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      type: 'timing',
      duration: 300,
      delay: 100,
    }}
    style={styles.statusCard}
  >
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'timing',
        duration: 300,
        delay: 200,
      }}
      style={[styles.statusIconContainer, { backgroundColor: getStatusColor(status) + '33' }]}
    >
      <Icon name={getStatusIcon(status)} size={24} color={getStatusColor(status)} />
    </MotiView>
    <MotiView
      from={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{
        type: 'timing',
        duration: 300,
        delay: 300,
      }}
      style={styles.statusInfo}
    >
      <Text style={[styles.statusText, { color: getStatusColor(status) }]}>{status}</Text>
      <Text style={styles.statusDescription}>{getStatusDescription(status)}</Text>
    </MotiView>
  </MotiView>
);

const OrderDetails = ({ route }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { order } = route.params;

  return (
    <CustomStatusBar statusBgColor="#1b1d21" bgColor="#1b1d21">
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Icon name="xmark" size={20} color="#d3e8d6" />
        </TouchableOpacity>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.orderInfoCard}>
              <View style={styles.orderInfoRow}>
                <View style={styles.orderInfoItem}>
                  <Text style={styles.orderInfoLabel}>Order ID</Text>
                  <Text style={styles.orderInfoValue}>#{order.id.toString().slice(-6)}</Text>
                </View>
                <View style={styles.orderInfoItem}>
                  <Text style={styles.orderInfoLabel}>Date</Text>
                  <Text style={styles.orderInfoValue}>{format(new Date(order.date), 'MMM d, h:mm a')}</Text>
                </View>
              </View>
            </View>

            <OrderStatus status={order.status} />

            <View style={styles.restaurantCard}>
              <Image source={{ uri: order.restaurantImage }} style={styles.restaurantImage} />
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{order.restaurantName}</Text>
              </View>
            </View>

            <View style={styles.itemsCard}>
              <Text style={styles.sectionTitle}>Order Details</Text>
              {order.items.map((item, index) => (
                <OrderItem key={index} item={item} />
              ))}

              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalAmount}>{order.total} KWD</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </CustomStatusBar>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1d21',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: '#222429',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
    gap: 12,
  },
  orderInfoCard: {
    backgroundColor: '#222429',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#282a2f',
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderInfoItem: {
    gap: 4,
  },
  orderInfoLabel: {
    fontSize: 12,
    color: '#797b89',
    fontFamily: 'Poppins_500Medium',
  },
  orderInfoValue: {
    fontSize: 14,
    color: '#d3e8d6',
    fontFamily: 'Poppins_600SemiBold',
  },
  restaurantCard: {
    backgroundColor: '#222429',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: '#282a2f',
  },
  restaurantImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  restaurantInfo: {
    flex: 1,
    gap: 4,
  },
  restaurantName: {
    fontSize: 18,
    color: '#d3e8d6',
    fontFamily: 'Poppins_600SemiBold',
  },
  itemsCard: {
    backgroundColor: '#222429',
    borderRadius: 16,
    padding: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: '#282a2f',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#d3e8d6',
    fontFamily: 'Poppins_600SemiBold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1b1d21',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
    gap: 4,
  },
  itemName: {
    fontSize: 16,
    color: '#d3e8d6',
    fontFamily: 'Poppins_600SemiBold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#797b89',
    fontFamily: 'Poppins_500Medium',
  },
  quantityContainer: {
    backgroundColor: '#222429',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  quantity: {
    fontSize: 14,
    color: '#d3e8d6',
    fontFamily: 'Poppins_600SemiBold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#282a2f',
  },
  totalLabel: {
    fontSize: 16,
    color: '#d3e8d6',
    fontFamily: 'Poppins_600SemiBold',
  },
  totalAmount: {
    fontSize: 20,
    color: '#d3e8d6',
    fontFamily: 'Poppins_700Bold',
  },
  statusCard: {
    backgroundColor: '#222429',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: '#282a2f',
    overflow: 'hidden',
  },
  statusIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusInfo: {
    flex: 1,
    gap: 4,
  },
  statusText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    textTransform: 'capitalize',
  },
  statusDescription: {
    fontSize: 14,
    color: '#797b89',
    fontFamily: 'Poppins_400Regular',
  },
});

export default OrderDetails;
