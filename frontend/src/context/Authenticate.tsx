//import liraries
import React, { createContext, useEffect, useState } from 'react';
import API from '../services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';

//Interface User
interface IUser {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    password: string
}

interface ResponseData {
    usuario: IUser;
    token: string
}

interface ContextAuth {
    login(email: string, password: string): Promise<void>;
    logout(): void;
    usuario: IUser | null;
    signed: boolean;
}

const AuthContext = createContext<ContextAuth>({} as ContextAuth);

const AuthenticateContext: React.FC = ({ children }) => {
    const [usuario, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        async function loadStorage() {
            const studentStorage = await AsyncStorage.getItem('Auth:User');
            const tokenStorage = await AsyncStorage.getItem('Auth:Token');

            if (studentStorage && tokenStorage) {
                API.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`;
                setUser(JSON.parse(studentStorage))
            }
        }
        loadStorage();
    })

    //Login function
    async function login(email: string, senha: string) {
        const userAuth = {
            email, senha
        }

        try {
            const response = await API.post('auth', userAuth);
            const { usuario, token } = response.data as ResponseData;
            setUser(usuario)

            API.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            await AsyncStorage.setItem('Auth:User', JSON.stringify(usuario));
            await AsyncStorage.setItem('Auth:Token', token);
        } catch (error) {
            throw new Error(error);
        }
    }

    function logout() {
        AsyncStorage.clear().then(() => {
            setUser(null)
        })
    }

    return (
        <AuthContext.Provider value={{ login, logout, usuario, signed: !!usuario }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthenticateContext;

export function useAuth() {
    const context = useContext(AuthContext);
    return context
}
