import 'react-native-gesture-handler';
import React from 'react';
import {View, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './Screens/HomeScreen';
import { SearchScreen } from './Screens/SearchScreen';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['VirtualizedLists should never be nested', 'Each child in a list should have a unique "key" prop. See https://fb.me/react-warning-keys for more information.%s']);
import { styles } from './Styles';

const Stack = createStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Home" component={HomeScreen} 
        options={({ route }) => ({ 
          headerShown: false, 
          cardStyle: { backgroundColor: '#d6b28d' },
        })}
        />
        <Stack.Screen name="Search" component={SearchScreen} 
        options={({ route }) => ({
           title: "Press and Hold to Open Maps",
           headerStyle: {
            backgroundColor: '#bda486',
            borderWidth: 0,
            borderColor: "white",
          },
          headerTitleStyle: {
            color: "white"
          },
          headerTintColor: 'white',
           headerRight: () => (
            <View style={{marginRight: Dimensions.get('window').width / 10}}>
                    
              </View>)
           })}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;