import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import CustomStatusBar from '../components/CustomStatusBar';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';

const OrderItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemInfo}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemQuantity}>x{item.quantity}</Text>
    </View>
    <Text style={styles.itemPrice}>{(item.price * item.quantity).toFixed(2)} KWD</Text>
  </View>
);

const OrderConfirmation = ({ route }) => {
  const navigation = useNavigation();
  const { orderTotal, items, restaurantName } = route.params;

  return (
    <CustomStatusBar statusBgColor="#1b1d21" bgColor="#1b1d21">
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Icon name="check-circle" size={80} color="#f9ffb7" />
            </View>
            <Text style={styles.title}>Order Confirmed!</Text>
            <Text style={styles.message}>Your order has been successfully placed</Text>
            <Text style={styles.restaurantName}>From: {restaurantName}</Text>

            <View style={styles.itemsContainer}>
              <Text style={styles.sectionTitle}>Order Details</Text>
              {items.map((item, index) => (
                <OrderItem key={index} item={item} />
              ))}
            </View>

            <Text style={styles.total}>Total Paid: {orderTotal} KWD</Text>
            <Text style={styles.subtitle}>Thank you for your order</Text>
          </View>
        </ScrollView>
        <Button title="Continue" onPress={() => navigation.popToTop()} />
      </View>
    </CustomStatusBar>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1d21',
    padding: 20,
    justifyContent: 'space-between',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f9ffb7',
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    color: '#d3e8d6',
    marginBottom: 16,
    textAlign: 'center',
  },
  restaurantName: {
    fontSize: 16,
    color: '#797b89',
    marginBottom: 24,
  },
  itemsContainer: {
    width: '100%',
    backgroundColor: '#222429',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f9ffb7',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemName: {
    fontSize: 16,
    color: '#d3e8d6',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#797b89',
  },
  itemPrice: {
    fontSize: 16,
    color: '#d3e8d6',
    fontWeight: '500',
  },
  total: {
    fontSize: 20,
    fontWeight: '600',
    color: '#d3e8d6',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#797b89',
    marginBottom: 32,
  },
});

export default OrderConfirmation;
