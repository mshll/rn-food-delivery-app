import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import HomeNavigation from '../HomeNavigation/HomeNavigation';
import Icon from 'react-native-vector-icons/FontAwesome6';

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#1b1d21',
          borderTopWidth: 0,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#d3e8d6',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="house" size={size - 3} color={color} />,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={HomeNavigation}
        initialParams={{ screen: 'Explore' }}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="magnifying-glass" size={size - 3} color={color} />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={HomeNavigation}
        // initialParams={{ screen: 'Account' }}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="user" size={size - 3} color={color} />,
        }}
      />
      {/* <Tab.Screen
        name="Cart"
        component={HomeNavigation}
        initialParams={{ screen: 'Cart' }}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="cart-shopping" size={size - 3} color={color} />,
        }}
      /> */}
    </Tab.Navigator>
  );
};
export default BottomNavigation;
