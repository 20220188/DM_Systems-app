import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';

export default function Buttons({textoBoton, accionBoton}) {

    return(
        <>
        <TouchableOpacity style={styles.button} onPress={accionBoton}>
            <Text style={styles.buttonText}>{textoBoton}</Text>
        </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({

    button: {
        backgroundColor: '#D2D9F1',
    padding: 10,
    borderRadius: 20,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    },
    buttonText: {
        color: '#5D41DE',
        fontSize: 16,
    }
});