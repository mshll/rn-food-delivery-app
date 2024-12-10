import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import { MotiView } from 'moti';

const Welcome = ({ navigation }) => {
  return (
    <ImageBackground source={require('../../assets/images/welcome-bg.jpg')} style={styles.container} resizeMode="cover">
      <LinearGradient colors={['transparent', '#1b1d21', '#1b1d21']} style={styles.gradient}>
        <View style={styles.content}>
          <MotiView from={{ opacity: 0, translateY: 50 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 1000 }}>
            <Text style={styles.title}>ZestZoom</Text>
            <Text style={styles.subtitle}>Your favorite restaurants,{'\n'}delivered to your doorstep</Text>
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 1000, delay: 200 }}
            style={styles.buttonContainer}
          >
            <Button title="Login" onPress={() => navigation.navigate('Login')} bgColor="#d3e8d6" color="#1b1d21" />
            <Button title="Create Account" onPress={() => navigation.navigate('Signup')} bgColor="#1b1d21" color="#d3e8d6" />
          </MotiView>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1d21',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  content: {
    gap: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    fontFamily: 'Poppins_800ExtraBold',
    color: '#d3e8d6',
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: '#d3e8d6',
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 32,
  },
  buttonContainer: {
    gap: 12,
  },
});
