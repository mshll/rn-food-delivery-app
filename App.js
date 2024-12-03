import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import CustomHeader from './src/components/CustomHeader';
import RestaurantDetail from './src/screens/RestaurantDetail';
import MenuItemDetail from './src/screens/MenuItemDetail';
import Cart from './src/screens/Cart';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import RestaurantsPage from './src/screens/Restaurants';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator
          initialRouteName={'Home'}
          screenOptions={({ route, navigation }) => ({
            header: ({ options }) => (
              <CustomHeader title={options.title} navigation={navigation} absolute={options.absolute} backgroundColor={options.backgroundColor} />
            ),
          })}
        >
          <Stack.Screen name="Home" component={RestaurantsPage} options={{ headerShown: true, absolute: true }} />
          <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} options={{ title: 'Restaurant Detail', absolute: true }} />
          <Stack.Screen name="MenuItemDetail" component={MenuItemDetail} options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="Cart" component={Cart} options={{ backgroundColor: '#1b1d21', absolute: false }} />
          <Stack.Screen name="Login" component={Login} options={{}} />
          <Stack.Screen name="Signup" component={Signup} options={{}} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
