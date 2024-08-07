import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Modal, ScrollView } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomDrawer from '../components/CustomDrawer';
import { Avatar } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import LoadingScreen from './LoadingScreen'; // Asegúrate de importar la pantalla de carga
import * as Constantes from '../../utils/constantes'; // Asegúrate de tener la IP y otras constantes
import * as Animatable from 'react-native-animatable'; // Importa react-native-animatable

export default function HomeScreen({ navigation }) {
  const drawer = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dependientes, setDependientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const ip = Constantes.IP;

  useEffect(() => {
    fetchDependientes();
  }, []);

  const fetchDependientes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/admin_maestro_dependientes.php?action=readAll`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.dataset && Array.isArray(data.dataset)) {
        setDependientes(data.dataset);
      } else {
        console.error('La propiedad dataset no es un array:', data);
      }
    } catch (error) {
      console.error('Error al obtener los dependientes:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filteredDependientes = dependientes.filter((dependiente) =>
    dependiente.nombre_dependiente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    
    
      navigation.replace('Login');
    
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
          <TextInput
            style={styles.searchBar}
            placeholder="Buscar..."
            value={searchTerm}
            onChangeText={handleSearch}
          />

          <View style={styles.activities}>
          </View>
          <Text style={styles.headerText}>
            <Icon name="check-circle" size={20} color="green" /> Dependientes
          </Text>
          <Animatable.Text
            animation="bounceIn"
            duration={1500}
            style={styles.counterText}
          >
            {filteredDependientes.length}
          </Animatable.Text>
          <ScrollView style={styles.userList}>
            {filteredDependientes.map((dependiente) => (
              <View key={dependiente.id_dependiente} style={styles.card}>
                <Text style={styles.cardTitle}>{dependiente.nombre_dependiente}</Text>
                <Text style={styles.cardText}>{dependiente.codigo}</Text>
              </View>
            ))}
          </ScrollView>
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
  counterText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
  },
  userList: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 16,
    marginTop: 5,
  },
});
