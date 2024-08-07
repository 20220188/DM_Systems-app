import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, FlatList, Modal, Alert } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomDrawer from '../components/CustomDrawer';
import LoadingScreen from './LoadingScreen';
import * as Constantes from '../../utils/constantes';

export default function PuntosVenta({ navigation }) {
  const ip = Constantes.IP;

  const drawer = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
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
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('nombrePuntoVenta', usuario);
      formData.append('contrasenaPuntoVenta', contrasena);

      const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/admin_maestros_punto_de_venta.php?action=createRow`, {
        method: 'POST',
        body: formData,
      });

      const textResponse = await response.text();
      console.log('Response text:', textResponse);

      if (response.headers.get('content-type')?.includes('application/json')) {
        const responseData = JSON.parse(textResponse);

        if (responseData.status === 1) {
          setUsuario('');
          setContrasena('');
          Alert.alert('Éxito', 'Punto de venta agregado correctamente');
          obtenerUsuarios(); // Actualiza la lista de puntos de venta después de agregar uno nuevo
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

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('idPuntoVenta', updateData.id);
      formData.append('nombrePuntoVenta', usuario);
      formData.append('contrasenaPuntoVenta', contrasena);

      const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/admin_maestros_punto_de_venta.php?action=updateRow`, {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();
      console.log('Response:', responseData);

      if (responseData.status === 1) {
        Alert.alert('Éxito', 'Punto de venta actualizado correctamente');
        obtenerUsuarios(); // Actualiza la lista de puntos de venta después de la actualización
        setUpdateData(null); // Limpia los datos de edición
        // Limpia los campos del formulario después de la actualización
        setUsuario('');
        setContrasena('');
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

  const eliminarUsuario = async (id_puntoVenta) => {
    // Mostrar el diálogo de confirmación
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
            // Continuar con la eliminación si el usuario confirma
            try {
              const formData = new FormData();
              formData.append('idPuntoVenta', id_puntoVenta);

              console.log("EN ELIMINAR", id_puntoVenta);

              const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/admin_maestros_punto_de_venta.php?action=deleteRow`, {
                method: 'POST',
                body: formData
              });

              if (response.ok) {
                const responseData = await response.json();
                console.log('Respuesta de eliminación:', responseData);

                if (responseData.status === 1) {
                  Alert.alert('Éxito', 'Registro eliminado correctamente');
                  obtenerUsuarios(); // Actualizar la lista de puntos de venta
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
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.menuButton} onPress={() => drawer.current.openDrawer()}>
            <Icon name="bars" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.title}>Puntos de venta</Text>
          <Icon name="truck" size={50} color="black" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Usuario" />
          <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry />

          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Usuario</Text>
            <Text style={styles.tableHeaderText}>Contraseña</Text>
          </View>

          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <Text style={styles.tableText}>{item.usuario}</Text>
                <Text style={styles.tableText}>{item.contrasena}</Text>
              </View>
            )}
            style={styles.table}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.buttonText}>Borrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {isLoading && (
        <Modal visible={isLoading} transparent={true}>
          <LoadingScreen navigation={navigation} />
        </Modal>
      )}
    </DrawerLayout>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#D2D9F1',
  },
  container: {
    marginTop: 30,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#D2D9F1',
    padding: 20,
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
  },
  icon: {
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  table: {
    width: '90%',
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#D2D9F1',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeaderText: {
    width: '50%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableText: {
    width: '50%',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#251C6A',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
