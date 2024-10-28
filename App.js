// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './ScreenViews/HomeScreen';
import { PatientDetailsScreen } from './ScreenViews/PatientDetailsScreen'; 
import { AddDataScreen } from './ScreenViews/AddDataScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Patient Details" component={PatientDetailsScreen} />
        <Stack.Screen name="Add Data" component={AddDataScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
