import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Modal, ScrollView } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Constantes from '../../utils/constantes';
import CustomDrawer from '../components/CustomDrawer';
import LoadingScreen from './LoadingScreen';

export default function Dependientes({ navigation }) {

  const ip = Constantes.IP;

  const drawer = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState('');
  const [codigo, setCodigo] = useState('');
  const [updateData, setUpdateData] = useState(null); // Agregado para manejar la edición

  // Llama a obtenerUsuarios cuando el componente se monte
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace('Login');
    }, 3000);
  };

  const obtenerUsuarios = async () => {
    try {
      const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/admin_maestro_dependientes.php?action=readAll`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Datos de dependientes:', data);

      if (data.dataset && Array.isArray(data.dataset)) {
        setUsuarios(data.dataset);
      } else {
        console.error('La propiedad dataset no es un array:', data);
        Alert.alert('Error', 'La respuesta del servidor no es válida');
      }
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      Alert.alert('Error', 'Error al obtener los dependientes');
    }
  };

  const agregarDependiente = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('nombreDependiente', usuario);
      formData.append('codigoDependiente', codigo);

      const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/admin_maestro_dependientes.php?action=createRow`, {
        method: 'POST',
        body: formData,
      });

      const textResponse = await response.text();
      console.log('Response text:', textResponse);

      if (response.headers.get('content-type')?.includes('application/json')) {
        const responseData = JSON.parse(textResponse);

        if (responseData.status === 1) {
          setUsuario('');
          setCodigo('');
          Alert.alert('Éxito', 'Usuario dependiente correctamente');
          obtenerUsuarios(); // Actualiza la lista de usuarios después de agregar uno nuevo
        } else {
          Alert.alert('Error', responseData.error || 'Error al agregar el dependiente');
        }
      } else {
        console.error('Unexpected response type:', textResponse);
        Alert.alert('Error', 'Unexpected response type from server');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      Alert.alert('Error', 'Error al enviar la solicitud: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!updateData) {
      Alert.alert('Error', 'No se encontraron datos para actualizar.');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('idDependiente', updateData.id);
      formData.append('nombreDependiente', usuario);
      formData.append('codigoDependiente', codigo);

      const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/admin_maestro_dependientes.php?action=updateRow`, {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();
      console.log('Response:', responseData);

      if (responseData.status === 1) {
        Alert.alert('Éxito', 'Usuario actualizado correctamente');
        obtenerUsuarios(); // Actualiza la lista de usuarios después de la actualización
        setUpdateData(null); // Limpia los datos de edición
        // Limpia los campos del formulario después de la actualización
        setUsuario('');
        setCodigo('');
      } else {
        Alert.alert('Error', responseData.error || 'Error al actualizar el usuario');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud de actualización:', error);
      Alert.alert('Error', 'Error al enviar la solicitud de actualización: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const eliminarUsuario = async (id_dependiente) => {
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
              formData.append('idDependiente', id_dependiente);

              console.log("EN ELIMINAR", id_dependiente);

              const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/admin_maestro_dependientes.php?action=deleteRow`, {
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
          
        <Text style={[styles.title, styles.titleMargin]}>Crear Dependientes</Text>
          <Icon name="user-plus" size={50} color="black" style={styles.icon} />

          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={usuario}
            onChangeText={setUsuario}
          />

          <TextInput
            style={styles.input}
            placeholder="Código"
            value={codigo}
            onChangeText={(text) => setCodigo(text.replace(/[^0-9]/g, ''))} // Only allow numbers
            keyboardType="numeric" // Show numeric keyboard
          />
          {usuarios.map((usuario) => (
            <View key={usuario.id_dependiente} style={styles.card}>
              <Text style={styles.cardTitle}>{usuario.nombre_dependiente}</Text>
              <Text style={styles.cardText}>{usuario.codigo}</Text>
              <View style={styles.cardButtons}>
                <TouchableOpacity
                  style={[styles.cardButton, styles.editButton]}
                  onPress={() => {
                    setUpdateData(usuario); // Set the data for updating
                    setUsuario(usuario.nombre_dependiente);
                    setCodigo(usuario.codigo);
                  }}
                >
                  <Text style={styles.cardButtonText}>Actualizar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.cardButton, styles.deleteButton]}
                  onPress={() => eliminarUsuario(usuario.id_dependiente)}
                >
                  <Text style={styles.cardButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={updateData ? handleUpdate : agregarDependiente}>
          <Text style={styles.buttonText}>{updateData ? 'Actualizar Dependiente' : 'Agregar Dependiente'}</Text>
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
  depentientesContainer:{
    marginLeft:90,
    marginTop:15
  },
  icon: {
    marginLeft:10
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
