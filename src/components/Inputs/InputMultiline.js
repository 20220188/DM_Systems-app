
import { StyleSheet, Platform, TextInput} from 'react-native';

export default function InputMultiline({placeHolder, setValor, contra, valor}) {

  return (

    <TextInput
    style={styles.Input}
    placeholder={placeHolder}
    value={valor}
    onChangeText={setValor}
    placeholderTextColor={'#000000'}
    secureTextEntry={contra} 
    multiline={true}
    numberOfLines={4}
    />

  );
}

const styles = StyleSheet.create({
  Input: {
    width: '100%',
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