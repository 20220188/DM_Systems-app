import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';

const LoadingScreen = ({ navigation }) => {
  const imageUrl = 'https://drive.google.com/uc?export=view&id=1ZSt3P4ZmTBXGzx0ke0lXX-p6n_Y9EqlF'; // Reemplaza YOUR_FILE_ID con el ID de tu archivo en Google Drive
  const loadIMG = 'https://drive.google.com/uc?export=view&id=1A8W6sctVScowuh0UzXGcPNupa8tn3SAh';
  
  
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.replace('Register');
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
      spinValue.setValue(0); // Reset spin value when component unmounts
    };
  }, [navigation, spinValue]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(
        spinValue,
        {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true
        }
      )
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.container}>
      
      <Animated.Image
        source={{ uri: loadIMG }}
        style={[styles.logo, { transform: [{ rotate: spin }] }]}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F0147',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 0,
    marginTop: 0,
  },
  image: {
    width: 400, // Aumenta el ancho de la imagen
    height: 300, // Aumenta la altura de la imagen
    resizeMode: 'cover',
    marginBottom: 20,
  },
});

export default LoadingScreen;
