import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useState } from 'react';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import { login } from '../api/auth';
import { setToken } from '../api/storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMutation } from '@tanstack/react-query';
import { MotiView } from 'moti';

const LoadingDots = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
    <Text style={{ color: '#1b1d21', fontSize: 16, fontFamily: 'Poppins_600SemiBold' }}>Signing in</Text>
    {[0, 1, 2].map((index) => (
      <MotiView
        key={index}
        from={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        transition={{
          type: 'timing',
          duration: 500,
          loop: true,
          delay: index * 150,
        }}
      >
        <Text style={{ color: '#1b1d21', fontSize: 16, fontFamily: 'Poppins_600SemiBold' }}>.</Text>
      </MotiView>
    ))}
  </View>
);

const Login = () => {
  const navigation = useNavigation();
  const { setUserAuthenticated } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const insets = useSafeAreaInsets();

  const {
    mutate: loginMutation,
    isLoading,
    error,
  } = useMutation({
    mutationFn: () => login(username, password),
    onSuccess: async (response) => {
      await setToken(response.token);
      setUserAuthenticated(true);
    },
  });

  const handleLogin = () => {
    loginMutation();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.container]}>
          <ScrollView contentContainerStyle={styles.scrollContent} bounces={false} showsVerticalScrollIndicator={false}>
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 300 }}
              style={styles.mainSection}
            >
              <View style={styles.header}>
                <Text style={styles.title}>ZestZoom</Text>
                <Text style={styles.subtitle}>Sign in to your account</Text>
              </View>

              <View style={styles.form}>
                <MotiView
                  from={{ opacity: 0, translateX: -20 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ type: 'timing', duration: 300, delay: 100 }}
                >
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Username"
                      placeholderTextColor="#666"
                      value={username}
                      onChangeText={setUsername}
                      autoCapitalize="none"
                    />
                  </View>
                </MotiView>

                <MotiView
                  from={{ opacity: 0, translateX: -20 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ type: 'timing', duration: 300, delay: 200 }}
                >
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor="#666"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                    />
                  </View>
                </MotiView>

                {error ? (
                  <MotiView from={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                    <Text style={styles.error}>Invalid username or password</Text>
                  </MotiView>
                ) : null}
              </View>
            </MotiView>
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.link}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Button onPress={handleLogin} disabled={isLoading}>
              {isLoading ? <LoadingDots /> : <Text style={styles.buttonText}>Sign in</Text>}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1d21',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    gap: 40,
  },
  mainSection: {
    flex: 1,
    justifyContent: 'center',
    gap: 40,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    color: '#d3e8d6',
    fontFamily: 'Poppins_800ExtraBold',
    fontStyle: 'italic',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    fontFamily: 'Poppins_400Regular',
  },
  form: {
    gap: 15,
  },
  inputContainer: {
    backgroundColor: '#222429',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#282a2f',
  },
  input: {
    padding: 15,
    color: '#d3e8d6',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  error: {
    color: '#ff6b6b',
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
  },
  buttonContainer: {
    backgroundColor: '#1b1d21',
    padding: 20,
    paddingTop: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    color: '#666',
    fontFamily: 'Poppins_400Regular',
  },
  link: {
    color: '#d3e8d6',
    fontFamily: 'Poppins_600SemiBold',
  },
  buttonText: {
    color: '#1b1d21',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
});
