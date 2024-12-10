import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import CustomStatusBar from '../components/CustomStatusBar';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { LinearGradient } from 'expo-linear-gradient';
import { getRestaurants } from '../api/restaurants';
import { getProfile } from '../api/auth';
import instance from '../api';
import { useQuery } from '@tanstack/react-query';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import OrderCard from '../components/OrderCard';

const AccountSkeleton = () => (
  <CustomStatusBar statusBgColor="#d3e8d6" bgColor="#1b1d21">
    <LinearGradient colors={['#d3e8d6', '#1b1d21']} locations={[0.5, 0.5]} style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, backgroundColor: '#1b1d21' }}>
          <View style={styles.profileSection}>
            <Skeleton width={120} height={120} radius={60} colors={['#222429', '#282a2f']} />
            <Skeleton width={150} height={24} radius={4} colors={['#222429', '#282a2f']} />
            <Skeleton width={200} height={16} radius={4} colors={['#222429', '#282a2f']} />
          </View>

          <View style={styles.menuSection}>
            <View style={styles.menuGroup}>
              <Skeleton width="100%" height={60} radius={12} colors={['#222429', '#282a2f']} />
              <Skeleton width="100%" height={60} radius={12} colors={['#222429', '#282a2f']} />
              <Skeleton width="100%" height={60} radius={12} colors={['#222429', '#282a2f']} />
            </View>

            <View style={styles.menuGroup}>
              <Skeleton width="100%" height={60} radius={12} colors={['#222429', '#282a2f']} />
              <Skeleton width="100%" height={60} radius={12} colors={['#222429', '#282a2f']} />
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  </CustomStatusBar>
);

const Account = () => {
  const navigation = useNavigation();
  const { orders } = useCart();

  const { data: userProfile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  const { data: restaurants, isLoading: isRestaurantsLoading } = useQuery({
    queryKey: ['restaurants'],
    queryFn: getRestaurants,
  });

  // get the first 4 restaurants as favorites
  const favoriteRestaurants = restaurants?.slice(0, 4).reverse() || [];

  const renderFavoriteItem = (restaurant) => (
    <TouchableOpacity key={restaurant._id} style={styles.favoriteItem} onPress={() => navigation.navigate('RestaurantDetail', { restaurant })}>
      <Image source={{ uri: restaurant.image }} style={styles.favoriteImage} />
      <Text style={styles.favoriteText} numberOfLines={1}>
        {restaurant.name}
      </Text>
    </TouchableOpacity>
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'preparing':
        return '#f9ffb733';
      case 'ready':
        return '#4CAF5033';
      case 'on the way':
        return '#2196F333';
      case 'delivered':
        return '#4CAF5033';
      case 'cancelled':
        return '#f4433633';
      default:
        return '#79798933';
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

  const renderRecentOrders = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recent Orders</Text>
      {orders.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>No orders yet</Text>
        </View>
      ) : (
        <View style={styles.ordersContainer}>
          {orders.map((order, index) => (
            <OrderCard key={index} order={order} onPress={() => navigation.navigate('OrderDetails', { order })} />
          ))}
        </View>
      )}
    </View>
  );

  const renderMenuItem = (text) => (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuItemContent}>
        <Text style={styles.menuText}>{text}</Text>
        <Icon name="chevron-right" size={14} color="#7e878a" />
      </View>
    </TouchableOpacity>
  );

  if (isProfileLoading || isRestaurantsLoading) {
    return <AccountSkeleton />;
  }

  return (
    <CustomStatusBar statusBgColor="#d3e8d6" bgColor="#1b1d21">
      <LinearGradient colors={['#d3e8d6', '#1b1d21']} locations={[0.5, 0.5]} style={{ flex: 1 }}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, backgroundColor: '#1b1d21' }}>
            <View style={styles.profileSection}>
              <View style={[styles.avatar, styles.fallbackAvatar]}>
                <Icon name="user-astronaut" size={40} color="#4c5b4a" />
                {userProfile?.image && (
                  <Image
                    source={{ uri: instance.defaults.baseURL + '/' + userProfile.image }}
                    style={[StyleSheet.absoluteFill, styles.avatarImage]}
                  />
                )}
              </View>
              <Text style={styles.username}>{userProfile?.username || 'Loading...'}</Text>
              <Text style={styles.profileSubText}>{userProfile?.username + '@zestzoom.com'}</Text>
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

          {renderRecentOrders()}

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
    borderWidth: 1,
    borderColor: '#797b89',
  },
  favoriteText: {
    color: '#d3e8d6',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Poppins_500Medium',
  },
  orderItem: {
    backgroundColor: '#222429',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#282a2f',
    overflow: 'hidden',
  },
  orderItemContent: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
  },
  orderRestaurantImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  orderInfo: {
    flex: 1,
    gap: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderRestaurantName: {
    fontSize: 16,
    color: '#d3e8d6',
    fontFamily: 'Poppins_600SemiBold',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDate: {
    fontSize: 12,
    color: '#797b89',
    fontFamily: 'Poppins_400Regular',
  },
  orderTotal: {
    fontSize: 14,
    color: '#d3e8d6',
    fontFamily: 'Poppins_600SemiBold',
  },
  orderItemCount: {
    fontSize: 12,
    color: '#797b89',
    fontFamily: 'Poppins_500Medium',
  },
  orderStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderStatusText: {
    fontSize: 10,
    color: '#d3e8d6',
    fontFamily: 'Poppins_500Medium',
    textTransform: 'capitalize',
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
  fallbackAvatar: {
    backgroundColor: '#c2d6c5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    borderRadius: 60,
  },
  ordersContainer: {
    gap: 8,
  },
});
