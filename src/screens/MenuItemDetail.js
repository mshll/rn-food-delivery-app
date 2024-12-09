import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Pressable, Alert } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';
import MenuItemDetailHeader from '../components/MenuItemDetailHeader';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { BlurView } from 'expo-blur';

const { height, width } = Dimensions.get('window');

const MenuItemDetail = ({ route }) => {
  const { menuItem, restaurant } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(menuItem.price);
  const navigation = useNavigation();
  const { addToCart } = useCart();

  const translateY = useSharedValue(0);

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateY.value = context.startY + event.translationY;
    },
    onEnd: (event) => {
      if (event.translationY > 100) {
        runOnJS(navigation.goBack)();
      } else {
        translateY.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const handleQuantity = (val) => {
    setQuantity(val);
    if (val < 1) setQuantity(1);
    if (val > 10) setQuantity(10);
  };

  const handleAddToCart = async () => {
    const success = await addToCart(menuItem, quantity, restaurant);
    if (success) {
      navigation.goBack();
    }
  };

  useEffect(() => {
    setTotal(Number((menuItem.price * quantity).toFixed(2)));
  }, [quantity]);

  return (
    <View style={styles.modalContainer}>
      <BlurView intensity={30} tint="systemChromeMaterialDark" style={styles.dismissOverlay}>
        <TouchableOpacity style={styles.dismissOverlay} activeOpacity={1} onPress={() => navigation.goBack()} />
      </BlurView>

      <View style={styles.emptySpace} />

      <GestureHandlerRootView style={styles.contentContainer}>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
          <Animated.View style={[styles.contentWrapper, animatedStyle]}>
            <View style={styles.imageContainer}>
              <MenuItemDetailHeader menuItem={menuItem} />
            </View>

            <View style={styles.detailsCard}>
              <View style={styles.content}>
                <View style={styles.detailsContent}>
                  <Text style={styles.heading}>{menuItem.name}</Text>
                  <Text style={styles.description}>{menuItem.description}</Text>
                </View>

                <View style={styles.controls}>
                  <View style={styles.priceQuantityContainer}>
                    <Text style={styles.price}>{total} KWD</Text>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity style={styles.icon} onPress={() => handleQuantity(quantity - 1)}>
                        <Icon name="minus" size={18} color="#d8e6ea" />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{quantity}</Text>
                      <TouchableOpacity style={styles.icon} onPress={() => handleQuantity(quantity + 1)}>
                        <Icon name="plus" size={18} color="#d8e6ea" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.buttonContainer}>
                    <Button title="Add to Cart" onPress={handleAddToCart} />
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
};

export default MenuItemDetail;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  dismissOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  emptySpace: {
    flex: 0.3,
  },
  contentContainer: {
    flex: 0.7,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: -150,
    zIndex: 2,
  },
  detailsCard: {
    backgroundColor: '#1b1d21',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: height * 0.6,
    zIndex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 0,
    flex: 1,
    justifyContent: 'space-between',
  },
  detailsContent: {
    marginTop: 160,
  },
  heading: {
    color: '#f9ffb7',
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 10,
  },
  description: {
    color: '#d3e8d6',
    fontSize: 14,
    marginTop: 16,
  },
  controls: {
    marginTop: 20,
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    color: '#d3e8d6',
    fontSize: 18,
    fontWeight: '600',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  quantityText: {
    color: '#d3e8d6',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
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
  buttonContainer: {
    width: '100%',
    paddingBottom: 10,
  },
});
