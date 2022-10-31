import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import ActionPage from './pages/actionPage';
import {Home} from './pages/homePage';

const Stack = createStackNavigator();

const MainRouteStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Actions" component={ActionPage} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainRouteStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
