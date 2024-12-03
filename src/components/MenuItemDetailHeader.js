import { StyleSheet, Text, View, FlatList, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { SafeAreaView } from 'react-native-safe-area-context';
import restaurants from '../data/restaurants';
import { LinearGradient } from 'expo-linear-gradient';
import { renderStars } from '../utils/utils';

const MenuItemDetailHeader = ({}) => {
  const menuItem = restaurants[0].menuItems[0];
  return (
    <View style={styles.container}>
      <Image source={{ uri: menuItem.image }} style={styles.image} />
    </View>
  );
};

export default MenuItemDetailHeader;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#1b1d21',
    height: 400,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
});
