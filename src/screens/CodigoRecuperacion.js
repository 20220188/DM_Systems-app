// RecuperacionContraseñas.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function RecuperacionContraseñasScreen({ navigation }) {
  const imageUrl = 'https://drive.google.com/uc?export=view&id=1ZSt3P4ZmTBXGzx0ke0lXX-p6n_Y9EqlF'; // Reemplaza YOUR_FILE_ID con el ID de tu archivo en Google Drive
  const [code, setCode] = useState('');

  const handlePasswordRecovery = () => {
    // Aquí iría la lógica para verificar el código y proceder con el cambio de contraseña
    console.log('Verificar código:', code);
    // Navegar a la pantalla para cambiar la contraseña
    navigation.navigate('CambiarContraseñas');
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
            <Image source={{ uri: imageUrl }} style={styles.image} /> 
            <Text style={styles.title}>Código de recuperación</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese código de recuperación"
              placeholderTextColor="#aaa"
              value={code}
              onChangeText={setCode}
              keyboardType="numeric"
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
  image: {
    width: 400, // Aumenta el ancho de la imagen
    height: 200, // Aumenta la altura de la imagen
    resizeMode: 'cover',
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
