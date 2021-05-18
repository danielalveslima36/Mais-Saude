import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import { View, StyleSheet, Text, Button } from "react-native";
import { Divider } from "react-native-elements";
import { ScrollView } from 'react-native-gesture-handler';
import { useAuth } from "../context/Authenticate";

const Home = () => {
    const { usuario } = useAuth();
    const navigation = useNavigation();
    const {logout} = useAuth();

    function goToListFamily() {
        navigation.navigate('Minhas Famílias');
    }

    function goToListVisit() {
        navigation.navigate('ListVisit');
    }

    return(
        
        <ScrollView>
            <View style={styles.headerInfo}>
                <View>
                    <Button title="sair" onPress={() => logout()}/>
                </View>
                <View>
                    <Text style={styles.title}>Olá, {usuario?.nome}!</Text>
                </View>
            </View>
            
            <Divider style={styles.divider} />

            <View style={styles.body}>
                <Pressable style={styles.card} onPress={() => goToListFamily()}>
                    <Text style={styles.titleCard}>Minhas Famílias</Text>
                </Pressable>
                <Pressable style={styles.card} onPress={() => goToListVisit()}>
                    <Text style={styles.titleCard}>Minhas Visitas</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

export default Home;
const styles = StyleSheet.create({
    headerInfo: {   
        marginTop: 40,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#004269'
    },
    divider: {
        backgroundColor: "#0C25F5",
        marginTop: 20,
    },
    body: {
        flex: 1,        
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',      
        alignItems: 'center',
        height: 200,
        width: '90%',
        borderRadius: 15,
        backgroundColor: "#004269",
        marginVertical: 10
    },
    titleCard: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
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
    buttonLogout: {
        position: 'relative',
        right: 10
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
