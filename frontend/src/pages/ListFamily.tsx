import { useFocusEffect } from '@react-navigation/native';
import React from 'react'
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../context/Authenticate';
import { IFamily } from '../interfaces/IFamily';
import API from '../services/Api';
import { Pressable } from 'react-native';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';

const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.card}>
        <Text style={styles.titleCard}>{item?.nome}</Text>
        <View style={styles.separator} />
        <Text>Ver Mais</Text>
    </TouchableOpacity>
);


const ListFamily = () => {
    const { usuario } = useAuth();
    const navigation = useNavigation();

    const [families, onChangeFamilies] = useState<IFamily[]>([])

    useFocusEffect(listFamily)

    function listFamily() {
        API.get(`/familia/agente/${usuario?.id}`).then(response => {
            onChangeFamilies(response.data);
        }, (error => console.log(error)));
    }

    const renderItem = ({item}) => {
        return (
            <View style={styles.viewItem}>
                <Item item={item} 
                    onPress={() => goToViewFamily(item)}/>
            </View>
        );
    }

    function goToViewFamily(family: IFamily) {
        navigation.navigate('Ver Família', {familiaId: family?.id});
    }

    function createFamily() {
        navigation.navigate("Cadastro Família");
    }

    return (
        <SafeAreaView style={styles.body}>
            <FlatList data={families}
                renderItem={renderItem}
                style={styles.flatList}/>
            <View style={styles.footer}>
                <Pressable style={styles.button} onPress={() => createFamily()}>
                    <Text style={styles.textButton}>Adicionar Família</Text>
                </Pressable>
            </View>

        </SafeAreaView>
    )
}

export default ListFamily

const styles = StyleSheet.create({
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
    },
})
