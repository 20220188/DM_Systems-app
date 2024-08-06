import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import * as Constantes from '../../utils/constantes';
import { DrawerLayout } from 'react-native-gesture-handler';
import CustomDrawer from '../components/CustomDrawer';
import LoadingScreen from './LoadingScreen';
import { Picker } from '@react-native-picker/picker'; // Importa el Picker
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa FontAwesome para el ícono

export default function Admin({ navigation }) {
  const drawer = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [dui, setDui] = useState('');
  const [telefono, setTelefono] = useState('');
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');
  const [contrasenasCoinciden, setContrasenasCoinciden] = useState(true);
  const [nivelUsuario, setNivelUsuario] = useState('');
  const [niveles, setNiveles] = useState([]);

  const ip = Constantes.IP;

  useEffect(() => {
    obtenerNiveles();
  }, []);

  useEffect(() => {
    setContrasenasCoinciden(clave === confirmarClave);
  }, [clave, confirmarClave]);

  const obtenerNiveles = async () => {
    try {
      const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/admin_usuarios.php?action=readAllNiveles`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Datos de niveles:', data);
  
      if (data.dataset && Array.isArray(data.dataset)) {
        setNiveles(data.dataset);
      } else {
        console.error('La propiedad dataset no es un array:', data);
        Alert.alert('Error', 'La respuesta del servidor no es válida');
      }
    } catch (error) {
      console.error('Error al obtener los niveles de usuario:', error);
      Alert.alert('Error', 'Error al obtener los niveles de usuario');
    }
  };

  const agregarAdministrador = async () => {
    if (!contrasenasCoinciden) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
  
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('nombreUsuario', nombre);
      formData.append('DUIUsuario', dui);
      formData.append('correoUsuario', email);
      formData.append('Usuario', usuario);
      formData.append('telefonoUsuario', telefono);
      formData.append('Clave', clave);
      formData.append('confirmarClave', confirmarClave);
      formData.append('idNivelUsuario', nivelUsuario);

      const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/admin_usuarios.php?action=createRow`, {
        method: 'POST',
        body: formData
      });

      const responseData = await response.json();
      console.log('Response:', responseData);

      if (responseData.status === 1) {
        setNombre('');
        setDui('');
        setEmail('');
        setUsuario('');
        setTelefono('');
        setClave('');
        setConfirmarClave('');
        setNivelUsuario('');

        Alert.alert('Éxito', 'Usuario creado correctamente');
      } else {
        Alert.alert('Error', responseData.error || 'Error al agregar el administrador');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      Alert.alert('Error', 'Error al enviar la solicitud: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace('Login');
    }, 3000);
  };

  return (
    <DrawerLayout
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      drawerType="slide"
      drawerBackgroundColor="#7393FC"
      renderNavigationView={() => <CustomDrawer navigation={navigation} onLogout={handleLogout} />}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.menuButton} onPress={() => drawer.current.openDrawer()}>
          <Icon name="bars" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Crear Usuarios</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="DUI"
          value={dui}
          onChangeText={setDui}
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={telefono}
          onChangeText={setTelefono}
        />
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={usuario}
          onChangeText={setUsuario}
        />
        <TextInput
          style={styles.input}
          placeholder="Clave"
          value={clave}
          onChangeText={setClave}
          secureTextEntry
        />
        <TextInput
          style={[styles.input, !contrasenasCoinciden && styles.inputError]}
          placeholder="Confirmar Clave"
          value={confirmarClave}
          onChangeText={setConfirmarClave}
          secureTextEntry
        />
        {!contrasenasCoinciden && (
          <Text style={styles.errorText}>Las contraseñas no coinciden</Text>
        )}
        <Picker
          selectedValue={nivelUsuario}
          style={styles.picker}
          onValueChange={(itemValue) => setNivelUsuario(itemValue)}
        >
          <Picker.Item label="Selecciona un nivel" value="" />
          {niveles.map((nivel) => (
            <Picker.Item key={nivel.id_nivel_usuario} label={nivel.tipo_usuario} value={nivel.id_nivel_usuario} />
          ))}
        </Picker>
        <TouchableOpacity style={styles.button} onPress={agregarAdministrador}>
          <Text style={styles.buttonText}>Agregar Administrador</Text>
        </TouchableOpacity>
      </View>

      {isLoading && (
        <Modal visible={isLoading} transparent={true}>
          <LoadingScreen />
        </Modal>
      )}
    </DrawerLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D2D9F1',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#251C6A',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  picker: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  menuButton: {
    position: 'absolute',
    top: 45,
    left: 10,
    zIndex: 1,
  },
});
