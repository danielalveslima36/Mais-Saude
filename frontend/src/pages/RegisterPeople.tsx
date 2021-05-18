import { useNavigation, useRoute } from '@react-navigation/core'
import React from 'react'
import { useState } from 'react'
import { Alert, Pressable } from 'react-native'
import { TextInput } from 'react-native'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import API from '../services/Api'

const RegisterPeople = () => {
    const navigation = useNavigation();
    const route = useRoute();
    
    const familia_id = route.params?.familiaId;
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [naturalidade, setNaturalidade] = useState('');
    const [cartao_sus, setCartaoSus] = useState('');
    const [data_nascimento, setDataNascimento] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [etnia, setEtnia] = useState('');
    const [isChefe, setIsChefe] = useState();
    const [tipo_sanguineo, setTipoSanguineo] = useState('');
    const [foto, setFoto] = useState('');
    const [observacoes, setObservacoes] = useState('');
    const [pai, setPai] = useState('');
    const [mae, setMae] = useState('');

    function handlerCreatePeople(nome, cpf, naturalidade, cartao_sus, data_nascimento, peso, altura, etnia, isChefe, tipo_sanguineo, foto, observacoes, pai, mae, familia_id) {
        const data = {nome, cpf, naturalidade, cartao_sus, data_nascimento, peso, altura, etnia, isChefe, tipo_sanguineo, foto, observacoes, pai, mae, familia_id};

        API.post("/pessoa", data).then(resp => {
            console.log(resp.data);
            Alert.alert('Adição de Integrante', 'Um novo integrante foi adicionado a família!');
            navigation.navigate('Ver Família');
        }, err => console.log(err));
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.view}>
                    <Text style={styles.title}>Adicionar Pessoa</Text>

                    <TextInput style={styles.input} editable
                        maxLength={255} placeholder="Nome"
                        onChangeText={setNome} />

                    <TextInput style={styles.input} editable
                        maxLength={14} placeholder="cpf"
                        keyboardType="number-pad"
                        onChangeText={setCpf} />

                    <TextInput style={styles.input} editable
                        maxLength={100} placeholder="Naturalidade"
                        onChangeText={setNaturalidade} />

                    <TextInput style={styles.input} editable
                        maxLength={15} placeholder="Cartão do SUS"
                        keyboardType="number-pad"
                        onChangeText={setCartaoSus} />

                    <TextInput style={styles.input} editable
                        maxLength={255} placeholder="Data de Nascimento"
                        onChangeText={setDataNascimento} />

                    <TextInput style={styles.input} editable
                        maxLength={2} placeholder="Peso"
                        keyboardType="number-pad"
                        onChangeText={setPeso} />

                    <TextInput style={styles.input} editable
                        maxLength={3} placeholder="Altura (cm)"
                        keyboardType="number-pad"
                        onChangeText={setAltura} />

                    <TextInput style={styles.input} editable
                        maxLength={2} placeholder="Etnia"
                        onChangeText={setEtnia} />

                    <TextInput style={styles.input} editable
                        maxLength={2} placeholder="Tipo Sanguíneo"
                        onChangeText={setTipoSanguineo} />

                    <TextInput style={styles.input} editable
                        maxLength={2} placeholder="Mãe"
                        onChangeText={setMae} />

                    <TextInput style={styles.input} editable
                        maxLength={2} placeholder="Pai"
                        onChangeText={setPai} />

                    <TextInput style={styles.input} editable
                        maxLength={2} placeholder="Observações"
                        onChangeText={setObservacoes} />

                    <Pressable style={styles.button} 
                        onPress={()=>{ handlerCreatePeople(nome, cpf, naturalidade, cartao_sus, data_nascimento, peso, altura, etnia, isChefe, tipo_sanguineo, foto, observacoes, pai, mae, familia_id) }}>
                        <Text style={styles.textButton}>Finalizar</Text>
                    </Pressable>
                </View>                
            </ScrollView>            
        </SafeAreaView>
    )
}

export default RegisterPeople;

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
