// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';

//Aqui van los elementos de la pagina
//TouchableOpacity es un boton
//Input es para la escritura de textos

export default function Register({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>¿Ya tienes una cuenta?</Text>
      </TouchableOpacity>
    </View>
  );
}

//Estilos de la pagina
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
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
});
