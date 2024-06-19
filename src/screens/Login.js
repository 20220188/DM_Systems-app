import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoadingScreen from './LoadingScreen'; // Importa la pantalla de carga

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false); // Estado para controlar la carga

  const imageUrl = 'https://drive.google.com/uc?export=view&id=1ZSt3P4ZmTBXGzx0ke0lXX-p6n_Y9EqlF'; // URL de tu imagen en Google Drive

  const handleLogin = (screenName) => {
    setLoading(true); // Activa la pantalla de carga

    // Simula una operación asíncrona (por ejemplo, una llamada a API)
    setTimeout(() => {
      setLoading(false); // Desactiva la pantalla de carga después de un tiempo simulado
      navigation.navigate(screenName); // Navega a la pantalla correspondiente después del inicio de sesión
    }, 3000); // Simulación de 3 segundos de carga
  };

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

            <Image source={{ uri: imageUrl }} style={styles.image} />

            {/* Etiquetas sobre los TextInput */}
            <Text style={styles.label}>Usuario</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese su usuario"
              placeholderTextColor="#aaa"
            />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese su contraseña"
              placeholderTextColor="#aaa"
              secureTextEntry
            />

            <View style={styles.divider} />

            <TouchableOpacity style={styles.boton} onPress={() => handleLogin('HomeScreen')}>
              <Text style={styles.buttonText}>Iniciar sesión (Admin)</Text>
            </TouchableOpacity>

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
