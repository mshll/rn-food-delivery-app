import { StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { SafeAreaView } from 'react-native-safe-area-context';
import restaurants from '../data/restaurants';
import { LinearGradient } from 'expo-linear-gradient';
import { renderStars } from '../utils/utils';

const RestaurantDetailHeader = ({}) => {
  const restaurant = restaurants[0];
  return (
    <ImageBackground source={{ uri: restaurant.image }} style={styles.container}>
      <LinearGradient colors={['transparent', '#1b1d21']} style={styles.gradient}>
        <View style={styles.item}>
          <View style={styles.cardDetails}>
            <Text style={styles.textLarge}>{restaurant.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {renderStars(restaurant.rating)}
                <Text style={styles.subText}> {restaurant.rating}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="truck-fast" size={11} color="#f7ffae" />
                <Text style={[styles.subText, { color: '#f7ffae' }]}>
                  {'  '}
                  {restaurant.deliveryTime}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default RestaurantDetailHeader;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignSelf: 'stretch',
    color: '#fff',
    borderEndEndRadius: 30,
    borderEndStartRadius: 30,
    height: 300,
  },
  item: {
    margin: 5,
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    gap: 5,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 15,
  },
  cardDetails: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    gap: 10,
  },
  textLarge: {
    color: '#d3e8d6',
    fontSize: 38,
    fontWeight: '600',
  },
  subText: {
    color: '#f7ffae',
    fontSize: 18,
    fontWeight: '500',
  },
});
