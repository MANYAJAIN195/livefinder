import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import EatsScreen from '../screens/EatsScreen';
import SuccessScreen from '../screens/SuccessScreen';
import Trainlist from '../screens/Trainlist';
import TrainSuccess from '../screens/TrainSuccess';

const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="MapScreen" component={MapScreen} />
            <Stack.Screen name="EatsScreen" component={EatsScreen} />
            <Stack.Screen name="Trainlist" component={Trainlist} />
            <Stack.Screen name="TrainSuccess" component={TrainSuccess} />
            <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
        </Stack.Navigator>
    );
}

export default MainNavigator;
