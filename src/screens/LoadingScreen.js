import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.replace('Register');
    }, 6000);

    return () => clearTimeout(timeoutId); // Clear timeout on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../img/loading.jpg')} style={styles.logo} /> 
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
    backgroundColor: 'white',
  },
  text: {
    color: 'white',
  },
});
