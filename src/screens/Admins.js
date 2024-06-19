import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, FlatList, Modal } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomDrawer from '../components/CustomDrawer';
import LoadingScreen from './LoadingScreen';

export default function Admin({ navigation }) {
  const drawer = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const data = [
    { id: '1', usuario: 'texto', contrasena: 'texto' },
    { id: '2', usuario: 'texto', contrasena: 'texto' },
    { id: '3', usuario: 'texto', contrasena: 'texto' },
    { id: '4', usuario: 'texto', contrasena: 'texto' },
    { id: '5', usuario: 'texto', contrasena: 'texto' },
    { id: '6', usuario: 'texto', contrasena: 'texto' },
    { id: '7', usuario: 'texto', contrasena: 'texto' },
  ];

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
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.menuButton} onPress={() => drawer.current.openDrawer()}>
            <Icon name="bars" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.title}>Administradores</Text>
          <Icon name="user-circle-o" size={50} color="black" style={styles.icon} />
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
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#D2D9F1',
    paddingTop: 20,
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
