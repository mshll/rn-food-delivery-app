import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image, FlatList, Pressable } from 'react-native';
import CustomStatusBar from '../components/CustomStatusBar';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useState, useMemo, useEffect } from 'react';
import { getCategories } from '../api/categories';
import { getRestaurants } from '../api/restaurants';
import { recentOrders } from '../data/recentOrders';
import dishesBetterImages from '../data/dishesBetterImages';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';

const QuickSearchItem = ({ icon, label, count, onPress, index }) => (
  <MotiView from={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 100 }} style={styles.quickSearchItem}>
    <TouchableOpacity onPress={onPress} style={styles.quickSearchButton}>
      <View style={styles.quickSearchIconContainer}>
        <Icon name={icon} size={24} color="#485c48" />
        {count ? <Text style={styles.quickSearchCount}>{count}</Text> : null}
      </View>
      <Text style={styles.quickSearchLabel}>{label}</Text>
    </TouchableOpacity>
  </MotiView>
);

const PopularDish = ({ item, onPress, index }) => (
  <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: index * 100 }}>
    <TouchableOpacity style={styles.popularDishItem} onPress={onPress}>
      <View style={styles.popularDishImageContainer}>
        <Image source={dishesBetterImages[item.name] || { uri: item.image }} style={styles.popularDishImage} />
      </View>
      <View style={styles.popularDishContent}>
        <Text style={styles.popularDishName}>{item.name}</Text>
        <Text style={styles.popularDishPrice}>{item.price} KWD</Text>
      </View>
    </TouchableOpacity>
  </MotiView>
);

const ExploreSkeleton = () => (
  <CustomStatusBar statusBgColor="#d3e8d6" bgColor="#1b1d21">
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBarContainer}>
          <Skeleton width="100%" height={50} radius={25} colors={['#222429', '#282a2f']} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.quickSearchContainer}>
          <View style={styles.quickSearchGrid}>
            {[1, 2, 3, 4].map((i) => (
              <View key={i} style={styles.quickSearchItem}>
                <MotiView from={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 100 }}>
                  <View style={styles.quickSearchButton}>
                    <Skeleton width="100%" height={100} radius={16} colors={['#282a2f', '#282a2f']} />
                    <Skeleton width={80} height={20} radius={4} colors={['#282a2f', '#282a2f']} />
                  </View>
                </MotiView>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.popularDishesContainer}>
          <Skeleton width={150} height={24} radius={4} colors={['#282a2f', '#282a2f']} style={{ marginBottom: 20, marginLeft: 16 }} />
          <View style={styles.popularDishesWrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.popularDishesScroll}>
              {[1, 2, 3].map((i) => (
                <MotiView
                  key={i}
                  from={{ opacity: 0, translateY: 20 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ delay: i * 100 }}
                  style={styles.popularDishItem}
                >
                  <View style={styles.popularDishImageContainer}>
                    <Skeleton width={100} height={100} radius={50} colors={['#282a2f', '#282a2f']} />
                  </View>
                  <View style={styles.popularDishContent}>
                    <Skeleton width={100} height={20} radius={4} colors={['#282a2f', '#282a2f']} />
                    <Skeleton width={60} height={16} radius={4} colors={['#282a2f', '#282a2f']} style={{ marginTop: 8 }} />
                  </View>
                </MotiView>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.topRatedContainer}>
          <Skeleton width={200} height={24} radius={4} colors={['#282a2f', '#282a2f']} style={{ marginBottom: 20, marginLeft: 16 }} />
          {[1, 2, 3].map((i) => (
            <MotiView
              key={i}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ delay: i * 100 }}
              style={[styles.topRatedItem, { marginHorizontal: 16 }]}
            >
              <Skeleton width={100} height={100} radius={10} colors={['#282a2f', '#282a2f']} />
              <View style={styles.topRatedContent}>
                <Skeleton width={150} height={20} radius={4} colors={['#282a2f', '#282a2f']} />
                <Skeleton width={100} height={16} radius={4} colors={['#282a2f', '#282a2f']} style={{ marginTop: 8 }} />
                <Skeleton width={120} height={16} radius={4} colors={['#282a2f', '#282a2f']} style={{ marginTop: 8 }} />
              </View>
            </MotiView>
          ))}
        </View>
      </ScrollView>
    </View>
  </CustomStatusBar>
);

