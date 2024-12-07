import { StyleSheet, Text, View, FlatList, ImageBackground, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { SafeAreaView } from 'react-native-safe-area-context';
import restaurants from '../data/restaurants';
import { LinearGradient } from 'expo-linear-gradient';
import { renderStars } from '../utils/utils';
import dishesBetterImages from '../data/dishesBetterImages';

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = 300;

const MenuItemDetailHeader = ({ menuItem }) => {
  return (
    <View style={styles.container}>
      <Image source={dishesBetterImages[menuItem.name] || { uri: menuItem.image }} style={styles.image} />
    </View>
  );
};

export default MenuItemDetailHeader;

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    height: IMAGE_HEIGHT,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
