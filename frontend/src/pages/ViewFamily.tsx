import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/core'
import React from 'react'
import { useState } from 'react';
import { Pressable } from 'react-native';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import { IFamily } from '../interfaces/IFamily';
import API from '../services/Api';

const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.card}>
        <Text style={styles.titleCard}>{item?.nome}</Text>
        <View style={styles.separator} />
        <Text>Ver Mais</Text>
    </TouchableOpacity>
);

const ViewFamily = () => {
    const navigation=  useNavigation();
    const route = useRoute();

    const [family, setFamily] = useState<IFamily>();
    const [pessoas, setPessoas] = useState<IFamily[]>([])

    API.get(`/familia/${route.params?.familiaId}`).then(response => {
        setFamily(response.data?.familia);
        setPessoas(response.data?.pessoas);
    }, err => console.error(err));

    useFocusEffect(() => {
       
    });

    const renderItem = ({item}) => {
        return (
            <View style={styles.viewItem}>
                <Item item={item} 
                    onPress={() => goToViewPeople(item)}/>
            </View>
        );
    }

    function goToViewPeople(item) {

    }

    function goToRegisterPeople() {
        navigation.navigate('Cadastro de Integrante', {familiaId: route.params?.familiaId});
    }

    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.header}>
                <Text style={styles.titleHeader}>{family?.nome}</Text>
                <Text style={styles.subTitleHeader}>{pessoas.length} Integrantes</Text>
                <Text></Text>
            </View>
            <FlatList data={pessoas}
                renderItem={renderItem}
                style={styles.flatList}/>
            <View style={styles.footer}>
                <Pressable style={styles.button} onPress={() => goToRegisterPeople()}>
                    <Text style={styles.textButton}>Adicionar Integrante</Text>
                </Pressable>
            </View>

        </SafeAreaView>
    )
}

export default ViewFamily

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: '#004269',
        padding: 10
    },
    titleHeader: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24
    },
    subTitleHeader: {
        color: 'white',
        fontSize: 20
    },
    flatList: {
        width: '100%',
        flex: 1,
    },
    divider: {
        backgroundColor: "#0C25F5",
        marginTop: 20,
    },
    body: {
        flex: 1
    },
    card: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',      
        alignItems: 'flex-start',
        height: 100,
        width: '90%',
        borderRadius: 15,
        backgroundColor: "white",
        marginVertical: 10,
        padding: 10
    },
    titleCard: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#004269'
    },
    button: {
        flex: 1,        
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        backgroundColor: '#004269',
        borderRadius: 20,
        paddingVertical: 10
    },
    textButton: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    viewItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {        
        flex: 1,
        maxHeight: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
})
