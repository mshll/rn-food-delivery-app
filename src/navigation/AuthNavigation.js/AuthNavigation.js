import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screens/Login';
import Signup from '../../screens/Signup';

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
      {/* <Stack.Screen name="Onboard" component={Onboard} /> */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
