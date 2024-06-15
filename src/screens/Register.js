// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';

export default function Register({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>¿Ya tienes una cuenta?</Text>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Inicia Sesión</Text>
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
  boton:{
    backgroundColor: '#D2D9F1',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    color: '#5D41DE'
  },
  buttonText: {
    color: '#5D41DE',
    fontSize: 16,
  },
});
