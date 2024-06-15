// Login.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      

      <TouchableOpacity
        
        onPress={() => navigation.navigate('RecuperacionContraseñas')}
      >
        <Text style={styles.buttonText}>Olvidé mi contraseña</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F0147',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color:'white'
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
