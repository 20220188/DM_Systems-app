// Login.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Register')}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Image />
        <Text style={styles.title}>Login Screen</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.buttonText}>Iniciar Sesion</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttontext} onPress={() => navigation.navigate('RecuperacionContraseñas')}>
          <Text style={styles.buttonText}>Olvidé mi contraseña</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F0147',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F0147',
    paddingTop: 20, // Ajustar según sea necesario
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
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#D2D9F1',
    fontSize: 16,
  },
});
