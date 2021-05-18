import React from 'react';
import RoutersAuth from './Routers.Auth';
import RoutersApp from './Routers.App'; 
import {useAuth} from '../context/Authenticate';

const RoutesMain = () => {
    const {signed} = useAuth();
    return signed ? <RoutersApp/> : <RoutersAuth/>
};

export default RoutesMain;
