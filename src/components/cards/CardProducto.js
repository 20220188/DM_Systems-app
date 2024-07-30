// ProductoCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProductoCard({ ip, id_producto, nombre, imagen,codigo, fecha_vencimiento,presentacion, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(id_producto)}>
      <Image 
        source={{ uri: `${ip}/D-M-Systems-PTC/api/images/productos/${imagen}` }} 
        style={styles.image} 
        resizeMode="cover" 
      />
      <Text style={styles.name}>{codigo}</Text>
      <Text style={styles.name}>{nombre}</Text>
      <Text style={styles.name}>{presentacion}</Text>
      <Text style={styles.name}>Fecha de vencimiento <Text style={styles.price}>{fecha_vencimiento}</Text></Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 150,
    width: 150,
    borderRadius: 10,
    resizeMode: 'stretch',
    marginLeft: 85
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: 'Poppins-Regular',
  },
  price: {
    fontSize: 14,
    color: '#f08080',
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
  },
});
