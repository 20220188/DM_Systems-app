import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, FlatList } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomDrawer from '../components/CustomDrawer';
import { Avatar, ListItem } from 'react-native-elements';
import * as Progress from 'react-native-progress';

export default function HomeScreen({ navigation }) {
  const drawer = useRef(null);

  const users = [
    { id: '1', type: 'Punto de venta', name: 'Punto de venta 1' },
    { id: '2', type: 'Usuario', name: 'Dependiente' },
    { id: '3', type: 'Usuario', name: 'Dependiente' },
    { id: '4', type: 'Punto de venta', name: 'Caja 2' },
  ];

  return (
    <DrawerLayout
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      drawerType="slide"
      drawerBackgroundColor="#7393FC"
      renderNavigationView={() => <CustomDrawer navigation={navigation} />}
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

          <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListItem bottomDivider>
                <Icon name={item.type === 'Usuario' ? 'user' : 'truck'} size={24} />
                <ListItem.Content>
                  <ListItem.Title>{item.type}</ListItem.Title>
                  <ListItem.Subtitle>{item.name}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            )}
            style={styles.userList}
          />
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
    padding: 16,
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
    alignItems: 'center',
  },
  stats: {
    marginLeft: 20,
  },
  statText: {
    fontSize: 16,
    marginBottom: 5,
  },
  userList: {
    marginTop: 30,
  },
});


