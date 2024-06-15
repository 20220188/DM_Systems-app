// RecuperacionContraseñas.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function RecuperacionContraseñasScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handlePasswordRecovery = () => {
    // Aquí iría la lógica para recuperar la contraseña
    console.log('Recuperar contraseña para:', email);
    // Navegar de regreso a la pantalla de login
    navigation.navigate('CodigoRecuperacion');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperación de Contraseñas</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su correo electrónico"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.boton}
        onPress={handlePasswordRecovery}
      >
        <Text style={styles.buttonText}>Enviar</Text>
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
    color: 'white',
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#D2D9F1',
    borderRadius: 5,
    marginBottom: 20,
    color: '#fff',
  },
  boton: {
    backgroundColor: '#D2D9F1',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#5D41DE',
    fontSize: 16,
  },
});
