import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Categories from './src/components/Categories';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Restaurants from './src/components/Restaurants';
import CustomStatusBar from './src/components/CustomStatusBar';

export default function App() {
  return (
    <SafeAreaProvider>
      <CustomStatusBar statusBgColor="#d3e8d6" bgColor="#1b1d21">
        <View style={styles.container}>
          <Categories />
          <Restaurants />
        </View>
      </CustomStatusBar>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1d21',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
