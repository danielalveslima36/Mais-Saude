import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Button } from 'react-native'
import { TextInput } from 'react-native'
import { SafeAreaView } from 'react-native'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

const RegisterFamily = () => {
    const [nome, onChangeNome] = useState("");
    const navigation = useNavigation();

    function handlerCreateFamily(nome: string) {
        navigation.navigate("Cadastro Endereço", {nome});
    }

    return (
        <SafeAreaView style={styles.view}>

            <Text style={styles.title}>Cadastro de Família</Text>

            <TextInput style={styles.input} editable
                maxLength={255} placeholder="Nome da Família"
                onChangeText={onChangeNome} />

            <View style={styles.button}>
                <Button title="Criar Família" onPress={()=>{ handlerCreateFamily(nome) }} />
            </View>
        </SafeAreaView>
    )
}

export default RegisterFamily

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
