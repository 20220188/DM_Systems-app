import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function RecuperacionContraseñasScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handlePasswordRecovery = () => {
    navigation.navigate('CodigoRecuperacion');
  };



  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Image source={require('../img/logodm.png')} style={styles.logo} /> 
        <Text style={styles.title}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su correo electrónico"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
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
   // backgroundColor: 'white', // Comenta o elimina esto si no es necesario
  },
  title: {
    fontSize: 15,
    marginBottom: 20,
    color: 'white',
    marginLeft: -170,
  },
  input: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderWidth: 1,
    borderColor: '#D2D9F1',
    borderRadius: 50,
    marginBottom: 20,
    color: '#fff',
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
