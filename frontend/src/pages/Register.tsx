import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import API from '../services/Api';

const Register = () => {
    const navigation = useNavigation();

    //Fields
    const [nome, onChangeNome] = useState("");
    const [cpf, onChangeCpf] = useState("");
    const [email, onChangeEmail] = useState("");
    const [senha, onChangeSenha] = useState("");
    const [confirm_senha, onChangeConfSenha] = useState("");

    const validatePassword = (): boolean => {
        return senha === confirm_senha;
    }

    const alertPasswordInvalid = (): void => {
        Alert.alert('Senha Invalida!', 'Inserida a senha correta novamente.');
    }
    
    async function handlerCreateUser(nome: string, cpf: string, email: string, senha: string) {

        if (!validatePassword()) {
            alertPasswordInvalid();
            return;
        }

        const data = { nome, cpf, email, senha };
        console.log(data);

        try {
            await API.post('usuario', data)
            Alert.alert('Cadastro Realizado com Sucesso!')
            goToLogin()
        } catch (error) {
            throw new Error(error); 
        }
    }

    function goToLogin() {        
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.view}>

            <Text style={styles.title}>Cadastro do Agente</Text>

            <TextInput style={styles.input} editable
                maxLength={255} placeholder="Nome"
                onChangeText={onChangeNome} />

            <TextInput style={styles.input} editable
                maxLength={14} placeholder="CPF"
                keyboardType="number-pad"
                onChangeText={onChangeCpf} />

            <TextInput style={styles.input} editable
                maxLength={100} placeholder="Email"
                keyboardType="email-address"
                onChangeText={onChangeEmail} />

            <TextInput style={styles.input} editable
                maxLength={16} placeholder="Senha"
                textContentType='password' secureTextEntry={true}
                onChangeText={onChangeSenha} />

            <TextInput style={styles.input} editable
                maxLength={16} placeholder="Confirme a Senha"
                textContentType='password' secureTextEntry={true}
                onChangeText={onChangeConfSenha} />

            <View style={styles.button}>
                <Button title="Registrar" onPress={()=>{ handlerCreateUser(nome, cpf, email, senha) }} />
            </View>
        </SafeAreaView>
    )
}

export default Register;

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#004269'
    },
    view: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: 50,
        width: 300,
        fontSize: 20,
        marginBottom: 15,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 5,
        opacity: 0.8
    },
    button: {
        justifyContent: 'center',
        marginTop: 20,
        width: 200
    },
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
})
