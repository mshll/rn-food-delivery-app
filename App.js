import { NavigationContainer } from '@react-navigation/native';
import { CartProvider } from './src/context/CartContext';
import AuthNavigation from './src/navigation/AuthNavigation.js/AuthNavigation';
import BottomNavigation from './src/navigation/BottomNavigation/BottomNavigation';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';
import { UserProvider, useUser } from './src/context/UserContext';

const Navigation = () => {
  const { userAuthenticated } = useUser();

  return <>{userAuthenticated ? <BottomNavigation /> : <AuthNavigation />}</>;
};

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
    <NavigationContainer>
      <CartProvider>
        <UserProvider>
          <Navigation />
        </UserProvider>
      </CartProvider>
    </NavigationContainer>
  );
}
