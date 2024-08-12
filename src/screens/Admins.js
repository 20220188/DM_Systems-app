import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Modal, ScrollView, Button } from 'react-native';
import * as Constantes from '../../utils/constantes';
import { DrawerLayout } from 'react-native-gesture-handler';
import CustomDrawer from '../components/CustomDrawer';
import LoadingScreen from './LoadingScreen';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';


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
  const [usuarios, setUsuarios] = useState([]);
  const [showClave, setShowClave] = useState(false);
  const [showConfirmarClave, setShowConfirmarClave] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [updateData, setUpdateData] = useState({
    idUsuario: '',
    nombre: '',
    telefono: '',
    usuario: '',
    email: '',
  });


  const ip = Constantes.IP;

  useEffect(() => {
    obtenerNiveles();
    obtenerUsuarios();
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

  const obtenerUsuarios = async () => {
    try {
      const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/admin_usuarios.php?action=readAll`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Datos de usuarios:', data);

      if (data.dataset && Array.isArray(data.dataset)) {
        setUsuarios(data.dataset);
      } else {
        console.error('La propiedad dataset no es un array:', data);
        Alert.alert('Error', 'La respuesta del servidor no es válida');
      }
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      Alert.alert('Error', 'Error al obtener los usuarios');
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
        obtenerUsuarios(); // Actualiza la lista de usuarios después de agregar uno nuevo
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

  const handleUpdate = (usuario) => {
    console.log('Usuario seleccionado para actualizar:', usuario);
    setUpdateData({
      idUsuario: usuario.id_usuario,
      nombre: usuario.nombre,
      telefono: usuario.telefono,
      usuario: usuario.usuario,
      email: usuario.correo
    });
    setModalVisible(true);
  };

  const handleUpdateData = async () => {
    if (selectedUser) {
      try {
        const formData = new FormData();
        formData.append('idUsuario', updateData.idUsuario);
        formData.append('nombreUsuario', updateData.nombre);
        formData.append('telefonoUsuario', updateData.telefono);
        formData.append('Usuario', updateData.usuario);
        formData.append('correoUsuario', updateData.email);

        const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/admin_usuarios.php?action=updateRow`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          Alert.alert('Éxito', 'Usuario actualizado correctamente');
          obtenerUsuarios();
        } else {
          const errorText = await response.text();
          Alert.alert('Error', 'Error al actualizar el usuario: ' + errorText);
        }
      } catch (error) {
        Alert.alert('Error', 'Error al realizar la solicitud de actualización: ' + error.message);
      } finally {
        setModalVisible(false);
        setSelectedUser(null);
      }
    }
  };

  const eliminarUsuario = async (idUsuario) => {
    // Mostrar el diálogo de confirmación
    Alert.alert(
      'Confirmación de Eliminación',
      '¿Estás seguro de que deseas eliminar este usuario?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancelado'),
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: async () => {
            // Continuar con la eliminación si el usuario confirma
            try {
              const formData = new FormData();
              formData.append('idUsuario', idUsuario);

              console.log("EN ELIMINAR", idUsuario);

              const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/admin_usuarios.php?action=deleteRow`, {
                method: 'POST',
                body: formData
              });

              if (response.ok) {
                const responseData = await response.json();
                console.log('Respuesta de eliminación:', responseData);

                if (responseData.status === 1) {
                  Alert.alert('Éxito', 'Registro eliminado correctamente');
                  obtenerUsuarios(); // Actualizar la lista de usuarios
                } else {
                  console.error('Error al eliminar el administrador:', responseData.error || 'Error desconocido');
                  Alert.alert('Error', responseData.error || 'Error al eliminar el administrador');
                }
              } else {
                console.error('Error al eliminar el administrador:', response.status);
                Alert.alert('Error', 'Error al eliminar el administrador: ' + response.status);
              }
            } catch (error) {
              console.error('Error al realizar la solicitud de eliminación:', error);
              Alert.alert('Error', 'Error al realizar la solicitud de eliminación: ' + error.message);
            }
          },
        },
      ],
      { cancelable: false }
    );
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

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={[styles.title, styles.titleMargin]}>Crear Usuarios</Text>
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
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Clave"
              value={clave}
              onChangeText={setClave}
              secureTextEntry={!showClave}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowClave(!showClave)}
            >
              <Icon name={showClave ? 'eye' : 'eye-slash'} size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, !contrasenasCoinciden && styles.inputError]}
              placeholder="Confirmar Clave"
              value={confirmarClave}
              onChangeText={setConfirmarClave}
              secureTextEntry={!showConfirmarClave}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirmarClave(!showConfirmarClave)}
            >
              <Icon name={showConfirmarClave ? 'eye' : 'eye-slash'} size={20} color="black" />
            </TouchableOpacity>
          </View>
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

          {usuarios.map((usuario) => (
            <View key={usuario.id_usuario} style={styles.card}>
              <Text style={styles.cardTitle}>{usuario.nombre}</Text>
              <Text style={styles.cardText}>Correo: {usuario.correo}</Text>
              <Text style={styles.cardText}>DUI: {usuario.DUI}</Text>
              <Text style={styles.cardText}>Teléfono: {usuario.telefono}</Text>
              <Text style={styles.cardText}>Usuario: {usuario.usuario}</Text>
              <Text style={styles.cardText}>Nivel: {usuario.tipo_usuario}</Text>
              <View style={styles.cardButtons}>
                <TouchableOpacity
                  style={[styles.cardButton, styles.editButton]}
                  onPress={handleUpdate}
                >
                  <Text style={styles.cardButtonText}>Actualizar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.cardButton, styles.deleteButton]}
                  onPress={() => eliminarUsuario(usuario.id_usuario)}
                >
                  <Text style={styles.cardButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={agregarAdministrador}>
          <Text style={styles.buttonText}>Agregar Usuario</Text>
        </TouchableOpacity>

        <DrawerLayout
          ref={drawer}
          drawerWidth={300}
          drawerPosition="left"
          drawerType="slide"
          drawerBackgroundColor="#7393FC"
          renderNavigationView={() => <CustomDrawer navigation={navigation} onLogout={handleLogout} />}
        >
          <View style={styles.container}>
            {usuarios.map((usuario) => (
              <View key={usuario.id_usuario} style={styles.card}>
                <Text style={styles.cardTitle}>{usuario.nombre}</Text>
                <Text style={styles.cardText}>Correo: {usuario.correo}</Text>
                <Text style={styles.cardText}>DUI: {usuario.DUI}</Text>
                <Text style={styles.cardText}>Teléfono: {usuario.telefono}</Text>
                <Text style={styles.cardText}>Usuario: {usuario.usuario}</Text>
                <Text style={styles.cardText}>Nivel: {usuario.tipo_usuario}</Text>
                <View style={styles.cardButtons}>
                  <TouchableOpacity
                    style={[styles.cardButton, styles.editButton]}
                    onPress={() => handleUpdate(usuario)}
                  >
                    <Text style={styles.cardButtonText}>Actualizar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.cardButton, styles.deleteButton]}
                    onPress={() => eliminarUsuario(usuario.id_usuario)}
                  >
                    <Text style={styles.cardButtonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={agregarAdministrador}>
            <Text style={styles.buttonText}>Agregar Usuario</Text>
          </TouchableOpacity>


<Modal
  visible={modalVisible}
  transparent={true}
  animationType="slide"
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={updateData.nombre}
        onChangeText={(text) => setUpdateData({ ...updateData, nombre: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={updateData.usuario}
        onChangeText={(text) => setUpdateData({ ...updateData, usuario: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={updateData.email}
        onChangeText={(text) => setUpdateData({ ...updateData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={updateData.telefono}
        onChangeText={(text) => setUpdateData({ ...updateData, telefono: text })}
      />
      <View style={styles.modalButtons}>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateData}>
          <Text style={styles.updateButtonText}>Actualizar Datos</Text>
        </TouchableOpacity>
        <Button title="Cancelar" onPress={() => setModalVisible(false)} />
      </View>
    </View>
  </View>
</Modal>

          {isLoading && (
            <Modal visible={isLoading} transparent={true}>
              <LoadingScreen />
            </Modal>
          )}
        </DrawerLayout>

      </View>
    </DrawerLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2D9F1',
    paddingBottom: 80, // Para evitar que el botón se sobreponga al contenido
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  titleMargin: {
    marginTop: 50, // Ajusta este valor según tus necesidades
    marginBottom: 20,
  },


  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },


  input: {
    width: '100%',
    padding: 12,
    marginVertical: 5,
    backgroundColor: '#ffffff',
    borderRadius: 20,
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
    padding: 19,
    borderRadius: 25,
    width: '90%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  picker: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    borderColor: '#ddd',
    borderWidth: 3,
  },
  menuButton: {
    position: 'absolute',
    top: 45,
    left: 10,
    zIndex: 1,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cardButton: {
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  cardButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  eyeButton: {
    position: 'absolute',
    right: 14,
  },
});
