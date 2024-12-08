import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, Alert } from 'react-native';
import CustomStatusBar from '../components/CustomStatusBar';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import dishesBetterImages from '../data/dishesBetterImages';

const CartItem = ({ item, onUpdateQuantity }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, marginHorizontal: 5, gap: 10 }}>
    <Image source={dishesBetterImages[item.name] || { uri: item.image }} style={{ width: 70, height: 70, borderRadius: 10 }} />
    <View style={{ color: '#d3e8d6', flex: 1, alignItems: 'flex-start', justifyContent: 'center', gap: 5 }}>
      <Text style={{ color: '#d3e8d6', fontSize: 18, fontWeight: '600' }}>{item.name}</Text>
      <Text style={{ color: '#797b89', fontSize: 14 }}>{Number((item.price * item.quantity).toFixed(2))} KWD</Text>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 15 }}>
      <TouchableOpacity style={styles.icon} onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}>
        <Icon name="minus" size={16} color="#d8e6ea" />
      </TouchableOpacity>
      <Text style={{ color: '#d3e8d6', fontSize: 16, fontWeight: 'bold' }}>{item.quantity}</Text>
      <TouchableOpacity style={styles.icon} onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}>
        <Icon name="plus" size={16} color="#d8e6ea" />
      </TouchableOpacity>
    </View>
  </View>
);

const CartLayout = ({ children, footer }) => {
  const navigation = useNavigation();

  return (
    <CustomStatusBar statusBgColor="#1b1d21" bgColor="#1b1d21">
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <View style={{ flex: 1 }}>
            <View style={styles.headerContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                <Icon name="xmark" size={20} color="#d3e8d6" />
              </TouchableOpacity>
            </View>
            <Text style={styles.heading}>Cart</Text>
            {children}
          </View>
          {footer}
        </View>
      </View>
    </CustomStatusBar>
  );
};

const Cart = () => {
  const { cartItems, updateQuantity, getCartTotal, restaurant, clearCart, addOrder } = useCart();
  const navigation = useNavigation();

  const handlePayment = () => {
    const newOrder = {
      id: Date.now(),
      restaurantName: restaurant.name,
      date: new Date().toISOString(),
      total: getCartTotal(),
      status: 'Confirmed',
      items: cartItems.map((item) => item.name),
      restaurantImage: restaurant.image,
    };

    addOrder(newOrder);
    clearCart();
    navigation.navigate('OrderConfirmation', {
      orderTotal: getCartTotal(),
      items: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      restaurantName: restaurant.name,
    });
  };

  const renderEmptyCart = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Icon name="cart-shopping" size={50} color="#797b89" style={{ marginBottom: 20 }} />
      <Text style={styles.emptyText}>Your cart is empty</Text>
      <Text style={styles.emptyText}>Add items to get started</Text>
    </View>
  );

  const renderCartItems = () => (
    <>
      {restaurant && <Text style={styles.restaurantName}>From: {restaurant.name}</Text>}
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartItem item={item} onUpdateQuantity={updateQuantity} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ flex: 1 }}
      />
    </>
  );

  const renderFooter = () => {
    if (cartItems.length === 0) {
      return <Button title="Go Back" onPress={() => navigation.pop()} />;
    }

    return (
      <View style={styles.totalContainer}>
        <View style={styles.totalInfo}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>{getCartTotal()} KWD</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Button title="Pay" onPress={handlePayment} />
        </View>
      </View>
    );
  };

  return <CartLayout footer={renderFooter()}>{cartItems.length === 0 ? renderEmptyCart() : renderCartItems()}</CartLayout>;
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1d21',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
  contentWrapper: {
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
  },
  heading: {
    color: '#f9ffb7',
    fontSize: 36,
    fontWeight: '700',
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
  emptyText: {
    color: '#797b89',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  restaurantName: {
    color: '#797b89',
    fontSize: 16,
    marginBottom: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  totalInfo: {
    color: '#d3e8d6',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 5,
  },
  totalLabel: {
    color: '#797b89',
    fontSize: 12,
    fontWeight: '400',
  },
  totalAmount: {
    color: '#d3e8d6',
    fontSize: 18,
    fontWeight: '600',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#222429',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
