import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import LoadingScreen from './LoadingScreen'; // Importa la pantalla de carga

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar la carga

  const imageUrl = 'https://drive.google.com/uc?export=view&id=1ZSt3P4ZmTBXGzx0ke0lXX-p6n_Y9EqlF'; // URL de tu imagen en Google Drive

  const handleRegister = () => {
    setLoading(true); // Activa la pantalla de carga

    // Simula una operación asíncrona (por ejemplo, una llamada a API)
    setTimeout(() => {
      setLoading(false); // Desactiva la pantalla de carga después de un tiempo simulado
      navigation.navigate('Login'); // Navega a la pantalla de login después del registro
    }, 3000); // Simulación de 3 segundos de carga
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
          <Image source={{ uri: imageUrl }} style={styles.image} />
          
          {/* Etiquetas sobre los TextInput */}
          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su correo"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su nombre"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su usuario"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su contraseña"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.label}>Confirmar contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirme su contraseña"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <View style={styles.divider} />

          <TouchableOpacity style={styles.boton} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registro</Text>
          </TouchableOpacity>
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
