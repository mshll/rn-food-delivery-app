import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useCart } from '../context/CartContext';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Button from '../components/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import dishesBetterImages from '../data/dishesBetterImages';

const CartItem = ({ item, index }) => {
  const { updateQuantity } = useCart();

  return (
    <MotiView
      from={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ delay: index * 100 }}
      style={styles.cartItem}
    >
      <Image source={dishesBetterImages[item.name] || { uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price} KWD</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => updateQuantity(item._id, item.quantity - 1)}>
          <Icon name="minus" size={12} color="#d3e8d6" />
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => updateQuantity(item._id, item.quantity + 1)}>
          <Icon name="plus" size={12} color="#d3e8d6" />
        </TouchableOpacity>
      </View>
    </MotiView>
  );
};

const EmptyCart = () => (
  <MotiView from={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={styles.emptyContainer}>
    <Icon name="cart-shopping" size={50} color="#797b89" style={{ marginBottom: 20 }} />
    <Text style={styles.emptyText}>Your cart is empty</Text>
    <Text style={[styles.emptySubText]}>Add some delicious items to your cart</Text>
  </MotiView>
);

const Cart = ({ navigation }) => {
  const { cartItems, getCartTotal, getCartRestaurant, clearCart, addOrder } = useCart();
  const insets = useSafeAreaInsets();
  const restaurant = getCartRestaurant();

  const handleCheckout = () => {
    const newOrder = {
      id: Date.now(),
      restaurantName: restaurant.name,
      date: new Date().toISOString(),
      total: getCartTotal(),
      status: 'preparing',
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

  if (!cartItems.length) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Icon name="xmark" size={20} color="#d3e8d6" />
        </TouchableOpacity>
        <EmptyCart />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Icon name="xmark" size={20} color="#d3e8d6" />
      </TouchableOpacity>

      <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} style={styles.header}>
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.itemCount}>{cartItems.length} items</Text>
        </View>
      </MotiView>

      <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator={false}>
        {cartItems.map((item, index) => (
          <CartItem key={item._id} item={item} index={index} />
        ))}
      </ScrollView>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 200 }}
        style={[styles.footer, { paddingBottom: insets.bottom || 20 }]}
      >
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>{getCartTotal()} KWD</Text>
        </View>
        <Button onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </Button>
      </MotiView>
    </View>
  );
};

export default Cart;

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
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#282a2f',
    marginTop: 20,
  },
  restaurantInfo: {
    gap: 5,
  },
  restaurantName: {
    fontSize: 24,
    color: '#d3e8d6',
    fontFamily: 'Poppins_600SemiBold',
  },
  itemCount: {
    fontSize: 14,
    color: '#797b89',
    fontFamily: 'Poppins_500Medium',
  },
  itemsContainer: {
    flex: 1,
    padding: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222429',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#282a2f',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
    gap: 5,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1b1d21',
    padding: 8,
    borderRadius: 20,
    gap: 15,
  },
  quantity: {
    fontSize: 14,
    color: '#d3e8d6',
    fontFamily: 'Poppins_600SemiBold',
    minWidth: 20,
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    gap: 20,
    borderTopWidth: 1,
    borderTopColor: '#282a2f',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  checkoutText: {
    color: '#1b1d21',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  emptyText: {
    fontSize: 18,
    color: '#d3e8d6',
    fontFamily: 'Poppins_600SemiBold',
  },
  emptySubText: {
    fontSize: 14,
    color: '#797b89',
    fontFamily: 'Poppins_500Medium',
  },
});
