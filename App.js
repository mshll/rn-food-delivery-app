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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator initialRouteName={'Home'}>
          <Stack.Screen name="Home" component={RestaurantsList} />
          <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
          <Stack.Screen name="MenuItemDetail" component={MenuItemDetail} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
