import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from '../../components/CustomHeader';
import RestaurantDetail from '../../screens/RestaurantDetail';
import MenuItemDetail from '../../screens/MenuItemDetail';
import Cart from '../../screens/Cart';
import Login from '../../screens/Login';
import Signup from '../../screens/Signup';
import RestaurantsPage from '../../screens/Restaurants';
import Explore from '../../screens/Explore';

const Stack = createNativeStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={({ route, navigation }) => ({
        header: ({ options }) => (
          <CustomHeader
            title={options.title}
            navigation={navigation}
            route={route}
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
      <Stack.Screen name="MenuItemDetail" component={MenuItemDetail} options={{ presentation: 'transparentModal', headerShown: false }} />
      <Stack.Screen name="Cart" component={Cart} options={{ backgroundColor: '#1b1d21', absolute: false }} />
      <Stack.Screen name="Login" component={Login} options={{}} />
      <Stack.Screen name="Signup" component={Signup} options={{}} />
      <Stack.Screen name="Explore" component={Explore} options={{}} />
    </Stack.Navigator>
  );
}
