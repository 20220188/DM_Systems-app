import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen'; // Importa la pantalla de carga
import * as Constantes from '../../utils/constantes';
import Input from '../components/Inputs/inputs';
import InputEmail from '../components/Inputs/InputEmail';
import InputMultiline from '../components/Inputs/InputMultiline';
import Buttons from '../components/Botones/Buttons'

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false); // Estado para controlar la carga

  
  const  ip = Constantes.IP;
  const [isContra, setIsContra] = React.useState(true);
  const [alias, setAlias] = React.useState('');
  const [contrasenia, setContrasenia] = React.useState('');


  // Efecto para cargar los detalles del carrito al cargar la pantalla o al enfocarse en ella
  useFocusEffect(
    // La función useFocusEffect ejecuta un efecto cada vez que la pantalla se enfoca.
    React.useCallback(() => {
      validarSesion(); // Llama a la función getDetalleCarrito.
    }, [])
  );
  const validarSesion = async () => {
    try {
      const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/administrador.php?action=getUser`, {
        method: 'GET'
      });

      const data = await response.json();

      if (data.status === 1) {
        setTimeout(() => {
          setLoading(false); // Desactiva la pantalla de carga después de un tiempo simulado
          navigation.navigate('Admins'); // Navega a la pantalla correspondiente después del inicio de sesión
        }, 3000); // Simulación de 3 segundos de carga
        console.log("Se ingresa con la sesión activa")
      } else {
        console.log("No hay sesión activa")
        return
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

      const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/administrador.php?action=logIn`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.status) {
        setContrasenia('')
        setUsuario('')
        navigation.navigate('Dashboard');
      } else {
        console.log(data);
        Alert.alert('Error sesión', data.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
    }
  };

  const irRegistrar = async () => {
    navigation.navigate('Register');
  };

  const login = async () => {
    handlerLogin();
    // Simula una operación asíncrona (por ejemplo, una llamada a API)
    
  }

  useEffect(() => { validarSesion() }, [])
  


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
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Register')}>
              <Icon name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>

            
            <Image
            source={require('../img/logodm.png')} // Reemplaza con la URL de la imagen de perfil
            style={styles.profilePic}
          />

            <Input
              placeHolder='Alias'
              setValor={alias}
              setTextChange={setAlias}
            />
            <Input
              placeHolder='Contraseña'
              setValor={contrasenia}
              setTextChange={setContrasenia}
              contra={isContra} />

            <View style={styles.divider} />
            <Buttons
              textoBoton='Iniciar Sesión'
              accionBoton={login} />
              

            <TouchableOpacity style={styles.boton} onPress={() => handleLogin('VistaVenta')}>
              <Text style={styles.buttonText}>Iniciar sesión (ventas)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.boton} onPress={() => handleLogin('Inventario')}>
              <Text style={styles.buttonText}>Iniciar sesión (inventario) </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('RecuperacionContraseñas')}>
              <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
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
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  profilePic: {
    width: 400,
    height: 200,
    borderRadius: 50,
    marginBottom: 16,
  },
  image: {
    width: 400, // Ajusta el ancho de la imagen
    height: 200, // Ajusta la altura de la imagen
    resizeMode: 'cover',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
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
  label: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: 5,
    color: 'white',
  },
});
