import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    // Simula una espera de 2 segundos antes de navegar a la página de inicio
    setTimeout(() => {
      navigation.replace('Register');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Loading....</Text>
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
});
