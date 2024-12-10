import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MotiView } from 'moti';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomStatusBar from '../components/CustomStatusBar';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';
import dishesBetterImages from '../data/dishesBetterImages';

const MenuItemDetail = ({ route }) => {
  const { menuItem, restaurant } = route.params;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('regular');
  const [selectedExtras, setSelectedExtras] = useState([]);

  const sizes = {
    small: { label: 'Small', price: menuItem.price - 1 },
    regular: { label: 'Regular', price: menuItem.price },
    large: { label: 'Large', price: menuItem.price + 1 },
  };

  const extras = [
    { id: 1, name: 'Extra Cheese', price: 0.5 },
    { id: 2, name: 'Extra Sauce', price: 0.3 },
    { id: 3, name: 'Extra Toppings', price: 0.7 },
  ];

  const handleAddExtra = (extra) => {
    if (selectedExtras.find((e) => e.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter((e) => e.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const totalPrice = () => {
    const basePrice = sizes[selectedSize].price * quantity;
    const extrasPrice = selectedExtras.reduce((sum, extra) => sum + extra.price, 0) * quantity;
    return (basePrice + extrasPrice).toFixed(2);
  };

  const handleAddToCart = async () => {
    const itemToAdd = {
      ...menuItem,
      quantity,
      size: selectedSize,
      extras: selectedExtras,
      price: parseFloat(totalPrice()) / quantity,
    };

    const success = await addToCart(itemToAdd, quantity, restaurant);
    if (success) {
      navigation.goBack();
    }
  };

  return (
    <CustomStatusBar statusBgColor="#1b1d21" bgColor="#1b1d21">
      <View style={styles.container}>
        <TouchableOpacity style={[styles.closeButton, { top: 20 }]} onPress={() => navigation.goBack()}>
          <Icon name="xmark" size={20} color="#d3e8d6" />
        </TouchableOpacity>

        <ScrollView style={[styles.scrollView]} showsVerticalScrollIndicator={false}>
          <View style={[styles.imageSection, { paddingVertical: 20 }]}>
            <View style={styles.imageWrapper}>
              <Image source={dishesBetterImages[menuItem.name] || { uri: menuItem.image }} style={styles.image} resizeMode="contain" />
              {menuItem.isPopular && (
                <View style={styles.popularBadge}>
                  <Icon name="fire" size={10} color="#1b1d21" solid style={{ marginRight: 4 }} />
                  <Text style={styles.popularText}>Popular</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.titleContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.name}>{menuItem.name}</Text>
              <View style={styles.priceBadge}>
                <Text style={styles.price}>{totalPrice()} KWD</Text>
              </View>
            </View>
            <Text style={styles.description}>
              {menuItem.description || 'A delicious dish prepared with the finest ingredients and served with love.'}
            </Text>
          </View>

          <View style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Size</Text>
              <View style={styles.sizeOptions}>
                {Object.entries(sizes).map(([key, value]) => (
                  <TouchableOpacity
                    key={key}
                    style={[styles.sizeOption, selectedSize === key && styles.selectedSizeOption]}
                    onPress={() => setSelectedSize(key)}
                  >
                    <Text style={[styles.sizeOptionText, selectedSize === key && styles.selectedSizeOptionText]}>{value.label}</Text>
                    <Text style={[styles.sizeOptionPrice, selectedSize === key && styles.selectedSizeOptionText]}>{value.price.toFixed(2)} KWD</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Extras</Text>
              <View style={styles.extrasOptions}>
                {extras.map((extra) => (
                  <TouchableOpacity
                    key={extra.id}
                    style={[styles.extraOption, selectedExtras.find((e) => e.id === extra.id) && styles.selectedExtraOption]}
                    onPress={() => handleAddExtra(extra)}
                  >
                    <Text style={[styles.extraOptionText, selectedExtras.find((e) => e.id === extra.id) && styles.selectedExtraOptionText]}>
                      {extra.name}
                    </Text>
                    <Text style={[styles.extraOptionPrice, selectedExtras.find((e) => e.id === extra.id) && styles.selectedExtraOptionText]}>
                      +{extra.price.toFixed(2)} KWD
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.quantitySection}>
              <View style={styles.quantityRow}>
                <Text style={styles.sectionTitle}>Quantity</Text>
                <View style={styles.quantitySelector}>
                  <TouchableOpacity style={styles.quantityButton} onPress={() => quantity > 1 && setQuantity(quantity - 1)}>
                    <Icon name="minus" size={14} color="#d3e8d6" />
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{quantity}</Text>
                  <TouchableOpacity style={styles.quantityButton} onPress={() => quantity < 10 && setQuantity(quantity + 1)}>
                    <Icon name="plus" size={14} color="#d3e8d6" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
          <Button onPress={handleAddToCart} style={styles.addButton} title={`Add to Cart • ${totalPrice()} KWD`} />
        </View>
      </View>
    </CustomStatusBar>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1d21',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    zIndex: 20,
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
  imageSection: {
    backgroundColor: '#222429',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  imageWrapper: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  popularBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#f9ffb7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularText: {
    color: '#1b1d21',
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
  titleContainer: {
    padding: 20,
    gap: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  name: {
    fontSize: 24,
    color: '#d3e8d6',
    fontFamily: 'Poppins_600SemiBold',
    flex: 1,
  },
  priceBadge: {
    backgroundColor: '#1b1d21',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  price: {
    color: '#f9ffb7',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  description: {
    color: '#797b89',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 20,
  },
  content: {
    padding: 20,
    gap: 24,
  },
  section: {
    backgroundColor: '#222429',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  quantitySection: {
    backgroundColor: '#222429',
    borderRadius: 16,
    padding: 16,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#d3e8d6',
    fontFamily: 'Poppins_600SemiBold',
  },
  sizeOptions: {
    gap: 8,
  },
  sizeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1b1d21',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#282a2f',
  },
  selectedSizeOption: {
    backgroundColor: '#f9ffb7',
    borderColor: '#f9ffb7',
  },
  sizeOptionText: {
    color: '#d3e8d6',
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
  },
  sizeOptionPrice: {
    color: '#797b89',
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
  },
  selectedSizeOptionText: {
    color: '#1b1d21',
  },
  extrasOptions: {
    gap: 8,
  },
  extraOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1b1d21',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#282a2f',
  },
  selectedExtraOption: {
    backgroundColor: '#f9ffb7',
    borderColor: '#f9ffb7',
  },
  extraOptionText: {
    color: '#d3e8d6',
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
  },
  extraOptionPrice: {
    color: '#797b89',
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
  },
  selectedExtraOptionText: {
    color: '#1b1d21',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1b1d21',
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    color: '#d3e8d6',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    paddingHorizontal: 16,
  },
  footer: {
    backgroundColor: '#1b1d21',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#282a2f',
  },
  addButton: {
    backgroundColor: '#f9ffb7',
  },
  addButtonText: {
    color: '#1b1d21',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
});

export default MenuItemDetail;