const Explore = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [dishesBetterImages, setDishesBetterImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await getCategories();
      const restaurantsData = await getRestaurants();
      const recentOrdersData = recentOrders;
      const dishesBetterImagesData = dishesBetterImages;

      setCategories(categoriesData);
      setRestaurants(restaurantsData);
      setRecentOrders(recentOrdersData);
      setDishesBetterImages(dishesBetterImagesData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const results = [];

    // Search in restaurants
    restaurants.forEach((restaurant) => {
      if (restaurant.name.toLowerCase().includes(query) || restaurant.category.name.toLowerCase().includes(query)) {
        results.push({
          type: 'restaurant',
          item: restaurant,
        });
      }

      // Search in menu items
      restaurant.items.forEach((item) => {
        if (item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)) {
          results.push({
            type: 'menuItem',
            item: { ...item, restaurantName: restaurant.name, restaurantId: restaurant._id },
          });
        }
      });
    });

    return results;
  }, [searchQuery, restaurants]);

  const popularDishes = useMemo(() => {
    const topRestaurants = restaurants.filter((r) => r.rating >= 4.5).slice(0, 3);
    return topRestaurants
      .flatMap((r) =>
        r.items.map((item) => ({
          ...item,
          restaurantName: r.name,
          restaurantId: r._id,
        }))
      )
      .slice(0, 6);
  }, [restaurants]);

  const quickSearchCategories = [
    {
      icon: 'utensils',
      label: 'Cuisines',
      count: categories.length,
    },
    {
      icon: 'clock-rotate-left',
      label: 'Recent',
      count: recentOrders.length,
    },
    {
      icon: 'star',
      label: 'Top Rated',
      count: restaurants.filter((r) => r.rating >= 4.5).length,
    },
    {
      icon: 'bolt',
      label: 'Fast Delivery',
      count: restaurants.filter((r) => parseInt(r.deliveryTime.split('-')[0]) <= 25).length,
    },
  ];

  const renderSearchResult = ({ item, index }) => {
    if (item.type === 'menuItem') {
      return (
        <MotiView from={{ opacity: 0, translateX: -20 }} animate={{ opacity: 1, translateX: 0 }} transition={{ delay: index * 100 }}>
          <TouchableOpacity
            style={styles.searchResultItem}
            onPress={() =>
              navigation.navigate('MenuItemDetail', {
                menuItem: item.item,
                restaurant: restaurants.find((r) => r._id === item.item.restaurantId),
              })
            }
          >
            <Image source={dishesBetterImages[item.item.name] || { uri: item.item.image }} style={styles.searchResultImage} />
            <View style={styles.searchResultContent}>
              <Text style={styles.searchResultTitle}>{item.item.name}</Text>
              <Text style={styles.searchResultSubtitle}>From {item.item.restaurantName}</Text>
            </View>
          </TouchableOpacity>
        </MotiView>
      );
    }

    return (
      <MotiView from={{ opacity: 0, translateX: -20 }} animate={{ opacity: 1, translateX: 0 }} transition={{ delay: index * 100 }}>
        <TouchableOpacity style={styles.searchResultItem} onPress={() => navigation.navigate('RestaurantDetail', { restaurant: item.item })}>
          <Image source={{ uri: item.item.image }} style={styles.searchResultImage} />
          <View style={styles.searchResultContent}>
            <Text style={styles.searchResultTitle}>{item.item.name}</Text>
            <Text style={styles.searchResultSubtitle}>{item.item.category.name}</Text>
          </View>
        </TouchableOpacity>
      </MotiView>
    );
  };

  if (loading) {
    return <ExploreSkeleton />;
  }

  return (
    <CustomStatusBar statusBgColor="#d3e8d6" bgColor="#1b1d21">
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBarContainer}>
            <View style={styles.searchBar}>
              <Icon name="magnifying-glass" size={20} color="#666" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search restaurants, dishes, cuisines..."
                placeholderTextColor="#666"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <MotiView
                  from={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: 'spring' }}
                >
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <Icon name="xmark" size={20} color="#666" style={styles.clearIcon} />
                  </TouchableOpacity>
                </MotiView>
              )}
            </View>
          </View>
        </View>

        {searchQuery ? (
          <FlatList
            data={searchResults}
            keyExtractor={(item, index) => `${item.type}-${item.item._id}-${index}`}
            contentContainerStyle={styles.searchResults}
            renderItem={renderSearchResult}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <MotiView
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40, gap: 10 }}
              >
                <Icon name="magnifying-glass" size={50} color="#797b89" style={{ marginBottom: 20 }} />
                <Text style={styles.noResults}>No results found</Text>
                <Text style={[styles.noResults, { fontSize: 14 }]}>Try searching for something else</Text>
              </MotiView>
            )}
          />
        ) : (
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.quickSearchContainer}>
              <View style={styles.quickSearchGrid}>
                {quickSearchCategories.map((item, index) => (
                  <QuickSearchItem key={index} {...item} index={index} />
                ))}
              </View>
            </View>

            <View style={styles.popularDishesContainer}>
              <Text style={styles.sectionTitle}>Popular Dishes</Text>
              <View style={styles.popularDishesWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.popularDishesScroll}>
                  {popularDishes.map((item, index) => (
                    <PopularDish
                      key={index}
                      item={item}
                      index={index}
                      onPress={() =>
                        navigation.navigate('MenuItemDetail', {
                          menuItem: item,
                          restaurant: restaurants.find((r) => r._id === item.restaurantId),
                        })
                      }
                    />
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.topRatedContainer}>
              <Text style={styles.sectionTitle}>Top Rated Restaurants</Text>
              {restaurants
                .filter((r) => r.rating >= 4.5)
                .slice(0, 3)
                .map((restaurant, index) => (
                  <MotiView
                    key={index}
                    from={{ opacity: 0, translateX: -20 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ delay: index * 100 }}
                  >
                    <TouchableOpacity style={styles.topRatedItem} onPress={() => navigation.navigate('RestaurantDetail', { restaurant })}>
                      <Image source={{ uri: restaurant.image }} style={styles.topRatedImage} />
                      <View style={styles.topRatedContent}>
                        <Text style={styles.topRatedTitle}>{restaurant.name}</Text>
                        <Text style={styles.topRatedCategory}>{restaurant.category.name}</Text>
                        <View style={styles.ratingContainer}>
                          <Icon name="star" solid size={16} color="#d3e8d6" />
                          <Text style={styles.ratingText}>{restaurant.rating}</Text>
                          <Text style={styles.deliveryTime}> • {restaurant.deliveryTime}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </MotiView>
                ))}
            </View>
          </ScrollView>
        )}
      </View>
    </CustomStatusBar>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1d21',
  },
  searchContainer: {
    backgroundColor: '#d3e8d6',
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1b1d21',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  clearIcon: {
    marginLeft: 8,
  },
  searchInput: {
    flex: 1,
    color: '#d3e8d6',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: '#d3e8d6',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  quickSearchContainer: {
    marginBottom: 24,
  },
  quickSearchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  quickSearchItem: {
    width: '50%',
    padding: 8,
  },
  quickSearchButton: {
    alignItems: 'center',
    gap: 8,
  },
  quickSearchIconContainer: {
    backgroundColor: '#d3e8d6',
    borderRadius: 16,
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  quickSearchCount: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#485c48',
    color: '#d3e8d6',
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  quickSearchLabel: {
    color: '#d3e8d6',
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',
  },
  popularDishesContainer: {
    marginBottom: 24,
  },
  popularDishesWrapper: {
    height: 200,
    overflow: 'hidden',
  },
  popularDishesScroll: {
    paddingHorizontal: 16,
  },
  popularDishItem: {
    width: 160,
    marginRight: 16,
    backgroundColor: '#222429',
    borderRadius: 10,
    overflow: 'visible',
    borderWidth: 1,
    borderColor: '#282a2f',
    marginTop: 50,
  },
  popularDishImageContainer: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: -40,
  },
  popularDishImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  popularDishContent: {
    padding: 12,
    backgroundColor: '#222429',
    borderRadius: 10,
  },
  popularDishName: {
    color: '#d3e8d6',
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 4,
  },
  popularDishPrice: {
    color: '#999',
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
  },
  topRatedContainer: {
    paddingBottom: 24,
  },
  topRatedItem: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#222429',
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 100,
    borderWidth: 1,
    borderColor: '#282a2f',
  },
  topRatedImage: {
    width: 100,
    height: '100%',
  },
  topRatedContent: {
    flex: 1,
    padding: 12,
  },
  topRatedTitle: {
    color: '#d3e8d6',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 4,
  },
  topRatedCategory: {
    color: '#999',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#d3e8d6',
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    marginLeft: 4,
  },
  deliveryTime: {
    color: '#999',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  searchResults: {
    padding: 16,
  },
  searchResultItem: {
    flexDirection: 'row',
    backgroundColor: '#222429',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#282a2f',
    height: 100,
  },
  searchResultImage: {
    width: 100,
    height: '100%',
    resizeMode: 'cover',
  },
  searchResultContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  searchResultTitle: {
    color: '#d3e8d6',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 4,
  },
  searchResultSubtitle: {
    color: '#999',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  mapButton: {
    width: 40,
    height: 40,
    backgroundColor: '#222429',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResults: {
    color: '#797b89',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
  },
});
