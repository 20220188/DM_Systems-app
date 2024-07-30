import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen'; // Importa la pantalla de carga
import * as Constantes from '../../utils/constantes';
import Input from '../components/Inputs/inputs';
import InputEmail from '../components/Inputs/InputEmail';
import InputMultiline from '../components/Inputs/InputMultiline';
import Buttons from '../components/Botones/Buttons';

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false); // Estado para controlar la carga
  const [isContra, setIsContra] = useState(true); // Estado para controlar la visibilidad de la contraseña
  const [alias, setAlias] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  // Efecto para cargar los detalles del carrito al cargar la pantalla o al enfocarse en ella
  useFocusEffect(
    // La función useFocusEffect ejecuta un efecto cada vez que la pantalla se enfoca.
    React.useCallback(() => {
      validarSesion(); // Llama a la función getDetalleCarrito.
    }, [])
  );

  const validarSesion = async () => {
    try {
      const response = await fetch(`${Constantes.IP}/D-M-Systems-PTC/api/services/admin/administrador.php?action=getUser`, {
        method: 'GET'
      });

      const data = await response.json();

      if (data.status === 1) {
        setTimeout(() => {
          setLoading(false); // Desactiva la pantalla de carga después de un tiempo simulado
          navigation.navigate('Admins'); // Navega a la pantalla correspondiente después del inicio de sesión
        }, 3000); // Simulación de 3 segundos de carga
        console.log("Se ingresa con la sesión activa");
      } else {
        console.log("No hay sesión activa");
        return;
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al validar la sesión');
    }
  }

  const handlerLogin = async () => {
    if (!alias || !contrasenia) {
      Alert.alert('Error', 'Por favor ingrese su alias y contraseña');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('alias', alias);
      formData.append('clave', contrasenia);

      const response = await fetch(`${Constantes.IP}/D-M-Systems-PTC/api/services/admin/administrador.php?action=logIn`, {
        method: 'POST',
        body: formData
      });

      let responseText = await response.text();
      console.log('Respuesta del servidor:', responseText);

      // Intenta encontrar el JSON en la respuesta, ignorando cualquier HTML previo
      const jsonStartIndex = responseText.indexOf('{');
      if (jsonStartIndex !== -1) {
        responseText = responseText.substring(jsonStartIndex);
      }

      try {
        const data = JSON.parse(responseText); // Intentamos parsear como JSON

        if (data.status) {
          setContrasenia('');
          setAlias('');
          navigation.navigate('HomeScreen');
        } else {
          console.log(data);
          Alert.alert('Error sesión', data.error || 'Credenciales incorrectas');
        }
      } catch (parseError) {
        console.error('Error al parsear JSON:', parseError);
        Alert.alert('Error', 'Respuesta inesperada del servidor.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
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
        {loading ? ( // Muestra la pantalla de carga si loading es true
          <LoadingScreen />
        ) : (
          <ScrollView contentContainerStyle={styles.container}>
            <Image
              source={require('../img/logodm.png')} // Reemplaza con la URL de la imagen de perfil
              style={styles.profilePic}
            />

            <Input
              placeHolder='Alias'
              setValor={alias}
              setTextChange={setAlias}
              placeholderColor='#FF6347' // Cambia el color del placeholder aquí
            />
            
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Contraseña"
                value={contrasenia}
                onChangeText={setContrasenia}
                secureTextEntry={isContra}
                style={styles.input}
            />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                <Icon
                  name={isContra ? 'eye-slash' : 'eye'}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>


            <View style={styles.divider} />
            <Buttons
              textoBoton='Iniciar Sesión'
              accionBoton={handlerLogin}
            />

            <TouchableOpacity style={styles.boton} onPress={() => handleLogin('VistaVenta')}>
              <Text style={styles.buttonText}>Iniciar sesión (ventas)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.boton} onPress={() => handleLogin('Inventario')}>
              <Text style={styles.buttonText}>Iniciar sesión (inventario) </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('RecuperacionContraseñas')}>
              <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={irRegistrar}>
              <Text style={styles.forgotPasswordText}>Ir a registro</Text>
            </TouchableOpacity>
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

  boton: {
    backgroundColor: '#D2D9F1',
    padding: 10,
    borderRadius: 20,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },

  buttonText: {
    color: '#5D41DE',
    fontSize: 16,
  },

  forgotPasswordText: {
    color: '#D2D9F1',
    fontSize: 16,
    marginTop: 20,
  },
});
