import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { deleteToken } from '../api/storage';

const CustomHeader = ({
  navigation,
  title,
  route,
  absolute = true,
  backgroundColor = 'transparent',
  showLogo = false,
  showTitle = false,
  titleColor = '#485c48',
  ...props
}) => {
  const insets = useSafeAreaInsets();
  const { cartItems } = useCart();
  const { setUserAuthenticated } = useUser();
  const isCartScreen = route?.name === 'Cart';
  const isExploreScreen = route?.name === 'Explore';
  const isAccountScreen = route?.name === 'Account';
  const isHomeScreen = route?.name === 'Home';

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            await deleteToken();
            setUserAuthenticated(false);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderLeftButton = () => {
    if (navigation.canGoBack() && !isHomeScreen && !isExploreScreen && !isAccountScreen) {
      return (
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={15} color="#d3e8d6" />
        </TouchableOpacity>
      );
    }
    return null;
  };

  const renderRightButton = () => {
    return (
      <View style={styles.rightButtonsContainer}>
        {isExploreScreen && (
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Map')}>
            <Icon name="map-location-dot" size={15} color="#d3e8d6" />
          </TouchableOpacity>
        )}
        {isAccountScreen && (
          <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
            <Icon name="right-from-bracket" size={15} color="#d3e8d6" />
          </TouchableOpacity>
        )}
        {!isCartScreen && (
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
            <Icon name="cart-shopping" size={15} color="#d3e8d6" />
            {cartItemsCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartItemsCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.header, { paddingTop: insets.top, backgroundColor }, absolute ? { position: 'absolute' } : { position: 'relative' }]}>
      <View style={styles.leftContainer}>
        {renderLeftButton()}
        {showTitle && title && <Text style={[styles.headerTitle, { color: titleColor }]}>{title}</Text>}
      </View>
      {showLogo && (
        <View style={styles.centerContainer}>
          <Text style={styles.title}>ZestZoom</Text>
        </View>
      )}
      <View style={styles.rightContainer}>{renderRightButton()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 0,
    width: '100%',
    padding: 10,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 2,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  rightButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins_800ExtraBold',
    color: '#485c48',
    fontStyle: 'italic',
    letterSpacing: 1,
  },
  iconButton: {
    backgroundColor: '#222429',
    borderRadius: 40,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  badge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: '#d3e8d6',
    borderWidth: 1,
    borderColor: '#1b1d21',
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#1b1d21',
    fontSize: 10,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'Poppins_600SemiBold',
    marginLeft: 10,
  },
});

export default CustomHeader;
