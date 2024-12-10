import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screens/Login';
import Signup from '../../screens/Signup';
import Welcome from '../../screens/Welcome';

const Stack = createNativeStackNavigator();

const fadeAnimation = {
  animation: 'timing',
  config: {
    duration: 100,
  },
};

const screenOptions = {
  headerShown: false,
  animationTypeForReplace: 'pop',
  animation: 'fade',
  contentStyle: { backgroundColor: '#1b1d21' },
  transitionSpec: {
    open: fadeAnimation,
    close: fadeAnimation,
  },
};

export default function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
