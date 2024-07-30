import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Constantes from '../../utils/constantes';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigationState } from '@react-navigation/native';

const CustomDrawer = ({ navigation, onLogout }) => {
  const [selectedScreen, setSelectedScreen] = useState('');
  const navigationState = useNavigationState(state => state);
  const ip = Constantes.IP;

  useEffect(() => {
    if (navigationState) {
      const currentRoute = navigationState.routes[navigationState.index].name;
      setSelectedScreen(currentRoute);
    }
  }, [navigationState]);

  const handleNavigation = (screen) => {
    setSelectedScreen(screen);
    navigation.navigate(screen);
  };
  const cerrarSesion = async () => {
    try {
      const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/administrador.php?action=logOut`, {
        method: 'GET'
      });

      const data = await response.json();

      if (data.status) {
        console.log("Sesión Finalizada");
        Alert.alert('Sesión cerrada', 'Has cerrado sesión exitosamente', [
          {
            text: "OK",
            onPress: () => navigation.navigate('Login') // Navegar a la pantalla de inicio de sesión
          }
        ]);
      } else {
        console.log('No se pudo eliminar la sesión');
      }
    } catch (error) {
      console.error('Error desde Catch', error);
      Alert.alert('Error', 'Ocurrió un error al cerrar sesión');
    }
  };

  return (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerTitle}>Escoge</Text>

      <TouchableOpacity
        style={[styles.drawerItem, selectedScreen === 'HomeScreen' && styles.drawerItemSelected]}
        onPress={() => handleNavigation('HomeScreen')}
      >
        <Icon name="heart" size={24} color="white" style={styles.drawerIcon} />
        <Text style={styles.drawerItemText}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.drawerItem, selectedScreen === 'Admins' && styles.drawerItemSelected]}
        onPress={() => handleNavigation('Admins')}
      >
        <Icon name="user-circle" size={24} color="white" style={styles.drawerIcon} />
        <Text style={styles.drawerItemText}>Administradores</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.drawerItem, selectedScreen === 'PuntosVenta' && styles.drawerItemSelected]}
        onPress={() => handleNavigation('PuntosVenta')}
      >
        <Icon name="truck" size={24} color="white" style={styles.drawerIcon} />
        <Text style={styles.drawerItemText}>Puntos de venta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.drawerItem, selectedScreen === 'Caja' && styles.drawerItemSelected]}
        onPress={() => handleNavigation('Caja')}
      >
        <Icon name="cog" size={24} color="white" style={styles.drawerIcon} />
        <Text style={styles.drawerItemText}>Caja</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.drawerItem, selectedScreen === 'Dependientes' && styles.drawerItemSelected]}
        onPress={() => handleNavigation('Dependientes')}
      >
        <Icon name="user-plus" size={24} color="white" style={styles.drawerIcon} />
        <Text style={styles.drawerItemText}>Dependientes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.drawerItem, selectedScreen === 'Venta' && styles.drawerItemSelected]}
        onPress={() => handleNavigation('Venta')}
      >
        <Icon name="user-plus" size={24} color="white" style={styles.drawerIcon} />
        <Text style={styles.drawerItemText}>Vista de venta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.closeButton} onPress={cerrarSesion}>
      <Icon name="times-circle" size={24} color="red" />
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#7393FC',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  drawerTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    backgroundColor: '#7393FC',
    borderRadius: 5,
  },
  drawerItemSelected: {
    backgroundColor: '#251C6A',
  },
  drawerIcon: {
    marginRight: 10,
  },
  drawerItemText: {
    fontSize: 18,
    color: 'white',
  },
  closeButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    backgroundColor: '#D2D9F1',
    borderRadius: 50,
    padding: 10,
  },
});

export default CustomDrawer;
