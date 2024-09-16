import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './LoadingScreen';
import Login from './Login';
import Admins from './Admins';
import Inicio from './HomeScreen';
import Puntos from './PuntosVenta';
import Venta from './usuarioPuntoVenta/Venta';
import Dependientes from './Dependientes';
import Inventario from './Inventario';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Admins" component={Admins} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={Inicio} options={{ headerShown: false }} />
        <Stack.Screen name="PuntosVenta" component={Puntos} options={{ headerShown: false }} />
        <Stack.Screen name="Venta" component={Venta} options={{ headerShown: false }} />
        <Stack.Screen name="Inventario" component={Inventario} options={{ headerShown: false }} />
        <Stack.Screen name="Dependientes" component={Dependientes} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
