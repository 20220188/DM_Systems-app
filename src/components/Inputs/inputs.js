import { StyleSheet, Text, View,TextInput, TouchableOpacity, Alert, Platform} from 'react-native';


export default function Input({placeHolder, setValor, contra, setTextChange}) {

  return (

    <TextInput
    style={styles.Input}
    placeholder={placeHolder}
    value={setValor}
    placeholderTextColor={'#000000'}
    secureTextEntry={contra} 
    onChangeText={setTextChange}
    />

  );
}

const styles = StyleSheet.create({
  Input: {
    width: '90%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
    zIndex: 1, // Añade zIndex para asegurar que estén encima del logo
    elevation: 2, // Añade elevación para sombra en Android
  },

});