import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/Authenticate';

const Login: React.FC = () => {
    const navigation = useNavigation();
    const {login} = useAuth();
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");

    function handlerCreateUser(){
        navigation.navigate('Cadastro');
    }

    function handlerLogin(email:string, senha:string){
        login(email,senha)
    }
    
    return (
        <LinearGradient colors={['#0093E9', '#0EE6AD']}
            start={{x: 0.1, y: 0}}
            style={styles.background}>
                  
            <SafeAreaView style={styles.view}>
                <Text style={styles.title}>Login</Text>

                <TextInput style={styles.input} editable
                    maxLength={100} placeholder="Email"
                    onChangeText={onChangeEmail} />

                <TextInput style={styles.input} editable
                    maxLength={100} placeholder="Senha"
                    textContentType='password' secureTextEntry={true}
                    onChangeText={onChangePassword} />

                <View style={styles.button}>
                    <Button title="Entrar" color="#0C25F5" onPress={()=>{handlerLogin(email,password)}}/>
                </View>

                <View style={styles.button}>
                    <Button title="Cadastre-se" color="#0C25F5" onPress={handlerCreateUser} />
                </View>

            </SafeAreaView>
        </LinearGradient>
    )
}

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
});

export default Login;
