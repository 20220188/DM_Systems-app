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
  const [updateData, setUpdateData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUsuario, setModalUsuario] = useState('');
  const [modalCodigo, setModalCodigo] = useState('');

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
          Alert.alert('Éxito', 'Usuario dependiente agregado correctamente');
          obtenerUsuarios();
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
      formData.append('idDependiente', updateData.id_dependiente);
      formData.append('nombreDependiente', modalUsuario);
      formData.append('codigoDependiente', modalCodigo);

      const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/admin_maestro_dependientes.php?action=updateRow`, {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();
      console.log('Response:', responseData);

      if (responseData.status === 1) {
        Alert.alert('Éxito', 'Usuario actualizado correctamente');
        obtenerUsuarios();
        setUpdateData(null);
        setModalVisible(false);
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
                  obtenerUsuarios();
                } else {
                  console.error('Error al eliminar el dependiente:', responseData.error || 'Error desconocido');
                  Alert.alert('Error', responseData.error || 'Error al eliminar el dependiente');
                }
              } else {
                console.error('Error al eliminar el dependiente:', response.status);
                Alert.alert('Error', 'Error al eliminar el dependiente: ' + response.status);
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
            onChangeText={(text) => setCodigo(text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
          />
          
          {usuarios.map((usuario) => (
            <View key={usuario.id_dependiente} style={styles.card}>
              <Text style={styles.cardTitle}>{usuario.nombre_dependiente}</Text>
              <Text style={styles.cardText}>{usuario.codigo}</Text>
              <View style={styles.cardButtons}>
                <TouchableOpacity
                  style={[styles.cardButton, styles.editButton]}
                  onPress={() => {
                    setUpdateData(usuario);
                    setModalUsuario(usuario.nombre_dependiente);
                    setModalCodigo(usuario.codigo);
                    setModalVisible(true);
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

        <TouchableOpacity style={styles.button} onPress={agregarDependiente}>
          <Text style={styles.buttonText}>Agregar Dependiente</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Actualizar Dependiente</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Nombre"
                value={modalUsuario}
                onChangeText={setModalUsuario}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Código"
                value={modalCodigo}
                onChangeText={(text) => setModalCodigo(text.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.buttonUpdate]}
                  onPress={handleUpdate}
                >
                  <Text style={styles.textStyle}>Actualizar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.buttonCancel]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    paddingBottom: 80,
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
    marginTop: 50,
    marginBottom: 20,
  },
  icon: {
    marginLeft: 10
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '45%',
  },
  buttonUpdate: {
    backgroundColor: "#2196F3",
  },
  buttonCancel: {
    backgroundColor: "#F44336",
  }
});
