import React, { useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomDrawer from '../../components/CustomDrawer';

const products = [
    {
        name: 'Fish Oil Omega 3',
        price: '$20',
        location: 'Bandung',
        image: 'https://drive.google.com/uc?export=view&id=19AQg4ZWr4VwTqrGOt8QSEHTQP2IARuId',
    },
    {
        name: 'Acetaminofen 500mg',
        price: '$4',
        location: 'Bandung',
        image: 'https://drive.google.com/uc?export=view&id=1X62GkYbcu0idVZxH93QJ-0Jtzbm7fTEw',
    },
    {
        name: 'Ibuprofeno 250mg',
        price: '$5',
        location: 'Bandung',
        image: 'https://drive.google.com/uc?export=view&id=1lpHhBbDukHnwmuJOB2XYiEAgOOsN0tbT',
    },
    {
        name: 'Paracetamol 500mg',
        price: '$2',
        oldPrice: '$5',
        location: 'Bandung',
        image: 'https://drive.google.com/uc?export=view&id=1eBEU74KSsO8CjRcucNJMg7K429VKpmy0',
    },

];

export default function VistaVenta({ navigation }) {
    const drawer = useRef(null);

    return (
        
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar productos..."
                    />
                    <ScrollView style={styles.scrollContainer}>
                        {products.map((product, index) => (
                            <Card key={index}>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Divider />
                                <Card.Image source={{ uri: product.image }} />
                                <Text style={styles.price}>{product.price}</Text>
                                {product.oldPrice && (
                                    <Text style={styles.oldPrice}>{product.oldPrice}</Text>
                                )}
                                <Text style={styles.location}>{product.location}</Text>
                            </Card>
                        ))}
                        
                    </ScrollView>
                    <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.buttonText}>Cerrar sesión</Text>
                        </TouchableOpacity>
                </View>
            </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#D2D9F1',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
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
    boton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 20,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
      },
    searchInput: {
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 20,
        width: '90%',
        color: 'black',
    },
    scrollContainer: {
        width: '100%',
        paddingHorizontal: 10,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    oldPrice: {
        fontSize: 14,
        textDecorationLine: 'line-through',
        color: 'red',
    },
    location: {
        fontSize: 14,
        color: '#888',
    },
});

