import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '../img/loading.jpg';

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    // Simula una espera de 2 segundos antes de navegar a la página de inicio
    setTimeout(() => {
      navigation.replace('Register');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text> 
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
  logo: {
    width: 200, // Ajusta el tamaño según sea necesario
    height: 200, // Ajusta el tamaño según sea necesario
  },
  text:{
    color:'white'
  }
});
