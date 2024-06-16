// CambiarContraseñas.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function RecuperacionContraseñasScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handlePasswordRecovery = () => {
    // Aquí iría la lógica para recuperar la contraseña
    console.log('Recuperar contraseña para:', email);
    // Navegar de regreso a la pantalla de login
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
              <Icon name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <Image source={require('../img/logodm.png')} style={styles.logo} /> 
            <Text style={styles.title}>Contraseña nueva</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese su contraseña nueva"
              placeholderTextColor="#aaa"
              secureTextEntry
              autoCapitalize="none"
            />
            <Text style={styles.title}>Confirmar contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirme su contraseña"
              placeholderTextColor="#aaa"
              secureTextEntry
              autoCapitalize="none"
            />
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.boton}
              onPress={handlePasswordRecovery}
            >
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
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
    flex: 1,
    backgroundColor: '#0F0147',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 15,
    marginBottom: 20,
    color: 'white',
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  input: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderWidth: 1,
    borderColor: '#D2D9F1',
    borderRadius: 50,
    marginBottom: 20,
    color: '#000',
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
    borderRadius: 50,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#5D41DE',
    fontSize: 16,
  },
});
