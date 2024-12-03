import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Restaurants from './src/components/Restaurants';
import CustomStatusBar from './src/components/CustomStatusBar';
import RestaurantMenu from './src/components/RestaurantMenu';
import RestaurantDetail from './src/components/RestaurantDetail';
import MenuItemDetail from './src/components/MenuItemDetail';
import Cart from './src/components/Cart';
import Login from './src/components/Login';
import Signup from './src/components/Signup';
import RestaurantsList from './src/components/RestaurantsList';

export default function App() {
  return (
    <SafeAreaProvider>
      <RestaurantsList />
      {/* <RestaurantDetail /> */}
      {/* <MenuItemDetail /> */}
      {/* <Cart /> */}
      {/* <Login /> */}
      {/* <Signup /> */}
    </SafeAreaProvider>
  );
}
