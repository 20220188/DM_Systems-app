import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Dimensions, FlatList, Image, Modal } from 'react-native';
import * as Constantes from '../../utils/constantes';
import { DrawerLayout } from 'react-native-gesture-handler';
import CustomDrawer from '../components/CustomDrawer';
import ProductoCard from '../components/cards/CardProducto';
import LoadingScreen from './LoadingScreen';

export default function Venta({ navigation }) {
    const drawer = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [userName, setUserName] = useState('');
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

    useEffect(() => {
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

        fetchUserProfile();
        fetchProducts();
    }, []);

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
                <View style={styles.searchContainer}>
                    <Image source={require('../img/textodm.png')} style={styles.logo} />
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
                            <Text style={styles.welcomeText}>Bienvenido, {userName}</Text>
                            <Text style={styles.sectionTitle}>Productos</Text>
                        </>
                    }
                    data={filteredProducts}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id_producto.toString()}
                    contentContainerStyle={styles.productsContainer}
                />
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
        backgroundColor: '#fff',
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
    bottomTabContainer: {
        flexDirection: 'row',
        height: 70,
        backgroundColor: '#D9D9D9',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 0,
    },
    tabItem: {
        alignItems: 'center',
    },
    tabText: {
        fontFamily: 'Poppins-Regular',
    },
    categoryScrollContainer: {
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    categoryItem: {
        marginRight: 10,
        alignItems: 'center',
    },
    selectedCategory: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    categoryText: {
        fontFamily: 'Poppins-Regular',
        marginTop: 5,
    },
    selectedText: {
        color: 'red',
    },
    sportItem: {
        marginRight: 10,
        alignItems: 'center',
    },
    selectedSport: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    sportText: {
        fontFamily: 'Poppins-Regular',
        marginTop: 5,
    },
});
