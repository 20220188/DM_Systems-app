import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';
import * as Constantes from '../../utils/constantes';
import Input from '../components/Inputs/inputs';
import Buttons from '../components/Botones/Buttons';

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [isContra, setIsContra] = useState(true);
  const [alias, setAlias] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [userLevel, setUserLevel] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      validarSesion();
    }, [])
  );

  const validarSesion = async () => {
    try {
      const response = await fetch(
        `${Constantes.IP}/D-M-Systems-PTC/api/services/admin/administrador.php?action=getUser`,
        {
          method: 'GET',
        }
      );

      const data = await response.json();

      if (data.status === 1) {
        setUserLevel(data.user_level);
        setTimeout(() => {
          setLoading(false);
          navigation.navigate(getScreenByUserLevel(data.user_level));
        }, 3000);
        console.log('Session active');
      } else {
        console.log('No active session');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while validating the session');
    }
  };

  // Function to determine the target screen based on user level
const getScreenByUserLevel = (userLevel) => {
  switch (userLevel) {
    case '1':
      return 'HomeScreen'; // Replace with your actual screen name for admin
    case '2':
      return 'Inventario'; // Replace with your actual screen name for manager
    case '3':
      return 'Venta'; // Replace with your actual screen name for regular user
    default:
      console.error('Unknown user level:', userLevel);
      return null; // Or navigate to a default screen
  }
};

const handlerLogin = async () => {
  if (!alias || !contrasenia) {
    Alert.alert('Error', 'Alias o contraseña incorrectos.');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('alias', alias);
    formData.append('clave', contrasenia);

    const response = await fetch(
      `${Constantes.IP}/D-M-Systems-PTC/api/services/admin/administrador.php?action=logInApp`,
      {
        method: 'POST',
        body: formData,
      }
    );

    let responseText = await response.text();
    console.log('Server response:', responseText);

    const jsonStartIndex = responseText.indexOf('{');
    if (jsonStartIndex !== -1) {
      responseText = responseText.substring(jsonStartIndex);
    }

    try {
      const data = JSON.parse(responseText);

      if (data.status) {
        if (data.user_level !== undefined) {
          setUserLevel(data.user_level);
          console.log('User Level:', data.user_level);

          setContrasenia('');
          setAlias('');

          // Determine the target screen
          const targetScreen = getScreenByUserLevel(data.user_level);
          console.log('Navigating to screen:', targetScreen); // Debugging log
          if (targetScreen) {
            navigation.navigate(targetScreen);
          } else {
            console.error('Invalid user level, unable to determine screen.');
            Alert.alert('Error', 'Invalid user level, unable to determine screen.');
          }
        } else {
          console.error('User level not found in response.');
          Alert.alert('Error', 'User level not found in response.');
        }
      } else {
        console.log(data);
        Alert.alert('Login Error', data.error || 'Invalid credentials');
      }
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      Alert.alert('Error', 'Unexpected server response.');
    }
  } catch (error) {
    console.error('Request error:', error);
    Alert.alert('Error', 'An error occurred while logging in');
  }
};

  
  

  const irRegistrar = () => {
    navigation.navigate('Register');
  };

  const togglePasswordVisibility = () => {
    setIsContra(!isContra);
  };

  useEffect(() => {
    validarSesion();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {loading ? (
          <LoadingScreen />
        ) : (
          <ScrollView contentContainerStyle={styles.container}>
            <Image source={require('../img/logodm.png')} style={styles.profilePic} />

            <Input placeHolder="Alias" setValor={alias} setTextChange={setAlias} />

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Password"
                value={contrasenia}
                onChangeText={setContrasenia}
                secureTextEntry={isContra}
                style={styles.input}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                <Icon name={isContra ? 'eye-slash' : 'eye'} size={20} color="gray" />
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />
            <Buttons textoBoton="Iniciar sesión" accionBoton={handlerLogin} />                                          
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F0147',
  },

  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F0147',
    paddingTop: 20,
  },

  profilePic: {
    width: 400,
    height: 200,
    borderRadius: 50,
    marginBottom: 16,
  },

  inputContainer: {
    width: '90%',
    marginBottom: 10,
  },

  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },

  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 0,
    height: '100%',
    justifyContent: 'center',
  },

  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#D2D9F1',
    marginVertical: 20,
  },

  forgotPasswordText: {
    color: '#D2D9F1',
    fontSize: 16,
    marginTop: 20,
  },
});
