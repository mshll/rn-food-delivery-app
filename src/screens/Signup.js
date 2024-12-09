import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
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
import { register } from '../api/auth';
import { setToken } from '../api/storage';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMutation } from '@tanstack/react-query';
import { MotiView } from 'moti';

const LoadingDots = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
    <Text style={{ color: '#1b1d21', fontSize: 16, fontFamily: 'Poppins_600SemiBold' }}>Creating account</Text>
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

const Signup = () => {
  const navigation = useNavigation();
  const { setUserAuthenticated } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const [validationError, setValidationError] = useState('');
  const insets = useSafeAreaInsets();

  const {
    mutate: signupMutation,
    isLoading,
    error,
  } = useMutation({
    mutationFn: () => register(username, password, image),
    onSuccess: async (response) => {
      await setToken(response.token);
      setUserAuthenticated(true);
    },
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Please grant camera roll permissions to select an image');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const name = uri.split('/').pop();
      const type = 'image/' + uri.split('.').pop();

      setImage({
        uri,
        name,
        type,
      });
    }
  };

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    if (!image) {
      setValidationError('Please select a profile image');
      return;
    }

    setValidationError('');
    signupMutation();
  };

  const displayError = validationError || (error ? 'Username already exists' : null);

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
                <Text style={styles.subtitle}>Create your new account</Text>
              </View>

              <View style={styles.form}>
                <MotiView from={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'timing', duration: 300 }}>
                  <View style={styles.imagePickerContainer}>
                    <TouchableOpacity onPress={pickImage}>
                      <View style={styles.imagePlaceholder}>
                        {image ? (
                          <Image source={{ uri: image.uri }} style={styles.profileImage} />
                        ) : (
                          <Icon name="user-astronaut" size={40} color="#666" />
                        )}
                      </View>
                      {!image && (
                        <MotiView
                          from={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: 'spring', delay: 300 }}
                          style={styles.plusIconContainer}
                        >
                          <Icon name="plus" size={12} color="#1b1d21" />
                        </MotiView>
                      )}
                    </TouchableOpacity>
                  </View>
                </MotiView>

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

                <MotiView
                  from={{ opacity: 0, translateX: -20 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ type: 'timing', duration: 300, delay: 300 }}
                >
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Confirm Password"
                      placeholderTextColor="#666"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry
                    />
                  </View>
                </MotiView>

                {displayError ? (
                  <MotiView from={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                    <Text style={styles.error}>{displayError}</Text>
                  </MotiView>
                ) : null}
              </View>
            </MotiView>
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Button onPress={handleSignup} disabled={isLoading}>
              {isLoading ? <LoadingDots /> : <Text style={styles.buttonText}>Create account</Text>}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Signup;

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
  imagePickerContainer: {
    alignSelf: 'center',
    marginBottom: 20,
    width: 120,
    height: 120,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#222429',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#282a2f',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  plusIconContainer: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: '#d3e8d6',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
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
