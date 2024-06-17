import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Acc from './Acciones';

const Tab = createBottomTabNavigator();

function PáginaDos() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta es la Página Dos</Text>
    </View>
  );
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Página Dos" component={PáginaDos} />
      <Tab.Screen name="Acciones" component={Acc} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D2D9F1',
  },
  text: {
    fontSize: 24,
    color: 'black',
  },
});

export default BottomTabNavigator;
