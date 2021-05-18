import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react'
import { useState } from 'react';
import { Alert, Button } from 'react-native';
import { Pressable } from 'react-native';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import { TextInput } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../context/Authenticate';
import { IFamily } from '../interfaces/IFamily';
import API from '../services/Api';

const RegisterAddress = () => {
    const { usuario } = useAuth();
    const navigation = useNavigation();
    const route = useRoute();

    const [nome, setNome] = useState(route.params?.nome)
    const [rua, setRua] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")
    const [cep, setCep] = useState("")
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")

    useFocusEffect(() => {
        // const family = route.params as IFamily
        // setNome(route.params?.nome)
    });

    function handlerCreateFamily(nome: string, rua: string, numero: string, complemento: string, cep: string, cidade: string, estado: string) {
        const data = {nome, endereco: {rua, numero, complemento, cep, cidade, estado}};
        API.post(`/familia/${usuario?.id}`, data).then(response => {
            Alert.alert("Criação de Família", "Família adicionada com sucesso!");
            navigation.navigate("Home", {family_id: response.data?.id });
        }, err => console.log(err));
    }


    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.view}>
                    <Text style={styles.title}>Cadastro do Endereço</Text>
                    <Text>{nome}</Text>

                    <TextInput style={styles.input} editable
                        maxLength={255} placeholder="Rua"
                        onChangeText={setRua} />

                    <TextInput style={styles.input} editable
                        maxLength={4} placeholder="Número"
                        keyboardType="number-pad"
                        onChangeText={setNumero} />

                    <TextInput style={styles.input} editable
                        maxLength={100} placeholder="Complemento"
                        onChangeText={setComplemento} />

                    <TextInput style={styles.input} editable
                        maxLength={9} placeholder="CEP"
                        onChangeText={setCep} />

                    <TextInput style={styles.input} editable
                        maxLength={255} placeholder="cidade"
                        onChangeText={setCidade} />

                    <TextInput style={styles.input} editable
                        maxLength={2} placeholder="UF"
                        onChangeText={setEstado} />

                    <Pressable style={styles.button} onPress={()=>{ handlerCreateFamily(nome, rua, numero, complemento, cep, cidade, estado) }}>
                        <Text style={styles.textButton}>Finalizar</Text>
                    </Pressable>
                </View>                
            </ScrollView>            
        </SafeAreaView>
    )
}

export default RegisterAddress;

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#004269', 
        textAlign: 'center'
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
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    button: {
        flex: 1,        
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%',
        backgroundColor: '#004269',
        borderRadius: 20,
        paddingVertical: 10
    },
    textButton: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    }
})
