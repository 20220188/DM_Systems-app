import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Modal, ScrollView } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Constantes from '../../utils/constantes';
import CustomDrawer from '../components/CustomDrawer';
import LoadingScreen from './LoadingScreen';

export default function PuntosVenta({ navigation }) {
  const ip = Constantes.IP;

  const drawer = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [puntoVenta, setPuntoVenta] = useState('');  // Renombrado para claridad
  const [contrasena, setContrasena] = useState('');
  const [modalPuntoVenta, setModalPuntoVenta] = useState('');  // Estado para el modal
  const [modalContrasena, setModalContrasena] = useState('');  // Estado para el modal
  const [updateData, setUpdateData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
      const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/admin_maestros_punto_de_venta.php?action=readAll`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Datos de puntos de venta:', data);

      if (data.dataset && Array.isArray(data.dataset)) {
        setUsuarios(data.dataset);
      } else {
        console.error('La propiedad dataset no es un array:', data);
        Alert.alert('Error', 'La respuesta del servidor no es válida');
      }
    } catch (error) {
      console.error('Error al obtener los puntos de venta:', error);
      Alert.alert('Error', 'Error al obtener los puntos de venta');
    }
  };

  const agregarPuntoVenta = async () => {
    if (!puntoVenta.trim() || !contrasena.trim()) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('nombrePuntoVenta', puntoVenta);
      formData.append('clavePuntoVenta', contrasena);

      const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/admin_maestros_punto_de_venta.php?action=createRow`, {
        method: 'POST',
        body: formData,
      });

      const textResponse = await response.text();
      console.log('Response text:', textResponse);

      if (response.headers.get('content-type')?.includes('application/json')) {
        const responseData = JSON.parse(textResponse);

        if (responseData.status === 1) {
          setPuntoVenta('');
          setContrasena('');
          Alert.alert('Éxito', 'Punto de venta agregado correctamente');
          obtenerUsuarios();
        } else {
          Alert.alert('Error', responseData.error || 'Error al agregar el punto de venta');
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

    if (!modalPuntoVenta.trim() || !modalContrasena.trim()) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('idPuntoVenta', updateData.id_punto_venta);
      formData.append('nombrePuntoVenta', modalPuntoVenta);
      formData.append('clavePuntoVenta', modalContrasena);

      const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/admin_maestros_punto_de_venta.php?action=updateRow`, {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();
      console.log('Response:', responseData);

      if (responseData.status === 1) {
        Alert.alert('Éxito', 'Punto de venta actualizado correctamente');
        obtenerUsuarios();
        setUpdateData(null);
        setModalVisible(false);
        setModalPuntoVenta('');  // Limpiar campo del modal
        setModalContrasena('');  // Limpiar campo del modal
      } else {
        Alert.alert('Error', responseData.error || 'Error al actualizar el punto de venta');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud de actualización:', error);
      Alert.alert('Error', 'Error al enviar la solicitud de actualización: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const eliminarUsuario = async (id_punto_venta) => {
    Alert.alert(
      'Confirmación de Eliminación',
      '¿Estás seguro de que deseas eliminar este punto de venta?',
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
              formData.append('idPuntoVenta', id_punto_venta);

              console.log("EN ELIMINAR", id_punto_venta);

              const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/admin_maestros_punto_de_venta.php?action=deleteRow`, {
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
                  console.error('Error al eliminar el punto de venta:', responseData.error || 'Error desconocido');
                  Alert.alert('Error', responseData.error || 'Error al eliminar el punto de venta');
                }
              } else {
                console.error('Error al eliminar el punto de venta:', response.status);
                Alert.alert('Error', 'Error al eliminar el punto de venta: ' + response.status);
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
          <Text style={[styles.title, styles.titleMargin]}>Crear Puntos de venta</Text>
          <Icon name="truck" size={50} color="black" style={styles.icon} />

          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={puntoVenta}
            onChangeText={setPuntoVenta}  // Actualizar estado del formulario principal
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={contrasena}
              onChangeText={setContrasena}  // Actualizar estado del formulario principal
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="gray" />
            </TouchableOpacity>
          </View>

          {usuarios.map((puntoVenta) => (
            <View key={puntoVenta.id_punto_venta} style={styles.card}>
              <Text style={styles.cardTitle}>{puntoVenta.punto_venta}</Text>
              <View style={styles.cardButtons}>
                <TouchableOpacity
                  style={[styles.cardButton, styles.editButton]}
                  onPress={() => {
                    setUpdateData(puntoVenta);
                    setModalPuntoVenta(puntoVenta.punto_venta);  // Usar estado del modal
                    setModalContrasena(puntoVenta.contrasena || '');  // Usar estado del modal
                    setModalVisible(true);
                  }}
                >
                  <Text style={styles.cardButtonText}>Actualizar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.cardButton, styles.deleteButton]}
                  onPress={() => eliminarUsuario(puntoVenta.id_punto_venta)}
                >
                  <Text style={styles.cardButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.button1} onPress={agregarPuntoVenta}>
          <Text style={styles.buttonText1}>{'Agregar punto de venta'}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Actualizar Punto de Venta</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={modalPuntoVenta}  // Usar estado del modal
              onChangeText={setModalPuntoVenta}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={modalContrasena}  // Usar estado del modal
                onChangeText={setModalContrasena}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="gray" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Actualizar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {isLoading && <LoadingScreen />}
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
  depentientesContainer: {
    marginLeft: 90,
    marginTop: 15
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
  button1: {
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
  buttonText1: {
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
    position: 'relative',
  },
  eyeButton: {
    position: 'absolute',
    right: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro para el modal
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#251C6A',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginRight: 10, // Espacio entre los botones
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginLeft: 10, // Espacio entre los botones
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
