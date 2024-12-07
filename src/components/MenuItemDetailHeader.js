import { StyleSheet, Text, View, FlatList, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { SafeAreaView } from 'react-native-safe-area-context';
import restaurants from '../data/restaurants';
import { LinearGradient } from 'expo-linear-gradient';
import { renderStars } from '../utils/utils';
import dishesBetterImages from '../data/dishesBetterImages';

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
    flex: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    height: '50%',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
});
