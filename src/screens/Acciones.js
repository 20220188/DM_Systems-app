import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Acciones({ navigation }) {
  const drawer = useRef(null);

  const renderDrawer = () => (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerTitle}>Escoge</Text>
      <TouchableOpacity style={styles.drawerItem} onPress={() => {
        drawer.current.closeDrawer();
        // Add your navigation logic here
      }}>
        <Icon name="heart" size={24} color="black" style={styles.drawerIcon} />
        <Text style={styles.drawerItemText}>Administradores</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.drawerItem, styles.drawerItemSelected]} onPress={() => {
        drawer.current.closeDrawer();
        // Add your navigation logic here
      }}>
        <Icon name="heart" size={24} color="black" style={styles.drawerIcon} />
        <Text style={styles.drawerItemText}>Puntos de venta</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => {
        drawer.current.closeDrawer();
        // Add your navigation logic here
      }}>
        <Icon name="heart" size={24} color="black" style={styles.drawerIcon} />
        <Text style={styles.drawerItemText}>Caja</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => {
        drawer.current.closeDrawer();
        // Add your navigation logic here
      }}>
        <Icon name="heart" size={24} color="black" style={styles.drawerIcon} />
        <Text style={styles.drawerItemText}>Dependientes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('Login')}>
        <Icon name="times-circle" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <DrawerLayout
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      drawerType="slide"
      drawerBackgroundColor="#7393FC"
      renderNavigationView={renderDrawer}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.menuButton} onPress={() => drawer.current.openDrawer()}>
            <Icon name="bars" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Home Screen</Text>
        </View>
      </SafeAreaView>
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
    justifyContent: 'center',
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
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#D2D9F1',
    fontSize: 16,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#7393FC',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  drawerTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
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
