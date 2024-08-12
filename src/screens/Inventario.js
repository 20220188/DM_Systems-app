import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, Image, FlatList, Alert, TouchableOpacity, RefreshControl } from 'react-native';
import * as Constantes from '../../utils/constantes';
import ProductoCard from '../components/cards/CardProducto';

export default function Inventario({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [userName, setUserName] = useState('');
    const [refreshing, setRefreshing] = useState(false); // Estado para controlar el refresh
    const ip = Constantes.IP;

    const handleLogout = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigation.replace('Login');
        }, 3000);
    };

    const renderItem = ({ item }) => (
        <ProductoCard
            key={item.id_producto.toString()}
            ip={ip}
            codigo={item.codigo}
            nombre={item.nombre}
            imagen={item.imagen}
            presentacion={item.presentacion}
            fecha_vencimiento={item.fecha_vencimiento}
        />
    );

    const fetchUserProfile = async () => {
        try {
            const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/administrador.php?action=readProfile`);
            const data = await response.json();
            if (data.status) {
                setUserName(data.dataset.nombre);
            } else {
                Alert.alert('Error', 'Ocurrió un error al obtener el perfil del usuario');
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al obtener el perfil del usuario');
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${ip}/D-M-Systems-PTC/api/services/admin/admin_maestro_productos.php?action=readAll`);
            const data = await response.json();
            if (data.dataset) {
                setProducts(data.dataset);
                setFilteredProducts(data.dataset);
            } else {
                Alert.alert('Error', 'Ocurrió un error al obtener los productos');
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al obtener los productos');
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchProducts(); // Actualiza los productos
        setRefreshing(false);
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

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query) {
            const filteredData = products.filter(product =>
                product.nombre.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filteredData);
        } else {
            setFilteredProducts(products);
        }
    };

    useEffect(() => {
        fetchUserProfile();
        fetchProducts();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Image source={require('../img/logo2.jpg')} style={styles.logo} />
                <TextInput
                    style={styles.searchText}
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>
            <FlatList
                ListHeaderComponent={
                    <>
                        <Text style={styles.sectionTitle}>Inventario</Text>
                        <Text style={styles.welcomeText}>Bienvenido, {userName}</Text>
                        <Text style={styles.sectionTitle}>Productos</Text>
                    </>
                }
                data={filteredProducts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id_producto.toString()}
                contentContainerStyle={styles.productsContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
            />
            <TouchableOpacity style={styles.logoutButton} onPress={cerrarSesion}>
                <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D2D9F1',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 50,
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    searchText: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        borderRadius: 25,
        paddingVertical: 8,
        paddingHorizontal: 20,
        fontFamily: 'Poppins-Regular',
    },
    welcomeText: {
        fontSize: 24,
        color: '#f08080',
        marginBottom: 10,
        fontFamily: 'Poppins-Regular',
        marginLeft: 15,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
    },
    productsContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    logoutButton: {
        backgroundColor: '#ff6347',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },
});
