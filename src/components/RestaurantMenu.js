import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MotiView } from 'moti';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import dishesBetterImages from '../data/dishesBetterImages';

const MenuItem = ({ item, onPress, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <MotiView
      from={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{
        type: 'timing',
        duration: 500,
        delay: index * 100,
      }}
    >
      <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <View style={styles.imageWrapper}>
          <View style={styles.imageContainer}>
            <Image
              source={dishesBetterImages[item.name] || { uri: item.image }}
              style={styles.image}
              resizeMode="contain"
              onLoad={() => setImageLoaded(true)}
            />
          </View>
          {item.isPopular && (
            <View style={styles.popularBadge}>
              <Icon name="fire" size={10} color="#1b1d21" solid style={{ marginRight: 4 }} />
              <Text style={styles.popularText}>Popular</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.priceBadge}>
              <Text style={styles.price}>{item.price.toFixed(2)} KWD</Text>
            </View>
          </View>

          <Text style={styles.description} numberOfLines={2}>
            {item.description || 'A delicious dish prepared with the finest ingredients and served with love.'}
          </Text>

          <View style={styles.footer}>
            {item.isVegetarian && (
              <View style={styles.tagBadge}>
                <Icon name="leaf" size={10} color="#4CAF50" solid style={{ marginRight: 4 }} />
                <Text style={[styles.tagText, { color: '#4CAF50' }]}>Vegetarian</Text>
              </View>
            )}
            {item.isSpicy && (
              <View style={styles.tagBadge}>
                <Icon name="pepper-hot" size={10} color="#f44336" solid style={{ marginRight: 4 }} />
                <Text style={[styles.tagText, { color: '#f44336' }]}>Spicy</Text>
              </View>
            )}
            <View style={styles.prepTime}>
              <Icon name="clock" size={10} color="#797b89" style={{ marginRight: 4 }} />
              <Text style={styles.prepTimeText}>{Math.floor(Math.random() * 10) + 10} mins</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </MotiView>
  );
};

const RestaurantMenu = ({ restaurant }) => {
  const navigation = useNavigation();

  // Add random properties to menu items
  const enhancedMenu = restaurant.items.map((item) => ({
    ...item,
    isPopular: Math.random() > 0.7,
    isVegetarian: Math.random() > 0.7,
    isSpicy: Math.random() > 0.7,
  }));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {enhancedMenu.map((item, index) => (
        <MenuItem key={item._id} item={item} onPress={() => navigation.navigate('MenuItemDetail', { menuItem: item, restaurant })} index={index} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 8,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#222429',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#282a2f',
    padding: 12,
    gap: 12,
  },
  imageWrapper: {
    width: 85,
    height: 85,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#f9ffb7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularText: {
    color: '#1b1d21',
    fontSize: 8,
    fontFamily: 'Poppins_600SemiBold',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  name: {
    fontSize: 14,
    color: '#d3e8d6',
    fontFamily: 'Poppins_600SemiBold',
    flex: 1,
  },
  priceBadge: {
    backgroundColor: '#1b1d21',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  price: {
    color: '#f9ffb7',
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
  description: {
    color: '#797b89',
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 14,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 2,
  },
  tagBadge: {
    backgroundColor: '#1b1d21',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagText: {
    fontSize: 9,
    fontFamily: 'Poppins_500Medium',
  },
  prepTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  prepTimeText: {
    color: '#797b89',
    fontSize: 9,
    fontFamily: 'Poppins_500Medium',
  },
});

export default RestaurantMenu;
