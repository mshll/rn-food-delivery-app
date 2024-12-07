import { NavigationContainer } from '@react-navigation/native';
import { CartProvider } from './src/context/CartContext';
import HomeNavigation from './src/navigation/HomeNavigation/HomeNavigation';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';
import BottomNavigation from './src/navigation/BottomNavigation/BottomNavigation';

export default function App() {
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
        <BottomNavigation />
      </NavigationContainer>
    </CartProvider>
  );
}
