import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import CustomHeader from './src/components/CustomHeader';
import RestaurantDetail from './src/screens/RestaurantDetail';
import MenuItemDetail from './src/screens/MenuItemDetail';
import Cart from './src/screens/Cart';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import RestaurantsPage from './src/screens/Restaurants';
import { CartProvider } from './src/context/CartContext';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';

export default function App() {
  const Stack = createNativeStackNavigator();

  let [fontLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'Home'}
          screenOptions={({ route, navigation }) => ({
            header: ({ options }) => (
              <CustomHeader
                title={options.title}
                navigation={navigation}
                absolute={options.absolute}
                backgroundColor={options.backgroundColor}
                showLogo={options.showLogo}
              />
            ),
          })}
        >
          <Stack.Screen
            name="Home"
            component={RestaurantsPage}
            options={{ headerShown: true, absolute: false, backgroundColor: '#d3e8d6', showLogo: true }}
          />
          <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} options={{ absolute: true }} />
          <Stack.Screen name="MenuItemDetail" component={MenuItemDetail} options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="Cart" component={Cart} options={{ backgroundColor: '#1b1d21', absolute: false }} />
          <Stack.Screen name="Login" component={Login} options={{}} />
          <Stack.Screen name="Signup" component={Signup} options={{}} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
