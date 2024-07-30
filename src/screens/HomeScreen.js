import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Modal } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomDrawer from '../components/CustomDrawer';
import { Avatar, ListItem } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import LoadingScreen from './LoadingScreen'; // Asegúrate de importar la pantalla de carga

export default function HomeScreen({ navigation }) {
  const drawer = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const users = [
    { id: '1', type: 'Punto de venta', name: 'Punto de venta 1' },
    { id: '2', type: 'Usuario', name: 'Dependiente' },
    { id: '3', type: 'Usuario', name: 'Dependiente' },
    { id: '4', type: 'Punto de venta', name: 'Caja 2' },
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
          
          <View style={styles.header}>
            <Avatar rounded source={{ uri: 'https://simpleicon.com/wp-content/uploads/user-6.png' }} />
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>Bienvenido!</Text>
              <Text style={styles.adminText}>Admin</Text>
            </View>
          </View>
          <TextInput style={styles.searchBar} placeholder="Buscar..." />

          <View style={styles.activities}>
            <Progress.Circle
              size={100}
              progress={0.75}
              showsText={true}
              formatText={() => '75%'}
            />
            <View style={styles.stats}>
              <Text style={styles.statText}>
                <Icon name="check-circle" size={20} color="green" /> Ingresos 75
              </Text>
              <Text style={styles.statText}>
                <Icon name="times-circle" size={20} color="red" /> Pérdidas 25
              </Text>
            </View>
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
    padding: 20,
    backgroundColor: '#D2D9F1',
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  headerTextContainer: {
    marginLeft: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  adminText: {
    fontSize: 16,
    color: 'gray',
  },
  searchBar: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  activities: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  stats: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statText: {
    fontSize: 16,
    marginTop: 10,
  },
  userList: {
    marginTop: 20,
  },
});
