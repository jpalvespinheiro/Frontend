import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initDB } from './services/database';
import ContaScreen from './screens/ContaScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  useEffect(() => {
    initDB(); 
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Fornecedores">
        <Stack.Screen name="Contas" component={ContaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
