import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import LoadingScreen from './LoadingScreen'; // Importa la pantalla de carga
import * as Constantes from '../../utils/constantes';
import Input from '../components/Inputs/inputs';
import InputEmail from '../components/Inputs/InputEmail';
import InputMultiline from '../components/Inputs/InputMultiline';
import Buttons from '../components/Botones/Buttons';

export default function Register({ navigation }) {

  const ip = Constantes.IP;

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [dui, setDui] = useState('');
  const [telefono, setTelefono] = useState('');
  const [alias, setAlias] = useState('');
  const [clave, setClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('')



  const [loading, setLoading] = useState(false); // Estado para controlar la carga

  const imageUrl = 'https://drive.google.com/uc?export=view&id=1ZSt3P4ZmTBXGzx0ke0lXX-p6n_Y9EqlF'; // URL de tu imagen en Google Drive

  const handleLogout = async () => {
    /*
            try {
                const response = await fetch(${ip}/coffeeshop/api/services/public/cliente.php?action=logOut, {
                    method: 'GET'
                });
    
                const data = await response.json();
    
                if (data.status) {
                    navigation.navigate('Sesion');
                } else {
                    console.log(data);
                    // Alert the user about the error
                    Alert.alert('Error', data.error);
                }
            } catch (error) {
                console.error(error, "Error desde Catch");
                Alert.alert('Error', 'Ocurrió un error al iniciar sesión con bryancito');
            } */
    navigation.navigate('Login');
  };

  const handleCreate = async () => {
    console.log('Iniciando el proceso de creación de usuario');
  
    const fechaMinima = new Date();
    fechaMinima.setFullYear(fechaMinima.getFullYear() - 18);
  
    if (!nombre.trim() || !correo.trim() || !dui.trim() || !telefono.trim() || !alias.trim() || !clave.trim() || !confirmarClave.trim()) {
      Alert.alert("Debe llenar todos los campos");
      console.log('Faltan campos por llenar');
      return;
    }
    console.log('Todos los campos son válidos');
  
    if (clave !== confirmarClave) {
      Alert.alert('Las contraseñas no coinciden');
      setAlertVisible(true);
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('nombreAdministrador', nombre);
      formData.append('correoAdministrador', correo);
      formData.append('duiUsuario', dui);
      formData.append('telefonoUsuario', telefono);
      formData.append('aliasAdministrador', alias);
      formData.append('claveAdministrador', clave);
      formData.append('confirmarClave', confirmarClave);
  
      console.log('Datos del formulario:', formData);
  
      const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/administrador.php?action=signUpMovil`, {
        method: 'POST',
        body: formData
      });
  
      const responseText = await response.text();
      console.log('Respuesta del servidor:', responseText);
  
      if (response.ok) {
        Alert.alert('Datos Guardados correctamente');
        setTimeout(() => {
          setLoading(false);
          navigation.navigate('Login');
        }, 3000);
      } else {
        Alert.alert('Error en la respuesta del servidor', responseText);
      }
    } catch (error) {
      Alert.alert('Ocurrió un error al intentar crear el usuario');
      console.error('Error en la solicitud:', error);
    }
  };
  

  const cerrarSesion = async () => {
    try {
      const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/administrador.php?action=logOut`, {
        method: 'GET'
      });

      const data = await response.json();

      if (data.status) {
        console.log("Sesión Finalizada");
        Alert.alert('Sesión cerrada', 'Has cerrado sesión exitosamente', [
          {
            text: "OK",
            onPress: () => navigation.navigate('Login') // Navegar a la pantalla de inicio de sesión
          }
        ]);
      } else {
        console.log('No se pudo eliminar la sesión');
      }
    } catch (error) {
      console.error('Error desde Catch', error);
      Alert.alert('Error', 'Ocurrió un error al cerrar sesión');
    }
  };

  return (
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
            placeHolder='Nombre Cliente'
            setValor={nombre}
            setTextChange={setNombre}
          />

          <InputEmail
            placeHolder='Email Cliente'
            setValor={correo}
            setTextChange={setCorreo} />

          <Input
            placeHolder='Dui Cliente'
            setValor={dui}
            setTextChange={setDui}
          />

          <Input
            placeHolder='Telefono Cliente'
            setValor={telefono}
            setTextChange={setTelefono}
          />

          <Input
            placeHolder='Usuario Cliente'
            setValor={alias}
            setTextChange={setAlias}
          />

          <Input
            placeHolder='Clave'
            contra={true}
            setValor={clave}
            setTextChange={setClave} />

          <Input
            placeHolder='Confirmar Clave'
            contra={true}
            setValor={confirmarClave}
            setTextChange={setConfirmarClave} />

          <View style={styles.divider} />

          <Buttons
          textoBoton='Registrar Usuario'
          accionBoton={handleCreate}
                />
                <Buttons
          textoBoton='Cerrar Sesion'
          accionBoton={cerrarSesion}
                />
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}

// Estilos de la página
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F0147',
    padding: 20,
    paddingTop: 50, // Añade un padding-top para espacio encima del logo
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
  profilePic: {
    width: 400,
    height: 200,
    borderRadius: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
    textAlign: 'center', // Añade textAlign para centrar el texto
  },
  image: {
    width: 400, // Ajusta el tamaño adecuadamente
    height: 200, // Ajusta el tamaño adecuadamente
    resizeMode: 'cover',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
    zIndex: 1, // Añade zIndex para asegurar que estén encima del logo
    elevation: 2, // Añade elevación para sombra en Android
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#D2D9F1',
    marginVertical: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 5,
    color: 'white',
  },
});
