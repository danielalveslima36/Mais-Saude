import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import Register from '../pages/Register';

const { Navigator, Screen } = createStackNavigator();

const RoutesAuth = () => {
    return (
        <Navigator>
            <Screen options={{ headerShown: false }} name='Login' component={Login} />
            <Screen name="Cadastro" component={Register} />
        </Navigator>
    );
};

export default RoutesAuth;
