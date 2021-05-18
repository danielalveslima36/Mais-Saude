import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import ListFamily from '../pages/ListFamily';
import RegisterFamily from '../pages/RegisterFamily';
import RegisterAddress from '../pages/RegisterAddress';
import ViewFamily from '../pages/ViewFamily';
import RegisterPeople from '../pages/RegisterPeople';

const { Navigator, Screen } = createStackNavigator();
// create a component
const RoutesApp = () => {
    return (
        <Navigator>
            <Screen name="Home" component={Home} options={{ headerShown: false }}/>
            <Screen name="Minhas Famílias" component={ListFamily}/>
            <Screen name="Cadastro Família" component={RegisterFamily}/>
            <Screen name="Cadastro Endereço" component={RegisterAddress}/>
            <Screen name="Ver Família" component={ViewFamily}/>
            <Screen name="Cadastro de Integrante" component={RegisterPeople}/>
        </Navigator>
    );
};

//make this component available to the app
export default RoutesApp;
