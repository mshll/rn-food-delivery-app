import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import CustomStatusBar from '../components/CustomStatusBar';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import { getRestaurants } from '../api/restaurants';

const Account = () => {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { orders } = useCart();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();
        // For now, we'll just use the first 4 restaurants as favorites
        // In a real app, this would be based on user preferences
        setFavoriteRestaurants(data.slice(0, 4).reverse());
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const renderFavoriteItem = (restaurant) => (
    <TouchableOpacity key={restaurant._id} style={styles.favoriteItem} onPress={() => navigation.navigate('RestaurantDetail', { restaurant })}>
      <Image source={{ uri: restaurant.image }} style={styles.favoriteImage} />
      <Text style={styles.favoriteText} numberOfLines={1}>
        {restaurant.name}
      </Text>
    </TouchableOpacity>
  );

  const renderOrderItem = (order) => (
    <TouchableOpacity key={order.id} style={styles.orderItem}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderRestaurant}>{order.restaurantName}</Text>
        <Text style={styles.orderDate}>{format(new Date(order.date), 'MMM d, yyyy')}</Text>
      </View>
      <Text style={styles.orderItems}>{order.items.join(', ')}</Text>
      <View style={styles.orderFooter}>
        <Text style={styles.orderTotal}>{order.total.toFixed(3)} KWD</Text>
        <Text style={[styles.orderStatus, { color: '#d3e8d6' }]}>{order.status}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderMenuItem = (text) => (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuItemContent}>
        <Text style={styles.menuText}>{text}</Text>
        <Icon name="chevron-right" size={14} color="#7e878a" />
      </View>
    </TouchableOpacity>
  );

  return (
    <CustomStatusBar statusBgColor="#d3e8d6" bgColor="#1b1d21">
      <LinearGradient colors={['#d3e8d6', '#1b1d21']} locations={[0.5, 0.5]} style={{ flex: 1 }}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, backgroundColor: '#1b1d21' }}>
            <View style={styles.profileSection}>
              <Image source={{ uri: 'https://github.com/mshll.png' }} style={styles.avatar} />
              <Text style={styles.username}>Meshal Almutairi</Text>
              <Text style={styles.profileSubText}>meshal@me.com</Text>
            </View>
          </View>

          <View style={styles.favoritesSection}>
            <Text style={[styles.sectionTitle, { paddingHorizontal: 20 }]}>Go-To Restaurants</Text>
            {favoriteRestaurants.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.favoritesScroll}
                contentContainerStyle={styles.favoritesScrollContent}
              >
                {favoriteRestaurants.map(renderFavoriteItem)}
              </ScrollView>
            ) : (
              <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyStateText}>You haven't liked any restaurants yet</Text>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            {orders?.length > 0 ? (
              orders.map(renderOrderItem)
            ) : (
              <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyStateText}>No orders yet</Text>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Settings</Text>
            {renderMenuItem('Addresses')}
            {renderMenuItem('Payment Methods')}
            {renderMenuItem('Settings')}
          </View>
        </ScrollView>
      </LinearGradient>
    </CustomStatusBar>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1b1d21',
  },
  profileSection: {
    alignItems: 'center',
    paddingBottom: 30,
    backgroundColor: '#d3e8d6',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#4c5b4a',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4c5b4a',
    fontFamily: 'Poppins_600SemiBold',
  },
  profileSubText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#4c5b4a',
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#1b1d21',
  },
  favoritesSection: {
    paddingTop: 20,
    backgroundColor: '#1b1d21',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#d3e8d6',
    marginBottom: 15,
  },
  favoritesScroll: {
    flexGrow: 0,
  },
  favoritesScrollContent: {
    paddingHorizontal: 20,
  },
  favoriteItem: {
    marginRight: 15,
    alignItems: 'center',
    width: 100,
  },
  favoriteImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#d3e8d6',
  },
  favoriteText: {
    color: '#d3e8d6',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Poppins_500Medium',
  },
  orderItem: {
    backgroundColor: '#222429',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#282a2f',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderRestaurant: {
    color: '#d3e8d6',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  orderDate: {
    color: '#888',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  orderItems: {
    color: '#aaa',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 8,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTotal: {
    color: '#d3e8d6',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  orderStatus: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
  },
  menuItem: {
    backgroundColor: '#222429',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#282a2f',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuText: {
    color: '#d3e8d6',
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
  },
  emptyStateContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    backgroundColor: '#222429',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#282a2f',
    width: '100%',
  },
  emptyStateText: {
    color: '#888',
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
  },
});
