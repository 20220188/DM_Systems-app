import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './LoadingScreen';
import Register from './Register';
import Login from './Login';
import Recu from './RecuperacionContraseñas';
import Codigo from './CodigoRecuperacion';
import Contra from './CambiarContraseñas';
import Admins from './Admins';
import Inicio from './HomeScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="RecuperacionContraseñas" component={Recu} options={{ headerShown: false }} />
        <Stack.Screen name="CodigoRecuperacion" component={Codigo} options={{ headerShown: false }} />
        <Stack.Screen name="CambiarContraseñas" component={Contra} options={{ headerShown: false }} />
        <Stack.Screen name="Admins" component={Admins} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={Inicio

        } options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
