import { NavigationContainer } from '@react-navigation/native';
import { CartProvider } from './src/context/CartContext';
import AuthNavigation from './src/navigation/AuthNavigation.js/AuthNavigation';
import BottomNavigation from './src/navigation/BottomNavigation/BottomNavigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider, useUser } from './src/context/UserContext';
import { useEffect } from 'react';
import { getToken } from './src/api/storage';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';

const queryClient = new QueryClient();

const Navigation = () => {
  const { userAuthenticated, setUserAuthenticated } = useUser();

  const checkToken = async () => {
    const token = await getToken();
    if (token) setUserAuthenticated(true);
  };

  useEffect(() => {
    checkToken();
  }, [userAuthenticated]);

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
  if (!fontLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <CartProvider>
          <UserProvider>
            <Navigation />
          </UserProvider>
        </CartProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
